#ifndef HELPER_FUNCTION
#define HELPER_FUNCTION
char *trim_leading_spaces(char *str);
char *substring(char *str, int start, int length);
bool str_equals(char *s1, const char *s2);
int str_length(char *str);
bool starts_with(char *str, const char *prefix);
#endif