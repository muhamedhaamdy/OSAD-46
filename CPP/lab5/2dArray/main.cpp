#include "arr.h"

int main()
{
  int **arr = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};

  print2D(arr, sizeof(arr), sizeof(arr[0]));
}