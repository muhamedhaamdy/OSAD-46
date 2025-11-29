#include "menu_controller.h"
#include "screen_utils.h"

void runMenu()
{
    int selected = 0;
    bool running = true;

    while (running)
    {
        clearScreen();
        starting_screen_draw(selected);

        Key k = getKey();

        if (k == UP)
            selected = (selected + 3 - 1) % 3;
        else if (k == DOWN)
            selected = (selected + 1) % 3;
        else if (k == ENTER_KEY)
        {
            clearScreen();
            if (selected == 0)
                new_menu();
            else if (selected == 1)
                display_menu();
            else
            {
                running = false;
                break;
            }
            cout << "\n\nPress ENTER to go back...";
            cin.ignore();
            cin.get();
        }
    }

    // cout << "You selected option " << selected << endl;
}
