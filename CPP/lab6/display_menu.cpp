#include "screen_utils.h"
#include "menu_controller.h"

void display_menu()
{
    printWithColor("---------------------", "blue", 20, 5);
    printWithColor("|       Display      |", "blue", 20, 6);
    printWithColor("---------------------", "blue", 20, 7);

    display_file();
}