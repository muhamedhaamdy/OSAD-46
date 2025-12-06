#ifndef CIRCLE_H
#define CIRCLE_H

#include "geoshape.h"

class Circle : private GeoShape
{
public:
  Circle(float r) : GeoShape(r) {}

  void setRadius(float r) { dim1 = dim2 = r; }
  float getRadius() { return dim1; }

  float calculateArea()
  {
    return 22.0 / 7 * dim1 * dim2;
  }
};

#endif