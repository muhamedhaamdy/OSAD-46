#include "string_utils.h"

void to_lower(char str[])
{
  int i = 0;
  for (; str[i] != '\0'; i++)
  {
    if (str[i] >= 'A' && str[i] <= 'Z')
      str[i] += 32;
  }
}