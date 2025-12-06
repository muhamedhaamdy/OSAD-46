#include "rectangle.h"

Rectangle::Rectangle()
{
  throw std::runtime_error("too few arguments");
}
Rectangle::Rectangle(float w, float h, float x, float y)
{
  this->w = w;
  this->h = h;
  this->x = x;
  this->y = y;
}
Rectangle::Rectangle(float w, float h)
{
  this->w = w;
  this->h = h;
  x = 50.0;
  y = 50.0;
}

Rectangle::~Rectangle()
{
  cout << "Rectangle has died" << endl;
}