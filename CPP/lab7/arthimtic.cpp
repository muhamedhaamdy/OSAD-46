#include "complex.h"

int Complex::abs()
{
  return (this->real * this->real + this->img * this->img);
}

Complex Complex::operator+(const Complex &rhs) const
{
  return Complex(this->real + rhs.real, this->img + rhs.img);
}
Complex Complex::operator+(const int &rhs) const
{
  return Complex(this->real + rhs, this->img + rhs);
}

Complex Complex::operator-(const Complex &rhs) const
{
  return Complex(this->real - rhs.real, this->img - rhs.img);
}

Complex Complex::operator-(const int rhs) const
{
  return Complex(this->real - rhs, this->img - rhs);
}

Complex Complex::operator*(const Complex &rhs) const
{
  return Complex(this->real * rhs.real - this->img * rhs.img,
                 this->real * rhs.img + this->img * rhs.real);
}
Complex Complex::operator*(const int &rhs) const
{
  return Complex(this->real * rhs, this->img * rhs);
}

Complex Complex::operator/(const Complex &rhs) const
{
  int denom = rhs.real * rhs.real + rhs.img * rhs.img;
  return Complex((this->real * rhs.real + this->img * rhs.img) / denom,
                 (this->img * rhs.real - this->real * rhs.img) / denom);
}

Complex Complex::operator/(const int &rhs) const
{
  return Complex(this->real / rhs, this->img / rhs);
}