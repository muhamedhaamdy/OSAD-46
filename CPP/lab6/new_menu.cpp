#include "menu_controller.h"
#include "screen_utils.h"
#include "editor.h"

void new_menu()
{
    printWithColor("---------------------", "blue", 20, 5);
    printWithColor("|       New         |", "blue", 20, 6);
    printWithColor("---------------------", "blue", 20, 7);

    editor();
}