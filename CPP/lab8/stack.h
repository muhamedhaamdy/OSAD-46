#ifndef STACK
#define STACK
#include <iostream>
using namespace std;

class Stack
{
  int len;
  int *stack;
  int tos;

public:
  Stack(int len = 10);
  ~Stack();
  int push(int data);
  int pop();
  int top();
  bool empty();
  int size();
  void display();
};

#endif