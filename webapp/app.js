'use strict';

/* ---------- Constants ---------- */

const NUM_LEVELS = 10;

const PRIZES = {
  1: 25000, 2: 50000, 3: 78125, 4: 156250, 5: 312500,
  6: 625000, 7: 1250000, 8: 2500000, 9: 5000000, 10: 10000000
};

const DEFAULT_QUESTIONS = {
  1: [
    { q: 'Where is Qutub Minar situated?', options: ['Mumbai', 'Chennai', 'Delhi', 'New York'], answer: 'C' },
    { q: 'Where is Golghar situated?', options: ['Sasaram', 'Patna', 'Gaya', 'Varanasi'], answer: 'B' },
    { q: 'Where is Minakshi Temple situated?', options: ['Chennai', 'Varanasi', 'Amritsar', 'Madurai'], answer: 'D' },
    { q: 'Where is Golden Temple situated?', options: ['Amritsar', 'Varanasi', 'Patna', 'Madurai'], answer: 'A' },
    { q: 'Where is India Gate situated?', options: ['Kolkata', 'Mumbai', 'Pune', 'Delhi'], answer: 'D' }
  ],
  2: [
    { q: 'Where is the capital of Brazil?', options: ['Thimphu', 'Brasilia', 'Kathmandu', 'Berlin'], answer: 'B' },
    { q: 'Where is the capital of Germany?', options: ['Berlin', 'New York', 'Moscow', 'Tokyo'], answer: 'A' },
    { q: 'Where is the capital of Australia?', options: ['Sydney', 'Cape Town', 'Canberra', 'Thimphu'], answer: 'C' },
    { q: 'Where is the capital of Thailand?', options: ['Hong Kong', 'Dhaka', 'Brussels', 'Bangkok'], answer: 'D' },
    { q: 'Where is the capital of USA?', options: ['New York', 'Washington DC', 'Paris', 'London'], answer: 'B' }
  ],
  3: [
    { q: 'Who was the first Indian woman to cross the English Channel?', options: ['Arti Shah', 'Arundhati Roy', 'Kiran Bedi', 'Bachendri Pal'], answer: 'A' },
    { q: 'Who is the first woman to become an IAS officer?', options: ['Kiran Bedi', 'Bachendri Pal', 'Sarojini Naidu', 'Arundhati Roy'], answer: 'A' },
    { q: 'Who was the first Indian to go to space?', options: ['Tenzing Norgay', 'Rakesh Sharma', 'Kalpana Chawla', 'Homi Jehangir Bhabha'], answer: 'B' },
    { q: 'Who is the first Indian woman to climb Mt. Everest?', options: ['P.T. Usha', 'Kalpana Chawla', 'Bachendri Pal', 'Mithali Raj'], answer: 'C' },
    { q: 'Who was the first Indian to win a Nobel Prize?', options: ['Dr. C.V. Raman', 'Mother Teresa', 'Dr. Har Gobind Khorana', 'Dr. Rabindranath Tagore'], answer: 'D' }
  ],
  4: [
    { q: 'In mythology, what was the "Halahal" discovered during "Samudra Manthan"?', options: ['Cow', 'Nectar', 'Poison', 'Elephant'], answer: 'C' },
    { q: 'What was the childhood name of Bhishma Pitamah in the "Mahabharata"?', options: ['Devavrat', 'Arjun', 'Bhishma', 'Veeravrat'], answer: 'A' },
    { q: 'Who was the father of Karna in the "Mahabharata"?', options: ['Indra Dev', 'Kama Dev', 'Surya Dev', 'Agni Dev'], answer: 'C' },
    { q: 'On which mountain did Sugriva live for fear of Bali?', options: ['Himalaya Parvat', 'Rishyamukh Parvat', 'Vindhyachal Parvat', 'Govardhan Parvat'], answer: 'B' },
    { q: 'Which avatar did Lord Vishnu take to save Prahlad?', options: ['Garuda Avatar', 'Nar Avatar', 'Singh Avatar', 'Narsingh Avatar'], answer: 'D' }
  ],
  5: [
    { q: 'Which is the longest river in the world?', options: ['Nile', 'Amazon', 'Brahmaputra', 'Thames'], answer: 'A' },
    { q: 'Which is the biggest river in the world (by volume)?', options: ['Nile', 'Amazon', 'Brahmaputra', 'Thames'], answer: 'B' },
    { q: 'Which place in India receives the highest rainfall?', options: ['Cherrapunji', 'Leh', 'Dehradun', 'Mawsynram'], answer: 'D' },
    { q: 'Which is the highest mountain peak of South India?', options: ['Garo', 'Mt. Everest', 'Anai Mudi', 'Godwin Austen'], answer: 'C' },
    { q: 'Which of the following cities was earlier known as Patliputra?', options: ['Bodh Gaya', 'Patna', 'Ranchi', 'Pune'], answer: 'B' }
  ],
  6: [
    { q: 'Who is known as the father of the computer?', options: ['Charles Babbage', 'Blaise Pascal', 'Steve Jobs', 'John Napier'], answer: 'A' },
    { q: "Who is known as the father of India's 'Missile Programme'?", options: ['Homi Jehangir Bhabha', 'C.V. Raman', 'A.P.J. Abdul Kalam', 'J.C. Bose'], answer: 'C' },
    { q: 'Who discovered the theory of relativity?', options: ['Isaac Newton', 'Albert Einstein', 'Nikola Tesla', 'Niels Bohr'], answer: 'B' },
    { q: 'Who discovered the neutron?', options: ['James Chadwick', 'Rutherford', 'J.J. Thomson', 'Nikola Tesla'], answer: 'A' },
    { q: "Who discovered 'Gravitation'?", options: ['Albert Einstein', 'Nikola Tesla', 'Isaac Newton', 'Niels Bohr'], answer: 'C' }
  ],
  7: [
    { q: 'Who is the writer of "Mahabharata"?', options: ['Ved Vyas', 'Surdas', 'Valmiki', 'Tulsidas'], answer: 'A' },
    { q: 'Who is the writer of "Kumarasambhava"?', options: ['Surdas', 'Kalidas', 'Valmiki', 'Ved Vyas'], answer: 'B' },
    { q: 'Who is the writer of "Kapalkundala"?', options: ['Rabindranath Tagore', 'Kalidas', 'Surdas', 'Bankim Chandra Chatterjee'], answer: 'D' },
    { q: 'Who is the author of "Harry Potter"?', options: ['William Shakespeare', 'Patricia Grace', 'J.K. Rowling', 'Kitty Crowther'], answer: 'C' },
    { q: 'Who is the author of "A Tale of Two Cities"?', options: ['William Shakespeare', 'Charles Dickens', 'Robinson Crusoe', 'Mark Twain'], answer: 'B' }
  ],
  8: [
    { q: 'What is the full form of IP?', options: ['Internet Protocol', 'Internal Protocol', 'Internal Protection', 'Internet Protection'], answer: 'A' },
    { q: 'What is the full form of MRI?', options: ['Magnetic Regional Imaging', 'Magnetic Resonance Index', 'Magnetic Resonance Imaging', 'Magnetic Regional Index'], answer: 'C' },
    { q: 'What is the full form of GUI?', options: ['Graphical User Interaction', 'Graphical User Interface', 'Graphics User Interface', 'Graphics User Interaction'], answer: 'B' },
    { q: 'What is the full form of MODEM?', options: ['Modulation Demodulation', 'Modulation Demodulator', 'Modulator Demodulation', 'Modulator Demodulator'], answer: 'D' },
    { q: 'What is the full form of INTERPOL?', options: ['International Police Commission', 'Internal Police Committee', 'International Police Committee', 'Internal Police Commission'], answer: 'A' }
  ],
  9: [
    { q: 'What is the scientific study of birds called?', options: ['Cytology', 'Dendrology', 'Ornithology', 'Zoology'], answer: 'C' },
    { q: 'What is the scientific study of trees called?', options: ['Cytology', 'Dendrology', 'Ornithology', 'Zoology'], answer: 'B' },
    { q: 'What is the scientific study of cells called?', options: ['Cytology', 'Dendrology', 'Ornithology', 'Zoology'], answer: 'A' },
    { q: 'What is the scientific study of animals called?', options: ['Cytology', 'Dendrology', 'Ornithology', 'Zoology'], answer: 'D' },
    { q: 'What is the scientific study of religions called?', options: ['Ornithology', 'Theology', 'Ecology', 'Seismology'], answer: 'B' }
  ],
  10: [
    { q: 'Who discovered Victoria Falls?', options: ['Dr. David Livingstone', 'Sir George Everest', 'Sir George Simon', 'David Cameron'], answer: 'A' },
    { q: 'Where is the Simpson Desert situated?', options: ['South Africa', 'Australia', 'Brazil', 'China'], answer: 'B' },
    { q: 'Which country does the company NOKIA belong to?', options: ['Japan', 'Korea', 'Finland', 'Singapore'], answer: 'C' },
    { q: 'The Meteor Crater is situated in which of the following deserts?', options: ['Sahara', 'Arizona', 'Gobi', 'Thar'], answer: 'B' },
    { q: 'Who was the first Communist Chief Minister of an Indian state?', options: ['Jyoti Basu', 'Ajoy Kumar Mukherjee', 'Achutha Menon', 'EMS Namboodiripad'], answer: 'D' }
  ]
};

