#ifndef CIRCLE_H
#define CIRCLE_H

class Circle
{
public:
  float x;
  float y;
  float r;

  Circle();
  Circle(float r, float x, float y);
  Circle(float r);
  ~Circle();

  // void display();
};

#endif