#include "template_stack.h"

int main()
{
  Template_Stack<int> st;
  st.push(1);
  st.push(5);
  st.push(2);
  cout << st.pop() << endl;
  cout << st.top() << endl;
}