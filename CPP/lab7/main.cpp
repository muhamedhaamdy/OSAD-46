#include "complex.h"

int main()
{
  Complex c1(10, 2);
  Complex c2;
  c2 = c1;
  cout << "c2: " << c2.get_real() << " + " << c2.get_img() << "i" << endl;

  c2 /= c1;
  cout << "c1: " << c1.get_real() << " + " << c1.get_img() << "i" << endl;
  cout << "c2: " << c2.get_real() << " + " << c2.get_img() << "i" << endl;
  Complex c3;
  cin >> c3;
  cout << c3;
  return 0;
}