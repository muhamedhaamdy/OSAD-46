#include "screen_utils.h"

void starting_screen_draw(int selected)
{
    // NEW
    printWithColor("---------------------", selected == 0 ? "white" : "blue", 20, 5);
    printWithColor("|       New         |", selected == 0 ? "white" : "blue", 20, 6);
    printWithColor("---------------------", selected == 0 ? "white" : "blue", 20, 7);

    // DISPLAY
    printWithColor("---------------------", selected == 1 ? "white" : "blue", 20, 9);
    printWithColor("|     Display       |", selected == 1 ? "white" : "blue", 20, 10);
    printWithColor("---------------------", selected == 1 ? "white" : "blue", 20, 11);

    // EXIT
    printWithColor("---------------------", selected == 2 ? "white" : "blue", 20, 13);
    printWithColor("|      Exit         |", selected == 2 ? "white" : "blue", 20, 14);
    printWithColor("---------------------", selected == 2 ? "white" : "blue", 20, 15);
}
