#include "list.h"
#include "datatype.h"

int main()
{
  List lst(5);

  lst.append(1);
  lst.append("hello");
  lst.append(7.7);

  cout << lst[0];

  return 0;
}