const HELP_TEXT =
`.....KAUN BANEGA CROREPATI.....

This game consists of ten levels.
Each level carries one question with four options of which only one is correct.
If you choose the correct option you will proceed to the next level, otherwise the game gets over.
The person who clears all ten levels becomes a "CROREPATI".

You can pause after any correct answer and save your progress under your
name and password, then resume later from the "Saved Game" menu.`;

const STORAGE_KEYS = {
  questions: 'kbc_questions',
  topscores: 'kbc_topscores',
  savedgames: 'kbc_savedgames',
  adminPassword: 'kbc_admin_password'
};

const MAX_ADMIN_TRIALS = 5;

/* ---------- Storage helpers ---------- */

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (e) {
    return fallback;
  }
}

function saveJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Fire-and-forget sync to the local server so state survives reloads and
// restarts as an actual file on disk (data/kbc_data.json), not just this
// browser's localStorage. Falls back silently if no server is present
// (e.g. index.html opened directly via file://).
function pushServerState(partial) {
  fetch('/api/data', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(partial)
  }).catch(() => {});
}

async function fetchServerState() {
  try {
    const res = await fetch('/api/data', { cache: 'no-store' });
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    return null;
  }
}

function getQuestions() {
  return loadJSON(STORAGE_KEYS.questions, DEFAULT_QUESTIONS);
}

