#ifndef COMPLEX
#define COMPLEX

#include <iostream>

using namespace std;

class Complex
{
  int real;
  int img;

public:
  Complex(int real = 0, int img = 0);
  int get_real();
  int get_img();
  int abs();
  void set_real(int real);
  void set_img(int img);
  void add(Complex c);
  Complex operator+(const Complex &rhs) const;
  Complex operator+(const int &rhs) const;
  Complex operator-(const Complex &rsh) const;
  Complex operator-(const int rsh) const;
  Complex operator*(const Complex &rhs) const;
  Complex operator*(const int &rhs) const;
  Complex operator/(const Complex &rhs) const;
  Complex operator/(const int &rhs) const;
  Complex &operator=(const int rhs);
  Complex &operator+=(const Complex &rhs);
  Complex &operator+=(const int rhs);
  Complex &operator-=(const Complex &rhs);
  Complex &operator-=(const int rhs);
  Complex &operator*=(const Complex &rhs);
  Complex &operator*=(const int rhs);
  Complex &operator/=(const Complex &rhs);
  Complex &operator/=(const int rhs);
  int &operator[](const int indx);
  Complex &operator++();
  Complex operator++(int);
  Complex &operator--();
  Complex operator--(int);
  bool operator==(const Complex &rhs) const;
  bool operator!=(const Complex &rhs) const;

  friend ostream &operator<<(ostream &out, const Complex &c);
  friend istream &operator>>(istream &in, Complex &c);
};

#endif