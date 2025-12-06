#ifndef RECT_H
#define RECT_H

#include "geoshape.h"

class Rect : public GeoShape
{
public:
  Rect(float x, float y) : GeoShape(x, y) {}

  float calculateArea()
  {
    return dim1 * dim2;
  }
};

#endif