function setQuestions(q) {
  saveJSON(STORAGE_KEYS.questions, q);
  pushServerState({ questions: q });
}

function getTopScores() {
  return loadJSON(STORAGE_KEYS.topscores, []);
}

function setTopScores(list) {
  saveJSON(STORAGE_KEYS.topscores, list);
  pushServerState({ topscores: list });
}

function getSavedGames() {
  return loadJSON(STORAGE_KEYS.savedgames, []);
}

function setSavedGames(list) {
  saveJSON(STORAGE_KEYS.savedgames, list);
  pushServerState({ savedgames: list });
}

function getAdminPassword() {
  return localStorage.getItem(STORAGE_KEYS.adminPassword);
}

function setAdminPassword(pw) {
  localStorage.setItem(STORAGE_KEYS.adminPassword, pw);
  pushServerState({ adminPassword: pw });
}

/* ---------- Utilities ---------- */

function formatINR(n) {
  const num = Math.round(n);
  const s = Math.abs(num).toString();
  const last3 = s.slice(-3);
  const rest = s.slice(0, -3);
  const formattedRest = rest === '' ? '' : rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',';
  return (num < 0 ? '-' : '') + '₹' + formattedRest + last3;
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str == null ? '' : String(str);
  return div.innerHTML;
}

function pickRandomQuestion(level) {
  const pool = getQuestions()[level] || [];
  return pool[Math.floor(Math.random() * pool.length)];
}

function nowStamp() {
  const d = new Date();
  return {
    date: d.toLocaleDateString(),
    time: d.toLocaleTimeString()
  };
}

function findSavedGameIndex(name, password) {
  const games = getSavedGames();
  return games.findIndex(g => g.name === name && g.password === password);
}

function removeSavedGame(name, password) {
  const games = getSavedGames();
  const idx = games.findIndex(g => g.name === name && g.password === password);
  if (idx !== -1) {
    games.splice(idx, 1);
    setSavedGames(games);
  }
}

function upsertSavedGame(entry) {
  const games = getSavedGames();
  const idx = games.findIndex(g => g.name === entry.name && g.password === entry.password);
  if (idx !== -1) games[idx] = entry;
  else games.push(entry);
  setSavedGames(games);
}

const TOP_SCORE_LIMIT = 5;

function recordTopScore(name, score) {
  if (score <= 0) return false;
  const list = getTopScores();
  const stamp = nowStamp();
  const entry = { name, score, date: stamp.date, time: stamp.time };
  list.push(entry);
  list.sort((a, b) => b.score - a.score);
  const trimmed = list.slice(0, TOP_SCORE_LIMIT);
  setTopScores(trimmed);
  return trimmed.includes(entry);
}

/* ---------- App state ---------- */

const S = {
  screen: 'welcome',
  player: { name: '', password: '' },
  level: 1,
  score: 0,
  currentQuestion: null,
  selected: null,
  message: null,
  adminTrials: 0,
  adminBlocked: false,
  adminUnlocked: false,
  editLevel: 1,
  editDraft: null,
  formError: ''
};

const app = document.getElementById('app');

function render() {
  app.innerHTML = `<div class="screen">${SCREENS[S.screen]()}</div>`;
  bindEvents();
}

