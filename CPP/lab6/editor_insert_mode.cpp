#include "editor.h"
#include "screen_utils.h"
#include "helper_function.h"
void display_buffer(char *buffer, int len)
{
  int x = 1, y = 1;

  for (int i = 0; i < len; i++)
  {
    if (buffer[i] == '\n')
    {
      y++;
      x = 1;
      continue;
    }

    gotoXY(x, y);
    cout << buffer[i];

    x++;
  }
}

void insert_mode(char *buffer, int &len, int *line_start)
{
  int row_cursor = 0, col_cursor = 0;
  int num_lines = 1;

  // Helper: Get buffer position from row/col cursor
  auto cursor_to_buffer_pos = [&]() -> int
  {
    return line_start[row_cursor] + col_cursor;
  };

  // Helper: Get line length
  auto get_line_length = [&](int line) -> int
  {
    if (line >= num_lines)
      return 0;
    int start = line_start[line];
    int end = (line + 1 < num_lines) ? line_start[line + 1] - 1 : len;
    return end - start;
  };

  clearScreen();

  while (true)
  {
    Key k = getKey();

    if (k == ESC_KEY)
      return;

    if (k == LEFT)
    {
      if (col_cursor > 0)
      {
        col_cursor--;
      }
      else if (row_cursor > 0)
      {
        row_cursor--;
        col_cursor = get_line_length(row_cursor);
      }
      gotoXY(col_cursor + 1, row_cursor + 1);
      continue;
    }

    if (k == RIGHT)
    {
      int current_line_len = get_line_length(row_cursor);
      if (col_cursor < current_line_len)
      {
        col_cursor++;
      }
      else if (row_cursor < num_lines - 1)
      {
        row_cursor++;
        col_cursor = 0;
      }
      gotoXY(col_cursor + 1, row_cursor + 1);
      continue;
    }

    if (k == UP)
    {
      if (row_cursor > 0)
      {
        row_cursor--;
        int new_line_len = get_line_length(row_cursor);
        if (col_cursor > new_line_len)
          col_cursor = new_line_len;
      }
      gotoXY(col_cursor + 1, row_cursor + 1);
      continue;
    }

    if (k == DOWN)
    {
      if (row_cursor < num_lines - 1)
      {
        row_cursor++;
        int new_line_len = get_line_length(row_cursor);
        if (col_cursor > new_line_len)
          col_cursor = new_line_len;
      }
      gotoXY(col_cursor + 1, row_cursor + 1);
      continue;
    }

    if (k == ENTER_KEY)
    {
      // Insert newline at cursor position
      int pos = cursor_to_buffer_pos();

      // Shift everything after cursor position one spot right
      for (int i = len; i > pos; i--)
      {
        buffer[i] = buffer[i - 1];
      }

      buffer[pos] = '\n';
      len++;

      // Update line_start array for all lines after this one
      for (int i = row_cursor + 1; i < num_lines; i++)
      {
        line_start[i]++;
      }

      row_cursor++;
      col_cursor = 0;
      line_start[row_cursor] = pos + 1;
      num_lines++;

      clearScreen();
      display_buffer(buffer, len);
      gotoXY(col_cursor + 1, row_cursor + 1);
      continue;
    }

    if (k == BACKSPACE_KEY)
    {
      if (len > 0)
      {
        int pos = cursor_to_buffer_pos();

        if (pos > 0)
        {
          // Shift everything left to delete character before cursor
          for (int i = pos - 1; i < len - 1; i++)
          {
            buffer[i] = buffer[i + 1];
          }
          len--;

          // Check if we deleted a newline
          if (col_cursor == 0 && row_cursor > 0)
          {
            // Merge with previous line
            row_cursor--;
            col_cursor = get_line_length(row_cursor);

            // Update line_start array
            for (int i = row_cursor + 1; i < num_lines - 1; i++)
            {
              line_start[i] = line_start[i + 1] - 1;
            }
            num_lines--;
          }
          else if (col_cursor > 0)
          {
            col_cursor--;

            // Update line_start for lines after this
            for (int i = row_cursor + 1; i < num_lines; i++)
            {
              line_start[i]--;
            }
          }

          clearScreen();
          display_buffer(buffer, len);
          gotoXY(col_cursor + 1, row_cursor + 1);
        }
      }
      continue;
    }

    if (k == CHAR_KEY)
    {
      // Get actual buffer position from cursor
      int pos = cursor_to_buffer_pos();

      // Shift everything after this position one spot to the right
      for (int i = len; i > pos; i--)
      {
        buffer[i] = buffer[i - 1];
      }

      // Insert the character at the cursor position
      buffer[pos] = lastChar;
      len++;
      col_cursor++;

      // Update line_start for all lines after current line
      for (int i = row_cursor + 1; i < num_lines; i++)
      {
        line_start[i]++;
      }

      // Redraw to show the inserted character
      clearScreen();
      display_buffer(buffer, len);
      gotoXY(col_cursor + 1, row_cursor + 1);
    }
  }
}