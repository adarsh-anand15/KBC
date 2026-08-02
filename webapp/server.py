#!/usr/bin/env python3
"""Static file server + tiny JSON persistence API for the KBC web app.

Serves index.html/style.css/app.js as-is, and exposes GET/POST /api/data
backed by data/kbc_data.json so top scores, saved games, custom questions
and the admin password survive page reloads and server restarts.
"""
import json
import os
import sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlparse

WEBAPP_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(WEBAPP_DIR, "data")
DATA_FILE = os.path.join(DATA_DIR, "kbc_data.json")

DEFAULT_STATE = {
    "questions": None,
    "topscores": [],
    "savedgames": [],
    "adminPassword": None,
}


def load_state():
    if not os.path.exists(DATA_FILE):
        return dict(DEFAULT_STATE)
    try:
        with open(DATA_FILE, "r", encoding="utf-8") as f:
            data = json.load(f)
        merged = dict(DEFAULT_STATE)
        merged.update(data)
        return merged
    except (json.JSONDecodeError, OSError):
        return dict(DEFAULT_STATE)


def save_state(state):
    os.makedirs(DATA_DIR, exist_ok=True)
    tmp_path = DATA_FILE + ".tmp"
    with open(tmp_path, "w", encoding="utf-8") as f:
        json.dump(state, f, indent=2)
    os.replace(tmp_path, DATA_FILE)


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=WEBAPP_DIR, **kwargs)

    def do_GET(self):
        if urlparse(self.path).path == "/api/data":
            self._write_json(load_state())
            return
        super().do_GET()

    def do_POST(self):
        if urlparse(self.path).path != "/api/data":
            self._write_json({"error": "not found"}, status=404)
            return
        length = int(self.headers.get("Content-Length", 0) or 0)
        raw = self.rfile.read(length) if length else b"{}"
        try:
            incoming = json.loads(raw or b"{}")
        except json.JSONDecodeError:
            self._write_json({"error": "invalid json"}, status=400)
            return
        state = load_state()
        state.update(incoming)
        save_state(state)
        self._write_json(state)

    def _write_json(self, obj, status=200):
        body = json.dumps(obj).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

    def log_message(self, fmt, *args):
        sys.stderr.write("%s - %s\n" % (self.address_string(), fmt % args))


def main():
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 5555
    server = ThreadingHTTPServer(("0.0.0.0", port), Handler)
    print(f"KBC web app running at http://localhost:{port}  (data persisted to {DATA_FILE})")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass


if __name__ == "__main__":
    main()
