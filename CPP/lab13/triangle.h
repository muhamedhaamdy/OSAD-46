#ifndef TRIANGLE_H
#define TRIANGLE_H

#include "geoshape.h"

class Triangle : public GeoShape
{
public:
  Triangle(float b, float h) : GeoShape(b, h) {}

  float calculateArea()
  {
    return 0.5 * dim1 * dim2;
  }
};

#endif