#include<fstream>
#include<conio.h>
#include<stdio.h>
#include<process.h>
#include<stdlib.h>
#include<string.h>
#include<ctype.h>
#include<iostream>
#include<dos.h>

using namespace std;

void game();
void about();
void help();
void mainmenu();
void topscore();
void modifications();
void mdata();
void modmenu();
void rtopscore();
void retry(char *fpassword,int &trial);
void getaccess(char *fpassword,int &trial);
void saveddata();

char* passin()
{
char *ipassword;
ipassword=new char[20];
for(int p=0;p<20;p++)
{
	ipassword[p]=getch();
	if(ipassword[p]=='\r')
	{
		ipassword[p]='\0';
		break;
	}
	if(ipassword[p]=='\b')
	{
		if(p==0)
		{
			p--;
			continue;
		}
		std::cout<<"\b";
		textcolor(6);
		clreol();
		p-=2;
	}
	else
	{
		std::cout<<char(2);
	}
}
return ipassword;
}

int block=0;

class data
{

char que[500];
char a[50];
char b[50];
char c[50];
char d[50];
char ans1,ans2;

public:

void getdata()
{
cout<<"\n\nEnter Question : ";
gets(que);
cout<<"\nEnter Option-A : ";
gets(a);
cout<<"Enter Option-B : ";
gets(b);
cout<<"Enter Option-C : ";
gets(c);
cout<<"Enter Option-D : ";
gets(d);
cout<<"\nEnter Answer : ";
cin>>ans1;
if(isupper(ans1))
	ans2=tolower(ans1);
else
	ans2=toupper(ans1);
}

void putdata()
{
puts(que);
gotoxy(1,5);
cout<<"\n(A) "<<a;
cout<<"\n(B) "<<b;
cout<<"\n(C) "<<c;
cout<<"\n(D) "<<d;
}

char getans1()
{
return ans1;
}
char getans2()
{
return ans2;
}
};

class user
{
char name[30];
char password[20];
int level;
long int score;

public:

void game();
void savedgame();
void getdata();

void putdata()
{
cout<<"\nName : "<<name;
cout<<"\nPassword : "<<password;
cout<<"\nLevel : "<<level;
cout<<"\nScore : "<<score;
}

user()
{
score=0;
level=1;
}

}player;

struct tscore
{
char name[30];
long int score;
struct date d;
struct time t;

void putdata()
{
cout<<"\nName  : "<<name;
cout<<"\nScore : "<<score;
cout<<"\nDate  : "<<(int)d.da_day<<'-'<<(int)d.da_mon<<'-'<<d.da_year;
cout<<"\nTime  : "<<(int)t.ti_hour<<':'<<(int)t.ti_min<<':'<<(int)t.ti_sec;
}

tscore()
{
strcpy(name,'\0');
score=0;
d.da_day=0;
d.da_mon=0;
d.da_year=0;
t.ti_hour=0;
t.ti_min=0;
t.ti_sec=0;
t.ti_hund=0;
}

}top;

ifstream ifile;
ofstream ofile;


void main()
{
int gdriver = EGA, gmode = EGAHI;
int bkcol;
initgraph(&gdriver, &gmode, " a");
cleardevice();
setbkcolor(5);
gotoxy(34,8);
cout<<"WELCOME TO";
gotoxy(26,10);
cout<<"KAUN BANEGA CROREPATI (KBC)";
gotoxy(28,12);
cout<<"DESIGNED & DEVELOPED BY";
gotoxy(36,14);
cout<<"ADARSH";
gotoxy(25,20);
cout<<"<PRESS ENTER KEY TO CONTINUE>";
getch();
mainmenu();
}