function goto(screen, opts) {
  S.screen = screen;
  S.formError = '';
  if (opts) Object.assign(S, opts);
  render();
}

/* ---------- Screen renderers ---------- */

const SCREENS = {
  welcome: () => `
    <h1 class="title">WELCOME TO</h1>
    <h1 class="title" style="font-size:2.3rem;margin-bottom:6px;">KAUN BANEGA CROREPATI</h1>
    <p class="tagline">(KBC)</p>
    <p class="tagline" style="margin-top:-8px;">Designed &amp; Developed by Adarsh &mdash; ported to the web</p>
    <div class="menu-list">
      <button class="primary" id="btn-continue">Press Enter to Continue</button>
    </div>
  `,

  mainMenu: () => `
    <h1 class="title">MAIN MENU</h1>
    <div class="menu-list">
      <button id="mm-1">1. New Game</button>
      <button id="mm-2">2. Saved Game</button>
      <button id="mm-3">3. About</button>
      <button id="mm-4">4. Top Score</button>
      <button id="mm-5">5. Help</button>
      <button id="mm-6" class="danger">6. Exit</button>
    </div>
    <div class="secret-row">
      <div style="font-size:0.8rem;color:#7a74b8;margin-bottom:8px;">&lt;Enter Your Choice then Press Enter&gt;</div>
      <input id="secret-input" maxlength="6" placeholder="choice" />
      <button id="secret-go">Go</button>
    </div>
    ${S.formError ? `<div class="msg-banner error">${escapeHtml(S.formError)}</div>` : ''}
  `,

  newGameForm: () => `
    <h1 class="title">NEW GAME</h1>
    <p class="tagline">Enter your details to begin</p>
    ${S.formError ? `<div class="msg-banner error">${escapeHtml(S.formError)}</div>` : ''}
    <div class="field">
      <label>Your Name</label>
      <input id="ng-name" type="text" maxlength="29" autofocus />
    </div>
    <div class="field">
      <label>Set a Password (used to save/resume this game)</label>
      <input id="ng-password" type="password" maxlength="19" />
    </div>
    <div class="row">
      <button class="primary" id="ng-start">Start Game</button>
      <button id="ng-back">Back to Main Menu</button>
    </div>
  `,

  play: () => {
    const q = S.currentQuestion;
    const letters = ['A', 'B', 'C', 'D'];
    return `
      <div class="hud"><span>${escapeHtml(S.player.name)}</span><span>Score secured: ${formatINR(S.score)}</span></div>
      <div class="level-badge">LEVEL ${S.level} &middot; ${formatINR(PRIZES[S.level])}</div>
      <div class="question">${escapeHtml(q.q)}</div>
      <div class="options">
        ${letters.map((L, i) => `
          <button class="option-btn" data-letter="${L}">
            <span class="opt-letter">${L})</span> ${escapeHtml(q.options[i])}
          </button>`).join('')}
      </div>
      <button class="link" id="play-quit">Quit to Main Menu (progress not saved)</button>
    `;
  },

  answered: () => {
    const q = S.currentQuestion;
    const letters = ['A', 'B', 'C', 'D'];
    const correctLetter = q.answer;
    const isCorrect = S.selected === correctLetter;
    return `
      <div class="hud"><span>${escapeHtml(S.player.name)}</span><span>Score secured: ${formatINR(S.score)}</span></div>
      <div class="level-badge">LEVEL ${S.level} &middot; ${formatINR(PRIZES[S.level])}</div>
      <div class="question">${escapeHtml(q.q)}</div>
      <div class="options">
        ${letters.map((L, i) => {
          let cls = 'option-btn';
          if (L === correctLetter) cls += ' correct';
          else if (L === S.selected) cls += ' wrong';
          return `<button class="${cls}" disabled><span class="opt-letter">${L})</span> ${escapeHtml(q.options[i])}</button>`;
        }).join('')}
      </div>
      <div class="feedback ${isCorrect ? 'correct-text' : 'wrong-text'}">
        ${isCorrect ? '"Correct Answer"' : '"Incorrect Answer"'}
      </div>
      <div class="score-display">Your Score: ${formatINR(isCorrect ? PRIZES[S.level] : S.score)}</div>
      ${isCorrect ? `
        <div class="row">
          <button class="primary" id="ans-continue">C &mdash; Continue</button>
          <button id="ans-pause">P &mdash; Pause &amp; Save</button>
        </div>
      ` : `
        <div class="row">
          <button class="primary" id="ans-gameover">Continue</button>
        </div>
      `}
    `;
  },

  gameOver: () => `
    <h1 class="title" style="color:var(--wrong);">###GAME OVER###</h1>
    <p class="tagline">${escapeHtml(S.player.name)}, better luck next time!</p>
    <div class="score-display">Your Final Score: ${formatINR(S.score)}</div>
    ${S.message ? `<div class="msg-banner success">${escapeHtml(S.message)}</div>` : ''}
    <div class="row">
      <button class="primary" id="go-mainmenu">Return to Main Menu</button>
    </div>
  `,

  crorepati: () => `
    <h1 class="title" style="color:var(--gold);">"Correct Answer"</h1>
    <div class="crorepati-banner">Congratulations! You have become a<br/>'CROREPATI'</div>
    <div class="score-display">Your Score: ${formatINR(S.score)}</div>
    ${S.message ? `<div class="msg-banner success">${escapeHtml(S.message)}</div>` : ''}
    <div class="row">
      <button class="primary" id="go-mainmenu">Return to Main Menu</button>
    </div>
  `,

  paused: () => `
    <h1 class="title">GAME SAVED</h1>
    <p class="tagline">${escapeHtml(S.player.name)}, your progress has been saved.</p>
    <div class="score-display">Score secured: ${formatINR(S.score)}</div>
    <p style="color:#a9a3e8;">Resume any time from "Saved Game" using your name and password.</p>
    <div class="row">
      <button class="primary" id="go-mainmenu">Return to Main Menu</button>
    </div>
  `,

  savedGameForm: () => `
    <h1 class="title">SAVED GAME</h1>
    <p class="tagline">Enter your name and password to resume</p>
    ${S.formError ? `<div class="msg-banner error">${escapeHtml(S.formError)}</div>` : ''}
    <div class="field">
      <label>Name</label>
      <input id="sg-name" type="text" autofocus />
    </div>
    <div class="field">
      <label>Password</label>
      <input id="sg-password" type="password" />
    </div>
    <div class="row">
      <button class="primary" id="sg-load">Load Game</button>
      <button id="sg-back">Back to Main Menu</button>
    </div>
  `,

  topScore: () => {
    const list = getTopScores();
    const rows = list.length
      ? list.map((e, i) => `<tr><td>${i + 1}</td><td>${escapeHtml(e.name)}</td><td>${formatINR(e.score)}</td><td>${escapeHtml(e.date)}</td><td>${escapeHtml(e.time)}</td></tr>`).join('')
      : `<tr><td colspan="5">No top scores yet &mdash; be the first Crorepati!</td></tr>`;
    return `
      <h1 class="title">TOP ${TOP_SCORE_LIMIT} SCORES</h1>
      <table class="score-table">
        <thead><tr><th>#</th><th>Name</th><th>Score</th><th>Date</th><th>Time</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
      <div class="row"><button class="primary" id="go-mainmenu">Return to Main Menu</button></div>
    `;
  },

  help: () => `
    <h1 class="title">HELP</h1>
    <div class="helptext">${escapeHtml(HELP_TEXT)}</div>
    <div class="row"><button class="primary" id="go-mainmenu">Return to Main Menu</button></div>
  `,

  about: () => `
    <h1 class="title">ABOUT</h1>
    <div class="about-list">
      <div><b>Software</b> &mdash; Kaun Banega Crorepati</div>
      <div><b>Version</b> &mdash; 2.0 (Web)</div>
      <div><b>Developed By</b> &mdash; Adarsh Anand</div>
      <div><b>Original DOS version</b> &mdash; 26-10-2011 to 04-01-2012</div>
      <div><b>Ported to the web</b> &mdash; 2026</div>
    </div>
    <div class="row"><button class="primary" id="go-mainmenu">Return to Main Menu</button></div>
  `,

  exit: () => `
    <h1 class="title">GOODBYE</h1>
    <p class="tagline">Thanks for playing KBC!</p>
    <div class="row"><button class="primary" id="go-welcome">Back to Title Screen</button></div>
  `,

  adminSetPassword: () => `
    <h1 class="title">MODIFICATIONS</h1>
    <p class="tagline">No admin password is set yet &mdash; create one</p>
    ${S.formError ? `<div class="msg-banner error">${escapeHtml(S.formError)}</div>` : ''}
    <div class="field">
      <label>New Password</label>
      <input id="ap-new" type="password" autofocus />
    </div>
    <div class="row">
      <button class="primary" id="ap-set">Set Password</button>
      <button id="ap-cancel">Cancel</button>
    </div>
  `,

  adminLogin: () => `
    <h1 class="title">MODIFICATIONS</h1>
    ${S.adminBlocked
      ? `<div class="msg-banner error">###PASSWORD BLOCKED### Too many wrong attempts. Reload the app to try again.</div>
         <div class="row"><button id="al-back">Back to Main Menu</button></div>`
      : `
        <p class="tagline">Enter Password</p>
        ${S.formError ? `<div class="msg-banner error">${escapeHtml(S.formError)}</div>` : ''}
        <div class="field">
          <input id="al-password" type="password" autofocus />
        </div>
        <div class="row">
          <button class="primary" id="al-submit">Submit</button>
          <button id="al-back">Back to Main Menu</button>
        </div>
      `}
  `,

  adminMenu: () => `
    <h1 class="title">MODIFICATIONS MENU</h1>
    ${S.message ? `<div class="msg-banner success">${escapeHtml(S.message)}</div>` : ''}
    <div class="menu-list">
      <button id="am-1">1. Modify Data</button>
      <button id="am-2">2. Reset High Scores</button>
      <button id="am-3">3. Modify Password</button>
      <button id="am-4">4. Saved Games</button>
      <button id="am-5">5. Main Menu</button>
    </div>
  `,

  adminSelectLevel: () => `
    <h1 class="title">MODIFY DATA</h1>
    <p class="tagline">Which level do you want to modify?</p>
    <div class="field">
      <select id="as-level">
        ${Array.from({ length: NUM_LEVELS }, (_, i) => i + 1).map(l => `<option value="${l}" ${l === S.editLevel ? 'selected' : ''}>Level ${l} &mdash; ${formatINR(PRIZES[l])}</option>`).join('')}
      </select>
    </div>
    <div class="row">
      <button class="primary" id="as-go">Edit Questions</button>
      <button id="as-back">Back</button>
    </div>
  `,

  adminEditLevel: () => {
    const draft = S.editDraft;
    return `
      <h1 class="title">LEVEL ${S.editLevel} QUESTIONS</h1>
      ${S.formError ? `<div class="msg-banner error">${escapeHtml(S.formError)}</div>` : ''}
      ${draft.map((rec, i) => `
        <div class="qa-editor">
          <h4>Question ${i + 1}</h4>
          <div class="field">
            <label>Question text</label>
            <input class="qa-q" data-idx="${i}" type="text" value="${escapeHtml(rec.q)}" />
          </div>
          <div class="field">
            <label>Option A</label>
            <input class="qa-opt" data-idx="${i}" data-opt="0" type="text" value="${escapeHtml(rec.options[0])}" />
          </div>
          <div class="field">
            <label>Option B</label>
            <input class="qa-opt" data-idx="${i}" data-opt="1" type="text" value="${escapeHtml(rec.options[1])}" />
          </div>
          <div class="field">
            <label>Option C</label>
            <input class="qa-opt" data-idx="${i}" data-opt="2" type="text" value="${escapeHtml(rec.options[2])}" />
          </div>
          <div class="field">
            <label>Option D</label>
            <input class="qa-opt" data-idx="${i}" data-opt="3" type="text" value="${escapeHtml(rec.options[3])}" />
          </div>
          <div class="answer-picker">
            ${['A', 'B', 'C', 'D'].map(L => `
              <label><input type="radio" class="qa-ans" name="ans-${i}" data-idx="${i}" value="${L}" ${rec.answer === L ? 'checked' : ''}/> ${L}</label>
            `).join('')}
          </div>
        </div>
      `).join('')}
      <div class="row">
        <button class="primary" id="ae-save">Save Level</button>
        <button id="ae-cancel">Cancel</button>
      </div>
    `;
  },

  adminResetConfirm: () => `
    <h1 class="title">RESET HIGH SCORES</h1>
    <p class="tagline">This will permanently clear the top score board. Continue?</p>
    <div class="row">
      <button class="danger" id="ar-confirm">Yes, Reset</button>
      <button id="ar-cancel">Cancel</button>
    </div>
  `,

  adminChangePassword: () => `
    <h1 class="title">MODIFY PASSWORD</h1>
    ${S.formError ? `<div class="msg-banner error">${escapeHtml(S.formError)}</div>` : ''}
    <div class="field">
      <label>New Admin Password</label>
      <input id="acp-new" type="password" autofocus />
    </div>
    <div class="row">
      <button class="primary" id="acp-save">Save</button>
      <button id="acp-cancel">Cancel</button>
    </div>
  `,

  adminSavedGames: () => {
    const games = getSavedGames();
    const rows = games.length
      ? games.map(g => `<tr><td>${escapeHtml(g.name)}</td><td>Level ${g.level}</td><td>${formatINR(g.score)}</td></tr>`).join('')
      : `<tr><td colspan="3">No saved games</td></tr>`;
    return `
      <h1 class="title">SAVED GAMES</h1>
      <table class="score-table">
        <thead><tr><th>Name</th><th>Level</th><th>Score</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
      <div class="row"><button class="primary" id="asg-back">Back to Modifications</button></div>
    `;
  }
};

