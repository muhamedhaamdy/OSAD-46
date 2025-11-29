#include "menu_controller.h"
#include "screen_utils.h"

int emp_number = 0;
Employee emp_arr[100];
void darw_new()
{
    printWithColor("---------------------", "blue", 20, 5);
    printWithColor("|       New         |", "blue", 20, 6);
    printWithColor("---------------------", "blue", 20, 7);
}

void new_menu()
{
    emp_number++;
    darw_new();
    printWithColor("|       Enter the first name         | ", "blue", 20, 8);
    cin >> emp_arr[emp_number].firstName;
    printWithColor("|       Enter the last name         | ", "blue", 20, 10);
    cin >> emp_arr[emp_number].lastName;
    printWithColor("|       Enter the age         | ", "blue", 20, 12);
    cin >> emp_arr[emp_number].age;
    printWithColor("|       Enter the job title         | ", "blue", 20, 14);
    cin >> emp_arr[emp_number].jobTitle;
    printWithColor("Employee added successfully!", "green", 20, 18);

    cout << "\nPress ENTER to return...";
    cin.ignore();
    cin.get();
}