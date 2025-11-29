#include "helper_function.h"
#include "screen_utils.h"
char *trim_leading_spaces(char *str)
{
  while (*str == ' ')
    str++;
  return str;
}

// Helper function: copy substring
char *substring(char *str, int start, int length)
{
  char *result = (char *)malloc((length + 1) * sizeof(char));
  if (!result)
    return NULL;

  for (int i = 0; i < length; i++)
  {
    result[i] = str[start + i];
  }
  result[length] = '\0';
  return result;
}

// Helper function: compare strings
bool str_equals(char *s1, const char *s2)
{
  int i = 0;
  while (s1[i] != '\0' && s2[i] != '\0')
  {
    if (s1[i] != s2[i])
      return false;
    i++;
  }
  return s1[i] == '\0' && s2[i] == '\0';
}

// Helper function: string length
int str_length(char *str)
{
  int len = 0;
  while (str[len] != '\0')
    len++;
  return len;
}

// Helper function: starts with
bool starts_with(char *str, const char *prefix)
{
  int i = 0;
  while (prefix[i] != '\0')
  {
    if (str[i] != prefix[i])
      return false;
    i++;
  }
  return true;
}