void mainmenu()
{
cleardevice();
setbkcolor(4);
int choice;
gotoxy(32,8);
cout<<"MAIN MENU   ";
gotoxy(32,9);
cout<<"1-NEW GAME  ";
gotoxy(32,10);
cout<<"2-SAVED GAME";
gotoxy(32,11);
cout<<"3-ABOUT     ";
gotoxy(32,12);
cout<<"4-TOP SCORE ";
gotoxy(32,13);
cout<<"5-HELP      ";
gotoxy(32,14);
cout<<"6-EXIT      ";
gotoxy(19,20);
cout<<"<Enter Your Choice then Press Enter key> ";
cin>>choice;

switch(choice)
{
case 1: player.getdata();
	player.game();
	break;
case 2: player.savedgame();
	break;
case 3: about();
	break;
case 4: topscore();
	break;
case 5: help();
	break;
case 6: exit(0);
	break;
case 1503: modifications();
	   break;
default:cleardevice();
	gotoxy(26,12);
	cout<<"\a!!!SORRY !! WRONG CHOICE!!!";
	gotoxy(22,20);
	cout<<"<Press Enter to Return to Main Menu>";
	getchar();
	mainmenu();
	break;
}
}

void modifications()
{
cleardevice();
setbkcolor(6);
gotoxy(1,1);
if(block)
{
	gotoxy(32,10);
	cout<<"\"ACCESS DENIED\"\n";
	getch();
	mainmenu();
}
char ipassword[20];
ifile.open("password.dat",ios::in,ios::binary);
if(!ifile)
{
	gotoxy(22,10);
	cout<<"Enter New Password : ";
	strcpy(ipassword,passin());
	ofile.open("password.dat",ios::out,ios::binary);
	ofile.write((char*)&ipassword,sizeof(ipassword));
	ofile.close();
}
else
{
char fpassword[20];
ifile.read((char*)&fpassword,sizeof(fpassword));
ifile.close();
int trial=1;

getaccess(fpassword,trial);
}
modmenu();
}

void getaccess(char *fpassword,int &trial)
{
cleardevice();
setbkcolor(6);
char ipassword[20];
gotoxy(22,10);
cout<<"Enter Password : ";
strcpy(ipassword,passin());
if(strcmp(ipassword,fpassword))
{
cleardevice();
gotoxy(27,8);
cout<<"###WRONG PASSWORD###";
gotoxy(29,10);
cout<<"\"ACCESS DENIED\"";
getch();
if(trial<=5)
{
	retry(fpassword,trial);
}
else
{
	cleardevice();
	gotoxy(28,10);
	cout<<"###PASSWORD BLOCKED###";
	block=1;
	gotoxy(22,20);
	cout<<"<Press Enter to Return to Main Menu>";
	getch();
	mainmenu();
}
}
else
{
	cleardevice();
	gotoxy(32,10);
	cout<<"\"ACCESS GRANTED\"";
	getch();
	modmenu();
}
}

void retry(char *fpassword,int &trial)
{
cleardevice();
setbkcolor(4);
int ch;
gotoxy(32,8);
cout<<"1-RETRY";
gotoxy(32,10);
cout<<"2-MAIN MENU";
gotoxy(28,14);
cout<<"ENTER YOUR CHOICE : ";
cin>>ch;
switch(ch)
{
case 1: trial+=1;
	getaccess(fpassword,trial);
	break;
case 2: mainmenu();
	break;
default:cleardevice();
	gotoxy(26,12);
	cout<<"\a!!!SORRY !! WRONG CHOICE!!!";
	gotoxy(26,20);
	cout<<"<Press Enter to Continue>";
	getch();
	retry(fpassword,trial);
	break;
}
}

void modmenu()
{
int count,choice;
do
{
cleardevice();
setbkcolor(4);
count=1;
gotoxy(32,8);
cout<<"MODIFICATIONS MENU";
gotoxy(32,9);
cout<<"1-MODIFY DATA";
gotoxy(32,10);
cout<<"2-RESET HIGHSCORES";
gotoxy(32,11);
cout<<"3-MODIFY PASSWORD";
gotoxy(32,12);
cout<<"4-SAVED DATA";
gotoxy(32,13);
cout<<"5-MAIN MENU";
gotoxy(19,20);
cout<<"<Enter Your Choice then Press Enter key> ";
cin>>choice;

switch(choice)
{
case 1: mdata();
	break;
case 2: rtopscore();
	break;
case 3: cleardevice();
	setbkcolor(6);
	char ipassword[20];
	gotoxy(22,10);
	cout<<"Enter New Password : ";
	strcpy(ipassword,passin());
	ofile.open("password.dat",ios::out,ios::binary);
	ofile.write((char*)&ipassword,sizeof(ipassword));
	ofile.close();
	count=0;
	break;
case 4: saveddata();
	break;
case 5: mainmenu();
	break;
default:cleardevice();
	count=0;
	gotoxy(26,12);
	cout<<"\a!!!SORRY !! WRONG CHOICE!!!";
	gotoxy(18,20);
	cout<<"<Press Enter to Return to Modifications Menu>";
	getch();
	modmenu();
	break;
}
}while(!count);
}

