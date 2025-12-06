#include "shapes.h"

int main()
{
    float circle_radius = 30;
    float circle_x = 50;
    float circle_y = 100;
    float rect_w = 30;
    float rect_h = 50;
    float rect_x = 500;
    float rect_y = 100;
    Shape s(circle_radius, circle_x, circle_y, rect_w, rect_h, rect_x, rect_y);
    s.run();
    return 0;
}