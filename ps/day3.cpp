#include <iostream>
#include <cstdint>
#include <climits>
using namespace std;

// int main(){
//   int y = 0;
//   // int *x = &y;
//   cout << *y;
// }

union SuperSettings {
    // Mode 1: Access individual bits (The Struct)
    struct {
        bool isVisible : 1;
        bool hasSound  : 1;
        bool isAdmin   : 1;
    } bits; // We name this internal struct "bits"

    // Mode 2: Access the raw memory (The Byte)
    uint8_t wholeByte; 
};

// int main() {
    // SuperSettings s;
    
    // 1. Clear EVERYTHING in one shot (using the byte view)
    // s.wholeByte = 7; 

    // 2. Set specific options (using the struct view)
    // s.bits.isVisible = false; 
    // s.bits.isAdmin = true;

    // 3. Check the raw value
    // This will print "5" (Binary 101) because 1st and 3rd bits are on!
    // cout << (int)s.bits.isAdmin << std::endl; 
    // cout << (int)s.bits.hasSound << std::endl; 
    // cout << (int)s.bits.isVisible << std::endl; 
// }

int main()
{
  // int mx = INT_MAX;
  // int mn = INT_MIN;

  // unsigned int x = UINT_MAX;
  // unsigned int y = -1;
  // mx++;
  // mn--;
  // cout <<( (mx == INT_MIN) ? "yes" : "not");  
  // cout <<( (mn == INT_MAX) ? "yes" : "not");  
  // cout <<( (x == y)? "yes" : "not");  
  // for (unsigned int i = 5; i >= 0; i--)
  // {
  //   cout << i << endl;
  // }
  unsigned int a = 10;
  int b = -20;
  cout << ((a + b > 0) ? "positive": "negative");
  cout << b + a;
}