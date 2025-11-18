#include "string_utils.h"

int strconcat(char str1[], char str2[], int size)
{
  int len1 = strlen(str1), len2 = strlen(str2);
  int i = len1, j = 0;
  if (len1 + len2 > size)
    return -1;
  for (; j <= len2; i++, j++)
  {
    str1[i] = str2[j];
  }
  return 0;
}