/* ---------- Event binding ---------- */

function bindEvents() {
  const byId = id => document.getElementById(id);

  switch (S.screen) {
    case 'welcome': {
      byId('btn-continue').onclick = () => goto('mainMenu');
      break;
    }

    case 'mainMenu': {
      byId('mm-1').onclick = () => goto('newGameForm');
      byId('mm-2').onclick = () => goto('savedGameForm');
      byId('mm-3').onclick = () => goto('about');
      byId('mm-4').onclick = () => goto('topScore');
      byId('mm-5').onclick = () => goto('help');
      byId('mm-6').onclick = () => goto('exit');
      const goSecret = () => {
        const val = byId('secret-input').value.trim();
        if (val === '1503') { openAdmin(); return; }
        const map = { '1': 'newGameForm', '2': 'savedGameForm', '3': 'about', '4': 'topScore', '5': 'help', '6': 'exit' };
        if (map[val]) { goto(map[val]); return; }
        S.formError = '!!!SORRY !! WRONG CHOICE!!!';
        render();
      };
      byId('secret-go').onclick = goSecret;
      byId('secret-input').addEventListener('keydown', e => { if (e.key === 'Enter') goSecret(); });
      break;
    }

    case 'newGameForm': {
      byId('ng-back').onclick = () => goto('mainMenu');
      byId('ng-start').onclick = () => {
        const name = byId('ng-name').value.trim();
        const password = byId('ng-password').value;
        if (!name || !password) {
          S.formError = 'Please enter both your name and a password.';
          render();
          return;
        }
        S.player = { name, password };
        S.level = 1;
        S.score = 0;
        startLevel();
      };
      break;
    }

    case 'play': {
      document.querySelectorAll('.option-btn').forEach(btn => {
        btn.onclick = () => {
          S.selected = btn.getAttribute('data-letter');
          S.screen = 'answered';
          render();
        };
      });
      byId('play-quit').onclick = () => goto('mainMenu');
      break;
    }

    case 'answered': {
      const isCorrect = S.selected === S.currentQuestion.answer;
      if (isCorrect) {
        S.score = PRIZES[S.level];
        if (S.level === NUM_LEVELS) {
          finishAsCrorepati();
        } else {
          const contBtn = byId('ans-continue');
          const pauseBtn = byId('ans-pause');
          if (contBtn) contBtn.onclick = () => { S.level += 1; startLevel(); };
          if (pauseBtn) pauseBtn.onclick = () => pauseAndSave();
        }
      } else {
        const btn = byId('ans-gameover');
        if (btn) btn.onclick = () => finishAsGameOver();
      }
      break;
    }

    case 'gameOver':
    case 'crorepati':
    case 'paused':
    case 'topScore':
    case 'help':
    case 'about': {
      const btn = byId('go-mainmenu');
      if (btn) btn.onclick = () => goto('mainMenu');
      break;
    }

    case 'exit': {
      byId('go-welcome').onclick = () => goto('welcome');
      break;
    }

    case 'savedGameForm': {
      byId('sg-back').onclick = () => goto('mainMenu');
      byId('sg-load').onclick = () => {
        const name = byId('sg-name').value.trim();
        const password = byId('sg-password').value;
        const idx = findSavedGameIndex(name, password);
        if (idx === -1) {
          S.formError = "Wrong 'User Name' and/or 'Password' — Unable to Load Game";
          render();
          return;
        }
        const saved = getSavedGames()[idx];
        S.player = { name, password };
        S.level = saved.level;
        S.score = saved.score;
        startLevel();
      };
      break;
    }

    case 'adminSetPassword': {
      byId('ap-cancel').onclick = () => goto('mainMenu');
      byId('ap-set').onclick = () => {
        const pw = byId('ap-new').value;
        if (!pw) { S.formError = 'Password cannot be empty.'; render(); return; }
        setAdminPassword(pw);
        S.adminUnlocked = true;
        goto('adminMenu');
      };
      break;
    }

    case 'adminLogin': {
      const backBtn = byId('al-back');
      if (backBtn) backBtn.onclick = () => goto('mainMenu');
      const submitBtn = byId('al-submit');
      if (submitBtn) {
        submitBtn.onclick = () => {
          const pw = byId('al-password').value;
          if (pw === getAdminPassword()) {
            S.adminUnlocked = true;
            S.adminTrials = 0;
            goto('adminMenu');
          } else {
            S.adminTrials += 1;
            if (S.adminTrials >= MAX_ADMIN_TRIALS) {
              S.adminBlocked = true;
              render();
            } else {
              S.formError = `###WRONG PASSWORD### "ACCESS DENIED" (attempt ${S.adminTrials}/${MAX_ADMIN_TRIALS})`;
              render();
            }
          }
        };
      }
      break;
    }

    case 'adminMenu': {
      S.message = null;
      byId('am-1').onclick = () => goto('adminSelectLevel');
      byId('am-2').onclick = () => goto('adminResetConfirm');
      byId('am-3').onclick = () => goto('adminChangePassword');
      byId('am-4').onclick = () => goto('adminSavedGames');
      byId('am-5').onclick = () => goto('mainMenu');
      break;
    }

    case 'adminSelectLevel': {
      byId('as-back').onclick = () => goto('adminMenu');
      byId('as-go').onclick = () => {
        const level = parseInt(byId('as-level').value, 10);
        S.editLevel = level;
        const src = getQuestions()[level] || [];
        S.editDraft = src.map(r => ({ q: r.q, options: [...r.options], answer: r.answer }));
        goto('adminEditLevel');
      };
      break;
    }

    case 'adminEditLevel': {
      byId('ae-cancel').onclick = () => goto('adminSelectLevel');
      document.querySelectorAll('.qa-q').forEach(inp => {
        inp.oninput = () => { S.editDraft[+inp.dataset.idx].q = inp.value; };
      });
      document.querySelectorAll('.qa-opt').forEach(inp => {
        inp.oninput = () => { S.editDraft[+inp.dataset.idx].options[+inp.dataset.opt] = inp.value; };
      });
      document.querySelectorAll('.qa-ans').forEach(inp => {
        inp.onchange = () => { S.editDraft[+inp.dataset.idx].answer = inp.value; };
      });
      byId('ae-save').onclick = () => {
        const bad = S.editDraft.some(r => !r.q.trim() || r.options.some(o => !o.trim()));
        if (bad) {
          S.formError = 'Every question and all four options must be filled in.';
          render();
          return;
        }
        const all = getQuestions();
        all[S.editLevel] = S.editDraft;
        setQuestions(all);
        S.message = `Level ${S.editLevel} data successfully modified.`;
        goto('adminMenu');
      };
      break;
    }

    case 'adminResetConfirm': {
      byId('ar-cancel').onclick = () => goto('adminMenu');
      byId('ar-confirm').onclick = () => {
        setTopScores([]);
        S.message = 'Scores successfully reset.';
        goto('adminMenu');
      };
      break;
    }

    case 'adminChangePassword': {
      byId('acp-cancel').onclick = () => goto('adminMenu');
      byId('acp-save').onclick = () => {
        const pw = byId('acp-new').value;
        if (!pw) { S.formError = 'Password cannot be empty.'; render(); return; }
        setAdminPassword(pw);
        S.message = 'Password successfully modified.';
        goto('adminMenu');
      };
      break;
    }

    case 'adminSavedGames': {
      byId('asg-back').onclick = () => goto('adminMenu');
      break;
    }
  }
}

