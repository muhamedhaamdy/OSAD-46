#include "string_utils.h"

int strcpy(char str1[], char str2[], int size)
{
  int len2 = strlen(str2), i = 0;
  if (size < len2)
    return -1;
  for (; i < len2; i++)
  {
    str1[i] = str2[i];
  }
  str1[i] = '\0';
  return 1;
}