void mdata()
{
cleardevice();
setbkcolor(1);
int ch;
gotoxy(18,10);
cout<<"Which Level do you want to Modify? ";
cin>>ch;
switch(ch)
{
case 1: ofile.open("level1.dat",ios::out|ios::binary);
	break;
case 2: ofile.open("level2.dat",ios::out|ios::binary);
	break;
case 3: ofile.open("level3.dat",ios::out|ios::binary);
	break;
case 4: ofile.open("level4.dat",ios::out|ios::binary);
	break;
case 5: ofile.open("level5.dat",ios::out|ios::binary);
	break;
case 6: ofile.open("level6.dat",ios::out|ios::binary);
	break;
case 7: ofile.open("level7.dat",ios::out|ios::binary);
	break;
case 8: ofile.open("level8.dat",ios::out|ios::binary);
	break;
case 9: ofile.open("level9.dat",ios::out|ios::binary);
	break;
case 10: ofile.open("level10.dat",ios::out|ios::binary);
	 break;
}
if(!ofile)
{
	gotoxy(30,10);
	cout<<"File Opening Error";
	gotoxy(22,20);
	cout<<"<Press Enter To Return to Main Menu>";
	getch();
	mainmenu();
}
data q;
for(int i=0;i<5;i++)
{
cleardevice();
gotoxy(24,2);
cout<<"Record no. : "<<i+1;
q.getdata();
ofile.write((char*)&q,sizeof(data));
}
ofile.close();
cleardevice();
gotoxy(28,10);
cout<<"Data Successfully Modified";
gotoxy(18,18);
cout<<"<Press Enter to Return to Modifications Menu>";
getch();
modmenu();
}

void rtopscore()
{
cleardevice();
setbkcolor(6);
remove("topscore.dat");
	gotoxy(26,10);
	cout<<"Scores Successfully Reset";
	gotoxy(18,18);
	cout<<"<Press Enter to Return to Modifications Menu>";
	getch();
	modmenu();
}

void about()
{
cleardevice();
setbkcolor(6);
gotoxy(22,8);
cout<<"Software      : Kaun Banega Crorepati";
gotoxy(22,10);
cout<<"Version       : 1.0";
gotoxy(22,12);
cout<<"Developed By  : Adarsh Anand";
gotoxy(22,14);
cout<<"Starting date : 26-10-2011";
gotoxy(22,16);
cout<<"Finish date   : 04-01-2012";
gotoxy(19,21);
cout<<"<Press Enter to Return to Main Menu>";
getch();
mainmenu();
}

void topscore()
{
setbkcolor(1);
cleardevice();
gotoxy(1,1);
tscore top;
ifile.open("topscore.dat",ios::in|ios::binary);
if(!ifile)
{
	top.putdata();
	gotoxy(22,20);
	cout<<"<Press Enter to Return to Main Menu>";
	getch();
	mainmenu();
}
else
{
	int y=1,z=1;
	while(ifile.read((char*)&top,sizeof(tscore)))
	{
	if(y>3)
	{
		cout<<"\n\n.....";
		getchar();
		cleardevice();
		gotoxy(1,1);
		y=1;
	}
	cout<<z<<" ->";
	top.putdata();
	y++,z++;
	cout<<"\n\n";
	}
	ifile.close();
	gotoxy(22,20);
	cout<<"<Press Enter to Return to Main Menu>";
	getch();
	mainmenu();
}
}

