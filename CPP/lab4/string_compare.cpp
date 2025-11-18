#include "string_utils.h"

int strcmp(char str1[], char str2[])
{
  int len1 = strlen(str1), len2 = strlen(str2);
  int i = 0;
  if (len1 > len2)
    return -1;
  else if (len1 < len2)
    return 1;
  for (; i < len1; i++)
  {
    if (str1[i] != str2[i])
      return -1;
  }
  return 0;
}