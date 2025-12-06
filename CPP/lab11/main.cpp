#include "template_stack.h"
#include <typeinfo>
#include <string.h>

int main()
{
  Template_Stack<int> st_int;
  Template_Stack<float> st_float;
  Template_Stack<string> st_str;
  st_int.push(1);
  st_int.push(5);
  st_int.push(2);

  st_float.push(1);
  st_float.push(4.5);

  cout << st_str.pop();
  st_str.push("hello world");
  st_str.push("mohamed ahmed hamdy");
  // st_str.push(1234);

  // cout << st_int.pop() << endl;
  // cout << st_int.top() << endl;

  // cout << "float stack\n";
  // cout << st_float.top() << endl;
  // st_float.pop();
  // cout << st_float.top() << ' ' << typeid(st_float.top()).name() << endl;

  // cout << st_str.top() << endl;
  // st_str.pop();
  // cout << st_str.top() << endl;
}