#ifndef SQUARE_H
#define SQUARE_H

#include "rectangle.h"

class Square : private Rect
{
public:
  Square(float x) : Rect(x, x) {}

  void setSquareDim(float x) { dim1 = dim2 = x; }
  float getSquareDim() { return dim1; }

  float calculateArea()
  {
    return Rect::calculateArea();
  }
};

#endif