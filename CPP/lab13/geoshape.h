#ifndef GEOSHAPE_H
#define GEOSHAPE_H

class GeoShape
{
protected:
  float dim1;
  float dim2;

public:
  GeoShape() { dim1 = dim2 = 0; }
  GeoShape(float x) { dim1 = dim2 = x; }
  GeoShape(float x, float y)
  {
    dim1 = x;
    dim2 = y;
  }

  void setDim1(float x) { dim1 = x; }
  void setDim2(float x) { dim2 = x; }
  float getDim1() { return dim1; }
  float getDim2() { return dim2; }

  // Virtual is better, but following your image structure strictly:
  float calculateArea() { return 0; }
};

#endif