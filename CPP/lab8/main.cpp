#include "stack.h"
int main()
{
  Stack s(10);
  s.push('a');
  s.push(13);
  cout << s.top() << endl;
  cout << s.pop() << "poped" << endl;
  cout << s.top() << "toped" << endl;
  cout << s.pop() << "poped" << endl;
  cout << s.pop() << "poped" << endl;
  cout << s.empty();
}