#include "editor.h"
#include "screen_utils.h"
#include "helper_function.h"
#define CAPACITY 1024
#define LINES 100

// Helper function: trim leading spaces

void editor()
{
  int *line_start = (int *)malloc(sizeof(int) * LINES);
  char *buffer = (char *)malloc(CAPACITY * sizeof(char));
  int len = 0;
  Key k;
  line_start[0] = 0;
  bool should_quit = false; // ← ADD THIS

  if (!line_start || !buffer)
  {
    cout << "Failed allocation!";
    return;
  }

  while (!should_quit) // ← CHANGE from 'while (true)' to 'while (!should_quit)'
  {
    clearScreen();
    printWithColor("Press ENTER for Insert Mode | Press ESC for Command Mode", "white", 10, 8);
    k = getKey();

    if (k == ENTER_KEY)
    {
      clearScreen();
      printWithColor("-- INSERT MODE -- (Press ESC to enter command mode)", "green", 1, 1);
      insert_mode(buffer, len, line_start);
    }
    if (k == ESC_KEY)
    {
      clearScreen();
      comand_mode(buffer, len, should_quit); // ← ADD 'should_quit' parameter here

      if (!should_quit)
      {
        clearScreen();
        printWithColor("Command cancelled or executed. Press any key...", "yellow", 1, 1);
        getKey();
      }
    }
  }

  // Cleanup - FREE the allocated memory!
  free(line_start);
  free(buffer);

  clearScreen();
  printWithColor("Editor closed. Returning to menu...", "green", 1, 1);
}
