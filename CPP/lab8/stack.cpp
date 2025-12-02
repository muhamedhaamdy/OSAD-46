#include "stack.h"

Stack::Stack(int len = 10)
{
  this->len = len;
  this->tos = -1;
  this->stack = new int[len];
}

int Stack::push(int data)
{
  if (tos == len - 1)
  {
    cout << "stack is full";
    return -1;
  }
  this->tos++;
  this->stack[this->tos] = data;
  return data;
}

int Stack::pop()
{
  int top = 0;
  if (tos == -1)
  {
    cout << "stack is already empty";
    return -1;
  }
  top = this->stack[this->tos];
  this->tos--;
  return top;
}

int Stack::top()
{
  if (tos == -1)
  {
    cout << "stack is already empty";
    return -1;
  }
  return this->stack[this->tos];
}

bool Stack::empty()
{
  if (tos == -1)
    return 1;
  return 0;
}

int Stack::size()
{
  return this->tos;
}

void Stack::dispaly()
{
  if (tos == -1)
  {
    cout << "stack is already empty";
    return;
  }
  for (int i = tos; i >= 0; i--)
    cout << '[' << this->stack[i] << ']' << endl;
}