void help()
{
cleardevice();
setbkcolor(1);
gotoxy(1,1);
ifile.open("help.txt",ios::in);
if(!ifile)
{
	gotoxy(30,10);
	cout<<"File Opening Error";
	gotoxy(22,20);
	cout<<"<Press Enter To Return to Main Menu>";
	getch();
	mainmenu();
}
char ch;
while(!ifile.eof())
{
ifile.get(ch);
cout.put(ch);
}
ifile.close();
cout<<'\n';
gotoxy(22,20);
cout<<"<Press Enter to Return to Main Menu>";
getch();
mainmenu();
}

void user::getdata()
{
cleardevice();
setbkcolor(6);
gotoxy(22,10);
cout<<"Enter your name :  ";
gets(name);
gotoxy(22,11);
cout<<"Enter a Password : ";
strcpy(password,passin());
score=0;
level=1;
}

void user::game()
{
cleardevice();
setbkcolor(1);
for(;level<=10;level++)
{
cleardevice();
gotoxy(32,2);
cout<<"Level : "<<level<<"\n\n";
switch(level)
{
case 1: ifile.open("level1.dat",ios::ate|ios::binary);
	break;
case 2: ifile.open("level2.dat",ios::ate|ios::binary);
	break;
case 3: ifile.open("level3.dat",ios::ate|ios::binary);
	break;
case 4: ifile.open("level4.dat",ios::ate|ios::binary);
	break;
case 5: ifile.open("level5.dat",ios::ate|ios::binary);
	break;
case 6: ifile.open("level6.dat",ios::ate|ios::binary);
	break;
case 7: ifile.open("level7.dat",ios::ate|ios::binary);
	break;
case 8: ifile.open("level8.dat",ios::ate|ios::binary);
	break;
case 9: ifile.open("level9.dat",ios::ate|ios::binary);
	break;
case 10: ifile.open("level10.dat",ios::ate|ios::binary);
	 break;
}
if(!ifile)
{
	gotoxy(30,10);
	cout<<"File Opening Error";
	gotoxy(22,20);
	cout<<"<Press Enter To Return to Main Menu>";
	getch();
	mainmenu();
}
data q;
randomize();
int ran=random(5);
ifile.seekg((ran*sizeof(data)),ios::beg);
ifile.read((char*)&q,sizeof(data));
ifile.close();
q.putdata();
gotoxy(26,12);
cout<<"Enter correct choice : ";
char ch;
cin>>ch;
if((ch==q.getans1())||(ch==q.getans2()))
{
	gotoxy(30,14);
	cout<<"\"Correct Answer\"";
	switch(level)
	{
	case 1: score=25000;
		break;
	case 2: score=50000;
		break;
	case 3: score=78125;
		break;
	case 10:score=10000000;
		cleardevice();
		setbkcolor(2);
		gotoxy(33,8);
		cout<<"\"Correct Answer\"";
		gotoxy(18,12);
		cout<<"Congratulations! You have become \'CROREPATI\'";
		ifile.open("topscore.dat",ios::in|ios::binary);
		if(!ifile)
		{
			gotoxy(20,14);
			cout<<"Congratulations! You have made TOP SCORE";
			strcpy(top.name,name);
			top.score=score;
			getdate(&top.d);
			gettime(&top.t);
			ofile.open("topscore.dat",ios::out|ios::binary);
			ofile.write((char*)&top,sizeof(tscore));
			ofile.close();
		}
		else
		{
			ifile.read((char*)&top,sizeof(tscore));
			ifile.close();
			if(score>top.score)
			{
			gotoxy(20,14);
			cout<<"Congratulations! You have made TOP SCORE";
			strcpy(top.name,name);
			top.score=score;
			getdate(&top.d);
			gettime(&top.t);
			ofile.open("topscore.dat",ios::out|ios::binary);
			ofile.write((char*)&top,sizeof(tscore));
			ofile.close();
			}
			else
			{
			if(score==top.score)
			{
			gotoxy(20,14);
			cout<<"Congratulations! You have made TOP SCORE";
			strcpy(top.name,name);
			top.score=score;
			getdate(&top.d);
			gettime(&top.t);
			ofile.open("topscore.dat",ios::app|ios::binary);
			ofile.write((char*)&top,sizeof(tscore));
			ofile.close();
			}
			}
		}
		gotoxy(28,10);
		cout<<"Your Score is : "<<score;
		getch();
		ifile.open("savedgames.dat",ios::in|ios::binary);
		if(ifile)
		{
		ofile.open("temp.dat",ios::out|ios::binary);
		user temp;
		while(ifile.read((char*)&temp,sizeof(user)))
		{
			if(strcmp(name,temp.name))
			{
				ofile.write((char*)&temp,sizeof(user));
			}
			else
			{
				if(strcmp(password,temp.password))
				{
				ofile.write((char*)&temp,sizeof(user));
				}
			}
		}
		ifile.close();
		ofile.close();
		remove("savedgames.dat");
		rename("temp.dat","savedgames.dat");
		}
		mainmenu();
		break;
	default:score=score*2;
		break;
	}
	gotoxy(26,16);
	cout<<"Your Score is : "<<score;
	gotoxy(21,19);
	cout<<"P-PAUSE";
	gotoxy(45,19);
	cout<<"C-CONTINUE";
	char temp;
	temp=getche();
	if((temp=='P')||(temp=='p'))
	{
	cleardevice();
	level++;
	ifile.open("savedgames.dat",ios::in|ios::binary);
	if(!ifile)
	{
		ofile.open("savedgames.dat",ios::app|ios::binary);
		if(!ofile)
		{
		gotoxy(30,10);
		cout<<"File Opening Error";
		gotoxy(27,12);
		cout<<"Unable to save the game";
		gotoxy(22,20);
		cout<<"<Press Enter To Return to Main Menu>";
		getch();
		}
		ofile.write((char*)&player,sizeof(user));
		ofile.close();
		gotoxy(28,12);
		cout<<"Game Saved Successfully";
		gotoxy(22,20);
		cout<<"<Press Enter to Return to Main Menu>";
		getch();
		mainmenu();
	}
	else
	{
	user temp;
	while(ifile.read((char*)&temp,sizeof(user)))
	{
	if(!strcmp(name,temp.name))
	{
		if(!strcmp(password,temp.password))
		{
		int pos;
		pos=((ifile.tellg())-(sizeof(user)));
		ifile.close();
		ofile.open("savedgames.dat",ios::ate|ios::binary);
		if(!ofile)
		{
		gotoxy(30,10);
		cout<<"File Opening Error";
		gotoxy(27,12);
		cout<<"Unable to save the Game";
		gotoxy(22,20);
		cout<<"<Press Enter To Return to Main Menu>";
		getch();
		}
		ofile.seekp(pos,ios::beg);
		ofile.write((char*)&player,sizeof(user));
		ofile.close();
		gotoxy(28,12);
		cout<<"Game Saved Successfully";
		gotoxy(22,20);
		cout<<"<Press Enter to Return to Main Menu>";
		getch();
		mainmenu();
		}
	}
	}
	ifile.close();
	ofile.open("savedgames.dat",ios::app|ios::binary);
		if(!ofile)
		{
		gotoxy(30,10);
		cout<<"File Opening Error";
		gotoxy(27,12);
		cout<<"Unable to save the Game";
		gotoxy(22,20);
		cout<<"<Press Enter To Return to Main Menu>";
		getch();
		}
		ofile.write((char*)&player,sizeof(user));
		ofile.close();
		gotoxy(28,12);
		cout<<"Game Saved Successfully";
		gotoxy(22,20);
		cout<<"<Press Enter to Return to Main Menu>";
		getch();
		mainmenu();
	}
	}
}
else
{
	gotoxy(29,14);
	cout<<"\"Incorrect Answer\"";
	gotoxy(26,16);
	cout<<"Your Final Score is : "<<score;
	gotoxy(30,18);
	cout<<"###GAME OVER###\n";
	ifile.open("savedgames.dat",ios::in|ios::binary);
		if(ifile)
		{
		ofile.open("temp.dat",ios::out|ios::binary);
		user temp;
		while(ifile.read((char*)&temp,sizeof(user)))
		{
			if(strcmp(name,temp.name))
			{
				ofile.write((char*)&temp,sizeof(user));
			}
			else
			{
				if(strcmp(password,temp.password))
				{
				ofile.write((char*)&temp,sizeof(user));
				}
			}
		}
		ifile.close();
		ofile.close();
		remove("savedgames.dat");
		rename("temp.dat","savedgames.dat");
		}
	ifile.open("topscore.dat",ios::in|ios::binary);
	if(!ifile)
	{
	if(score>0)
	{
	gotoxy(20,20);
	cout<<"Congratulations! You have made TOP SCORE";
	strcpy(top.name,name);
	top.score=score;
	getdate(&top.d);
	gettime(&top.t);
	ofile.open("topscore.dat",ios::out|ios::binary);
	ofile.write((char*)&top,sizeof(tscore));
	ofile.close();
	}
	}
	else
	{
	ifile.read((char*)&top,sizeof(tscore));
	ifile.close();
	if(score>top.score)
	{
		gotoxy(20,20);
		cout<<"Congratulations! You have made TOP SCORE";
		strcpy(top.name,name);
		top.score=score;
		getdate(&top.d);
		gettime(&top.t);
		ofile.open("topscore.dat",ios::out|ios::binary);
		ofile.write((char*)&top,sizeof(tscore));
		ofile.close();
	}
	else
	{
	if(score==top.score)
	{
		gotoxy(20,20);
		cout<<"Congratulations! You have made TOP SCORE";
		strcpy(top.name,name);
		top.score=score;
		getdate(&top.d);
		gettime(&top.t);
		ofile.open("topscore.dat",ios::app|ios::binary);
		ofile.write((char*)&top,sizeof(tscore));
		ofile.close();
	}
	}
	}
	getch();
	mainmenu();
}
}
}

