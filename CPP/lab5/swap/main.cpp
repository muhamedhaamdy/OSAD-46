#include "swap.h"
#include <iostream>

using namespace std;

int main()
{
  int x, y;

  x = 10;
  y = 20;
  cout << "Before XOR Swap: x=" << x << ", y=" << y << endl;
  swapXOR(x, y);
  cout << "After XOR Swap : x=" << x << ", y=" << y << endl
       << endl;

  x = 15;
  y = 25;
  cout << "Before Arithmetic1 Swap (+/-): x=" << x << ", y=" << y << endl;
  swapArithmetic1(x, y);
  cout << "After Arithmetic1 Swap  (+/-): x=" << x << ", y=" << y << endl
       << endl;

  x = 3;
  y = 6;
  cout << "Before Arithmetic2 Swap (*//): x=" << x << ", y=" << y << endl;
  swapArithmetic2(x, y);
  cout << "After Arithmetic2 Swap  (*//): x=" << x << ", y=" << y << endl
       << endl;

  int a = 100, b = 200;
  cout << "Before Generic Swap: a=" << a << ", b=" << b << endl;
  swapGeneric(&a, &b, sizeof(int));
  cout << "After Generic Swap : a=" << a << ", b=" << b << endl
       << endl;

  double d1 = 1.5, d2 = 3.7;
  cout << "Before Generic Swap (double): d1=" << d1 << ", d2=" << d2 << endl;
  swapGeneric(&d1, &d2, sizeof(double));
  cout << "After Generic Swap  (double): d1=" << d1 << ", d2=" << d2 << endl
       << endl;

  return 0;
}
