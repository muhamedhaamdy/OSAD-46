#include "screen_utils.h"
#include "magic_box.h"
using namespace std;
int main()
{
  int n;
  cin >> n;
  if (cin.peek() != '\n' && cin.peek() != EOF)
  {
    cout << "Error: Invalid input format!" << endl;
    return 1;
  }
  if (n % 2 == 0)
  {
    cout << "Error the number suppose to be ODD!" << endl;
    return 1;
  }
  cout << n << endl;
  // I suppose to make the program to throw exception when the number is even :X
  draw_magic_box(n);
  return 0;
}
