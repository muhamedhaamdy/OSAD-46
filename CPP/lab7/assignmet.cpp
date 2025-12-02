#include "complex.h"
Complex &Complex::operator=(const int rhs)
{
  this->real = rhs;
  this->img = rhs;
  return *this;
}

Complex &Complex::operator+=(const int rhs)
{
  this->real += rhs;
  this->img += rhs;
  return *this;
}

Complex &Complex::operator+=(const Complex &rhs)
{
  this->real += rhs.real;
  this->img += rhs.img;
  return *this;
}

Complex &Complex::operator-=(const int rhs)
{
  this->real -= rhs;
  this->img -= rhs;
  return *this;
}

Complex &Complex::operator-=(const Complex &rhs)
{
  this->real -= rhs.real;
  this->img -= rhs.img;
  return *this;
}

Complex &Complex::operator*=(const Complex &rhs)
{
  double oldReal = real;
  real = (oldReal * rhs.real) - (img * rhs.img);
  img = (oldReal * rhs.img) + (img * rhs.real);

  return *this;
}

Complex &Complex::operator*=(const int rhs)
{
  real = real * rhs;
  img = img * rhs;
  return *this;
}

Complex &Complex::operator/=(const Complex &rhs)
{
  double denominator = (rhs.real * rhs.real) + (rhs.img * rhs.img);

  if (denominator == 0)
  {
    return *this;
  }

  double oldReal = real;

  real = ((oldReal * rhs.real) + (img * rhs.img)) / denominator;

  img = ((img * rhs.real) - (oldReal * rhs.img)) / denominator;

  return *this;
}

Complex &Complex::operator/=(const int rhs)
{
  if (rhs != 0)
  {
    real = real / rhs;
    img = img / rhs;
  }
  return *this;
}
