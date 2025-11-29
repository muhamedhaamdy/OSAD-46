#include "editor.h"
#include "screen_utils.h"
#include "helper_function.h"
void execute_command(char *command, char *buffer, int len, bool &should_quit)
{
  // Trim leading spaces
  char *cmd = trim_leading_spaces(command);

  clearScreen();

  // Handle :q (quit)
  if (str_equals(cmd, "q"))
  {
    should_quit = true;
    printWithColor("Quitting...", "green", 1, 1);
    return;
  }

  // Handle :q! (force quit)
  if (str_equals(cmd, "q!"))
  {
    should_quit = true;
    printWithColor("Force quitting without saving...", "yellow", 1, 1);
    return;
  }

  // Handle :w filename (write/save)
  if (starts_with(cmd, "w "))
  {
    char *filename = trim_leading_spaces(cmd + 2); // Skip "w "

    if (str_length(filename) == 0)
    {
      printWithColor("Error: No filename specified!", "yellow", 1, 1);
      printWithColor("Usage: :w filename", "white", 1, 2);
      return;
    }

    // Save to file using C file I/O
    FILE *file = fopen(filename, "w");
    if (file)
    {
      fwrite(buffer, sizeof(char), len, file);
      fclose(file);

      // Create success message
      char *msg = (char *)malloc(100 * sizeof(char));
      if (msg)
      {
        sprintf(msg, "File saved successfully: %s", filename);
        printWithColor(msg, "green", 1, 1);
        free(msg);
      }
    }
    else
    {
      printWithColor("Error: Could not open file for writing!", "yellow", 1, 1);
    }
    return;
  }

  // Handle :wq filename (write and quit)
  if (starts_with(cmd, "wq "))
  {
    char *filename = trim_leading_spaces(cmd + 3); // Skip "wq "

    if (str_length(filename) == 0)
    {
      printWithColor("Error: No filename specified!", "yellow", 1, 1);
      printWithColor("Usage: :wq filename", "white", 1, 2);
      return;
    }

    FILE *file = fopen(filename, "w");
    if (file)
    {
      fwrite(buffer, sizeof(char), len, file);
      fclose(file);

      char *msg = (char *)malloc(100 * sizeof(char));
      if (msg)
      {
        sprintf(msg, "File saved: %s", filename);
        printWithColor(msg, "green", 1, 1);
        free(msg);
      }
      should_quit = true;
    }
    else
    {
      printWithColor("Error: Could not save file!", "yellow", 1, 1);
    }
    return;
  }

  // Unknown command
  printWithColor("Unknown command!", "yellow", 1, 1);
  printWithColor("Available: :w filename, :q, :wq filename, :q!", "white", 1, 2);
}

void comand_mode(char *buffer, int &len, bool &should_quit)
{
  char *command = (char *)calloc(256, sizeof(char)); // Initialized to zero

  if (!command)
  {
    cout << "Failed to allocate memory for command!";
    return;
  }

  int cmd_len = 0;

  clearScreen();
  printWithColor("COMMAND MODE", "yellow", 1, 1);
  printWithColor("Enter command (e.g., :w filename, :q, :wq filename, :q!):", "white", 1, 2);
  gotoXY(1, 4);
  cout << ":";
  cout.flush();

  int x_pos = 2;

  while (true)
  {
    Key k = getKey();

    if (k == ESC_KEY)
    {
      // Cancel command mode
      free(command);
      return;
    }

    if (k == ENTER_KEY)
    {
      // Execute the command
      command[cmd_len] = '\0'; // Null-terminate
      execute_command(command, buffer, len, should_quit);
      free(command);
      return;
    }

    if (k == BACKSPACE_KEY)
    {
      if (cmd_len > 0)
      {
        cmd_len--;
        command[cmd_len] = '\0'; // Clear the character
        x_pos--;
        gotoXY(x_pos, 4);
        cout << " "; // Erase character on screen
        gotoXY(x_pos, 4);
        cout.flush();
      }
      continue;
    }

    if (k == CHAR_KEY && cmd_len < 255)
    {
      command[cmd_len++] = lastChar;
      gotoXY(x_pos, 4);
      cout << lastChar;
      cout.flush();
      x_pos++;
    }
  }
}
