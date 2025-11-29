#ifndef SCREEN_UTILS_H
#define SCREEN_UTILS_H

#include <iostream>
#include <string>
#include <bits/stdc++.h>

// Colors for Linux/macOS
#ifndef _WIN32
#define RESET "\033[0m"
#define RED "\033[31m"
#define GREEN "\033[32m"
#define YELLOW "\033[33m"
#define BLUE "\033[34m"
#define MAGENTA "\033[35m"
#define CYAN "\033[36m"
#define WHITE "\033[37m"
#endif

using namespace std;

void clearScreen();
void gotoXY(int x, int y);
void printWithColor(const string &text, const string &color, int x, int y);
void sleepMs(int ms);
void starting_screen_draw(int selected);

// --------- KEYS ---------
enum Key
{
  NONE,
  UP,
  DOWN,
  LEFT,
  RIGHT,
  ESC_KEY,
  BACKSPACE_KEY,
  ENTER_KEY,
  CHAR_KEY
};
extern char lastChar; // To store the last character read

Key getKey();

#endif
