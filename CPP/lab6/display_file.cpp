#include "menu_controller.h"
#include "screen_utils.h"

void display_file()
{
  char *filename = (char *)calloc(256, sizeof(char));
  if (!filename)
  {
    cout << "Memory allocation failed!";
    return;
  }

  clearScreen();
  printWithColor("Enter filename to display:", "white", 1, 1);
  gotoXY(1, 2);
  cin >> filename;

  // Open file
  FILE *file = fopen(filename, "r");
  if (!file)
  {
    printWithColor("Error: File not found!", "yellow", 1, 4);
    free(filename);
    return;
  }

  // Get file size
  fseek(file, 0, SEEK_END);
  long file_size = ftell(file);
  fseek(file, 0, SEEK_SET);

  // Allocate buffer for file content
  char *content = (char *)malloc((file_size + 1) * sizeof(char));
  if (!content)
  {
    printWithColor("Memory allocation failed!", "yellow", 1, 4);
    fclose(file);
    free(filename);
    return;
  }

  // Read file
  size_t bytes_read = fread(content, sizeof(char), file_size, file);
  content[bytes_read] = '\0';
  fclose(file);

  // Display file
  clearScreen();
  char *header = (char *)malloc(300 * sizeof(char));
  if (header)
  {
    sprintf(header, "File: %s", filename);
    printWithColor(header, "green", 1, 1);
    free(header);
  }
  printWithColor("----------------------------------------", "blue", 1, 2);

  int x = 1, y = 3;
  for (size_t i = 0; i < bytes_read && y < 40; i++)
  {
    if (content[i] == '\n')
    {
      y++;
      x = 1;
    }
    else
    {
      gotoXY(x++, y);
      cout << content[i];
    }
  }

  // Cleanup
  free(content);
  free(filename);
}