/* ---------- Flow helpers ---------- */

function openAdmin() {
  if (!getAdminPassword()) {
    goto('adminSetPassword');
  } else if (S.adminUnlocked) {
    goto('adminMenu');
  } else {
    goto('adminLogin');
  }
}

function startLevel() {
  S.currentQuestion = pickRandomQuestion(S.level);
  S.selected = null;
  goto('play');
}

function pauseAndSave() {
  upsertSavedGame({ name: S.player.name, password: S.player.password, level: S.level + 1, score: S.score });
  goto('paused');
}

function finishAsGameOver() {
  removeSavedGame(S.player.name, S.player.password);
  const madeTop5 = recordTopScore(S.player.name, S.score);
  S.message = madeTop5 ? `Congratulations! You have made the TOP ${TOP_SCORE_LIMIT}!` : null;
  goto('gameOver');
}

function finishAsCrorepati() {
  removeSavedGame(S.player.name, S.player.password);
  const madeTop5 = recordTopScore(S.player.name, S.score);
  S.message = madeTop5 ? `Congratulations! You have made the TOP ${TOP_SCORE_LIMIT}!` : null;
  goto('crorepati');
}

/* ---------- Boot ---------- */

async function boot() {
  const server = await fetchServerState();
  if (server) {
    if (server.questions) saveJSON(STORAGE_KEYS.questions, server.questions);
    if (server.topscores) saveJSON(STORAGE_KEYS.topscores, server.topscores);
    if (server.savedgames) saveJSON(STORAGE_KEYS.savedgames, server.savedgames);
    if (server.adminPassword) localStorage.setItem(STORAGE_KEYS.adminPassword, server.adminPassword);
  }
  render();
}

boot();
