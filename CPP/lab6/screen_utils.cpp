#include "screen_utils.h"
#include <iostream>
#include <thread>
#include <chrono>

#ifdef _WIN32
#include <windows.h>
#include <conio.h>
#else
#include <termios.h>
#include <unistd.h>
#endif

using namespace std;

char lastChar = '\0';

#ifdef _WIN32

void clearScreen()
{
    HANDLE hConsole = GetStdHandle(STD_OUTPUT_HANDLE);
    COORD coordScreen = {0, 0};
    DWORD cCharsWritten;
    CONSOLE_SCREEN_BUFFER_INFO csbi;
    DWORD dwConSize;

    if (!GetConsoleScreenBufferInfo(hConsole, &csbi))
        return;

    dwConSize = csbi.dwSize.X * csbi.dwSize.Y;
    FillConsoleOutputCharacter(hConsole, ' ', dwConSize, coordScreen, &cCharsWritten);
    FillConsoleOutputAttribute(hConsole, csbi.wAttributes, dwConSize, coordScreen, &cCharsWritten);
    SetConsoleCursorPosition(hConsole, coordScreen);
}

void gotoXY(int x, int y)
{
    COORD coord = {(SHORT)x, (SHORT)y};
    SetConsoleCursorPosition(GetStdHandle(STD_OUTPUT_HANDLE), coord);
}

void printWithColor(const string &text, const string &color, int x, int y)
{
    int attr = 7;

    if (color == "blue")
        attr = 1;
    else if (color == "white")
        attr = 7;
    else if (color == "yellow")
        attr = 6;

    HANDLE hConsole = GetStdHandle(STD_OUTPUT_HANDLE);
    SetConsoleTextAttribute(hConsole, attr);

    gotoXY(x, y);
    cout << text;

    SetConsoleTextAttribute(hConsole, 7);
}

Key getKey()
{
    int ch = _getch();

    if (ch == 13)
        return ENTER_KEY;

    if (ch == 224)
    {
        int arrow = _getch();
        if (arrow == 72)
            return UP;
        if (arrow == 80)
            return DOWN;
        if (arrow == 75)
            return LEFT;
        if (arrow == 77)
            return RIGHT;
    }
    return NONE;
}

#else // ---------- LINUX / MACOS ----------

void clearScreen()
{
    cout << "\033[2J\033[1;1H";
}

void gotoXY(int x, int y)
{
    cout << "\033[" << y << ";" << x << "H";
}

void printWithColor(const string &text, const string &color, int x, int y)
{
    string code = WHITE;

    if (color == "blue")
        code = BLUE;
    else if (color == "yellow")
        code = YELLOW;
    else if (color == "white")
        code = WHITE;

    gotoXY(x, y);
    cout << code << text << RESET;
}

static void setRawMode(bool enable)
{
    static bool raw = false;
    static struct termios oldt;

    if (enable && !raw)
    {
        tcgetattr(STDIN_FILENO, &oldt);
        struct termios newt = oldt;
        newt.c_lflag &= ~(ICANON | ECHO);
        tcsetattr(STDIN_FILENO, TCSANOW, &newt);
        raw = true;
    }
    else if (!enable && raw)
    {
        tcsetattr(STDIN_FILENO, TCSANOW, &oldt);
        raw = false;
    }
}

Key getKey()
{
    setRawMode(true); // turn on raw mode before reading

    char ch = getchar();

    if (ch == '\n')
    {
        setRawMode(false);
        return ENTER_KEY;
    }

    // BACKSPACE: ASCII 127 (Linux) or 8 (some terminals)
    if (ch == 127 || ch == 8)
    {
        setRawMode(false);
        return BACKSPACE_KEY;
    }

    // ESC or Arrow keys
    if (ch == '\033')
    {
        char ch1 = getchar();

        // Single ESC press (ESC key)
        if (ch1 != '[')
        {
            setRawMode(false);
            return ESC_KEY;
        }

        char ch2 = getchar();

        setRawMode(false); // Don't forget this!

        if (ch2 == 'A')
            return UP;
        if (ch2 == 'B')
            return DOWN;
        if (ch2 == 'C')
            return RIGHT;
        if (ch2 == 'D')
            return LEFT;
    }

    // Handle printable characters (space to ~)
    if (ch >= 32 && ch <= 126)
    {
        lastChar = ch;
        setRawMode(false);
        return CHAR_KEY;
    }

    setRawMode(false);
    return NONE;
}

#endif

// void sleepMs(int ms)
// {
//     this_thread::sleep_for(chrono::milliseconds(ms));
// }
