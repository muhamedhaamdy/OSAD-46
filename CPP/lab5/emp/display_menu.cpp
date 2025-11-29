#include "screen_utils.h"
#include "menu_controller.h"

void draw_display()
{
    printWithColor("---------------------", "blue", 20, 5);
    printWithColor("|       Display      |", "blue", 20, 6);
    printWithColor("---------------------", "blue", 20, 7);
}

string emp_data(Employee emp, int i)
{
    string s = "";
    s = "Employee no : " + to_string(i) +
        "\nFirst name : " + emp.firstName +
        "\nLast name : " + emp.lastName +
        "\nAge : " + to_string(emp.age) +
        "\nJob title : " + emp.jobTitle + "\n";

    return s;
}

void display_menu()
{
    int i = 1;
    int dispaly_line = 8;

    string s = "", color = "blue";

    draw_display();
    for (; i <= emp_number; i++)
    {
        if (i % 2)
            color = "blue";
        else
            color = "white";
        s = emp_data(emp_arr[i], i);
        printWithColor(s, color, 20, dispaly_line);
        dispaly_line += 6;
    }
    printWithColor("Employee added successfully!", "green", 20, dispaly_line);
    cout << "\nPress ENTER to return...";
    cin.ignore();
    cin.get();
}