#include <iostream>
#include "geoshape.h"
#include "rectangle.h"
#include "square.h"
#include "circle.h"
#include "triangle.h"

using namespace std;

int main()
{
    Triangle t(20, 10);
    cout << "Triangle Area: " << t.calculateArea() << endl;

    Rect r(10, 20);
    cout << "Rectangle Area: " << r.calculateArea() << endl;

    Circle c(7);
    cout << "Circle Area:   " << c.calculateArea() << endl;

    Square s(10);
    cout << "Square Area:   " << s.calculateArea() << endl;

    return 0;
}