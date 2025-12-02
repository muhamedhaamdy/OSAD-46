#include "complex.h"

int Complex::get_real()
{
  return this->real;
}
int Complex::get_img()
{
  return this->img;
}
void Complex::set_real(int real)
{
  if (typeid(real).name != 'i')
  {
    cout << "error";
    return;
  }
  this->real = real;
}
void Complex::set_img(int img)
{
  if (typeid(img).name != 'i')
  {
    cout << "error";
    return;
  }
  this->img = img;
}