#include "swap.h"

void swapXOR(int &a, int &b)
{
  if (&a == &b)
    return;
  a ^= b;
  b ^= a;
  a ^= b;
}

void swapArithmetic1(int &a, int &b)
{
  if (&a == &b)
    return;
  a = a + b;
  b = a - b;
  a = a - b;
}

void swapArithmetic2(int &a, int &b)
{
  if (&a == &b)
    return;
  if (b == 0)
    return;

  a = a * b;
  b = a / b;
  a = a / b;
}

void swapGeneric(void *a, void *b, size_t size)
{
  char temp;
  char *p = (char *)a;
  char *q = (char *)b;
  for (size_t i = 0; i < size; i++)
  {
    temp = p[i];
    p[i] = q[i];
    q[i] = temp;
  }
}