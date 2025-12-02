#include "complex.h"

Complex::Complex(int real, int img)
{
  this->real = real;
  this->img = img;
}

void Complex::add(Complex c)
{
  this->real += c.get_real();
  this->img += c.get_img();
}

bool Complex::operator==(const Complex &rhs) const
{
  return (this->real == rhs.real && this->img == rhs.img);
}
bool Complex::operator!=(const Complex &rhs) const
{
  return !(*this == rhs);
}

ostream &operator<<(ostream &out, const Complex &c)
{
  out << c.real;

  if (c.img > 0)
    out << " + j";
  else if (c.img < 0)
    out << " - j";
  else
    out << " - ";
  out << c.img;
  return out;
}

istream &operator>>(istream &in, Complex &c)
{
  in >> c.real >> c.img;
  return in;
}