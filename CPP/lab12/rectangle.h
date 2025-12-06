#ifndef RECTANGLE_H
#define RECTANGLE_H
#include <iostream>
#include <stdexcept>

using namespace std;
class Rectangle
{
public:
  float w;
  float h;
  float x;
  float y;

  Rectangle();
  Rectangle(float w, float h, float x, float y);
  Rectangle(float w, float h);
  ~Rectangle();

  // void display();
};

#endif