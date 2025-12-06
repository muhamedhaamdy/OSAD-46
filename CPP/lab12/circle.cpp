#include "circle.h"

#include <stdexcept>
#include <iostream>

using namespace std;

Circle::Circle()
{
  throw std::runtime_error("too few arguments");
}
Circle::Circle(float r, float x, float y)
{
  this->r = r;
  this->x = x;
  this->y = y;
}
Circle::Circle(float r)
{
  this->r = r;
  x = 50.0;
  y = 50.0;
}

Circle::~Circle()
{
  cout << "circle has died" << endl;
}