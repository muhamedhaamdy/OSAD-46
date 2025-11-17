#include "screen_utils.h"

#ifdef _WIN32
void gotoXY(int x, int y)
{
  COORD coord;
  coord.X = x;
  coord.Y = y;
  SetConsoleCursorPosition(GetStdHandle(STD_OUTPUT_HANDLE), coord);
}

void printWithColor(const string &text, const string &color, int x, int y)
{
  HANDLE hConsole = GetStdHandle(STD_OUTPUT_HANDLE);
  int colorCode = 7; // default white

  if (color == "red")
    colorCode = 4;
  else if (color == "green")
    colorCode = 2;
  else if (color == "yellow")
    colorCode = 6;
  else if (color == "blue")
    colorCode = 1;
  else if (color == "magenta")
    colorCode = 5;
  else if (color == "cyan")
    colorCode = 3;

  SetConsoleTextAttribute(hConsole, colorCode);
  gotoXY(x, y);
  cout << text << endl;
  SetConsoleTextAttribute(hConsole, 7); // reset color
}

void sleepFor(int seconds)
{
  Sleep(seconds * 1000);
}

#else
// For Linux and macOS
void gotoXY(int x, int y)
{
  cout << "\033[" << y << ";" << x << "H";
}

void printWithColor(const string &text, const string &color, int x, int y)
{
  string colorCode = RESET;

  if (color == "red")
    colorCode = RED;
  else if (color == "green")
    colorCode = GREEN;
  else if (color == "yellow")
    colorCode = YELLOW;
  else if (color == "blue")
    colorCode = BLUE;
  else if (color == "magenta")
    colorCode = MAGENTA;
  else if (color == "cyan")
    colorCode = CYAN;
  else
    colorCode = WHITE;

  gotoXY(x, y);
  cout << colorCode << text << RESET << endl;
}

void sleepFor(int seconds)
{
  this_thread::sleep_for(chrono::seconds(seconds));
}
#endif
