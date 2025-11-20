#ifndef MENU_CONTROLLER_H
#define MENU_CONTROLLER_H
#include <bits/stdc++.h>

using namespace std;

void runMenu();
void new_menu();
void display_menu();

extern int emp_number;
extern int dispaly_line;
typedef struct
{
  string id;
  string firstName;
  string lastName;
  int age;
  string jobTitle;
} Employee;

extern Employee emp_arr[100];

#endif