void user::savedgame()
{
cleardevice();
char iname[30];
char ipassword[20];
ifile.open("savedgames.dat",ios::in|ios::binary);
if(!ifile)
{
	gotoxy(30,10);
	cout<<"File Opening Error";
	gotoxy(30,12);
	cout<<"Unable to Load Game";
	gotoxy(22,20);
	cout<<"<Press Enter to Return to Main Menu>";
	getch();
	mainmenu();
}
setbkcolor(6);
gotoxy(22,10);
cout<<"Enter User Name : ";
gets(iname);
gotoxy(22,11);
cout<<"Enter Password  : ";
strcpy(ipassword,passin());
while(ifile.read((char*)&player,sizeof(user)))
{
	if(!strcmp(name,iname))
	{
		if(!strcmp(password,ipassword))
		{
		ifile.close();
		game();
		}
	}
}
cleardevice();
gotoxy(24,10);
cout<<"Wrong \'User Name\' and/or \'Password\'";
gotoxy(29,12);
cout<<"Unable to Load Game";
gotoxy(22,20);
cout<<"<Press Enter to Return to Main Menu>";
ifile.close();
getch();
mainmenu();
}

void saveddata()
{
cleardevice();
gotoxy(1,1);
ifile.open("savedgames.dat",ios::in|ios::binary);
if(!ifile)
{
	setbkcolor(6);
	gotoxy(30,10);
	cout<<"File Opening Error";
	gotoxy(30,12);
	cout<<"Unable to get Game";
	gotoxy(22,20);
	cout<<"<Press Enter to Return to Main Menu>";
	getch();
	mainmenu();
}
setbkcolor(1);
int y=1,z=1;
user temp;
	while(ifile.read((char*)&temp,sizeof(user)))
	{
	if(y>3)
	{
		char temp;
		gotoxy(21,20);
		cout<<"E-ESCAPE";
		gotoxy(45,20);
		cout<<"M-MORE";
		temp=getche();
		if((temp=='E')||(temp=='e'))
		{
			ifile.close();
			modmenu();
		}
		cleardevice();
		gotoxy(1,1);
		y=1;
	}
	cout<<z<<" ->";
	temp.putdata();
	y++,z++;
	cout<<"\n\n";
	}
	ifile.close();
	gotoxy(18,18);
	cout<<"<Press Enter to Return to Modifications Menu>";
	getch();
	modmenu();
}

