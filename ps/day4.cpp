#include <bits/stdc++.h>

using namespace std;

// class Car {
//   public:
//   void add(int x, int y = 5);
// };

// // void fun(int a = 10);

// int main()
// {
//   Car* c = new Car();
//   c->add(1);
// }

// void Car::add(int x, int y = 4)
// {
//   cout << x + y;
// }
void swap(int &x, int &y)
{
  int tmp = x;
  x = y;  
  y = tmp;
}

int &maxInt(const int &&a, int &b)
{
  return (a>b)? a:b;
}

int main() {
  int x =5;
  int y = 1;
  // swap(5, 7);
  int &mx = maxInt(4,y);
  cout << x << ' ' << y << ' ' << mx;

  // int x = 10;
  // int y = 20;
  // int &ref = x;
  // int &&ref1 = 10;
  
  // cout << &x << endl;
  // cout << &ref << endl;

  // // &ref = y;
  // cout << &x << endl;
  // cout << &ref << endl;
  // x = 60;
  // cout << ref1;
}

