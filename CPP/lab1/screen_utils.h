#ifndef SCREEN_UTILS_H
#define SCREEN_UTILS_H

#include <iostream>
#include <string>
#include <thread>
#include <chrono>

using namespace std;

// Detect platform
#ifdef _WIN32
#include <windows.h>
#else
#include <unistd.h>
#endif

// Define color codes (for Linux)
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

// Function declarations
void gotoXY(int x, int y);
void printWithColor(const string &text, const string &color, int x, int y);
void sleepFor(int seconds);

#endif
