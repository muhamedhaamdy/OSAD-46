#include "magic_box.h"
#include "screen_utils.h"
#include <bits/stdc++.h>

void draw_magic_box(int n)
{
  int cell = 80 / n;
  // row range => [3,4,5]
  int init_row = 0;
  int current_row = init_row;
  // col range => [1,2,3] * cell
  int current_col = n / 2;
  int i = 1;
  printWithColor("1", "blue", current_col * cell, current_row);
  sleepFor(1);
  // current_col = (current_col + 1) % n;
  // current_row = (current_row - 1 < 3) ? init_row + n - 1 : current_row - 1;
  // printWithColor("2", "blue", current_col * cell, current_row);
  // current_col = (current_col + 1) % n;
  // current_row = (current_row - 1 < 3) ? init_row + n - 1 : current_row - 1;
  // printWithColor("3", "blue", current_col * cell, current_row);
  // current_row = (current_row + 1);
  // printWithColor("4", "blue", current_col * cell, current_row);
  // current_col = (current_col + 1) % n;
  // current_row = (current_row - 1 < 3) ? init_row + n - 1 : current_row - 1;
  // printWithColor("5", "blue", current_col * cell, current_row);
  // current_col = (current_col + 1) % n;
  // current_row = (current_row - 1 < 3) ? init_row + n - 1 : current_row - 1;
  // printWithColor("6", "blue", current_col * cell, current_row);
  // current_row = (current_row + 1);
  // printWithColor("7", "blue", current_col * cell, current_row);
  // current_col = (current_col + 1) % n;
  // current_row = (current_row - 1 < 3) ? init_row + n - 1 : current_row - 1;
  // printWithColor("8", "blue", current_col * cell, current_row);
  // current_col = (current_col + 1) % n;
  // current_row = (current_row - 1 < 3) ? init_row + n - 1 : current_row - 1;
  // printWithColor("9", "blue", current_col * cell, current_row);

  for (i = 2; i <= n * n; i++)
  {
    if ((i - 1) % n == 0)
    {
      current_row = init_row + ((current_row + 1) % n);
    }
    else
    {
      current_col = (current_col + 1) % n;
      current_row = (current_row - 1 < init_row) ? init_row + n - 1 : current_row - 1;
    }
    printWithColor(to_string(i), "blue", current_col * cell, current_row);
    sleepFor(1);
  }
}
