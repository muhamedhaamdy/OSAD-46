#ifndef STACK
#define STACK
#include <iostream>
using namespace std;

class Stack
{
  int len;
  int *stack = new int[len];
  int tos;

public:
  Stack(int len);
  int push(int data);
  int pop();
  int top();
  bool empty();
  int size();
  void dispaly();
};

#endif