#ifndef SHAPES_H
#define SHAPES_H

#include <iostream>
#include "circle.h"
#include "rectangle.h"
using namespace std;

class Shape
{
  Circle *c;
  Rectangle *r;

public:
  Shape(float c_ridus, float c_x, float c_y, float r_width, float r_height, float r_x, float r_y);
  Shape(float c_ridus, float r_width, float r_height);
  ~Shape();

  void run();
};

#endif