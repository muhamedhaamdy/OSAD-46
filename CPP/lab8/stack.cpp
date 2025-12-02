#include "stack.h"
#include <cstring>
Stack::Stack(int len)
{
  this->len = len;
  this->tos = -1;
  this->stack = new int[len];
}

Stack::~Stack()
{
  delete[] stack;
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
  return this->tos + 1;
}

void Stack::display()
{
  if (tos == -1)
  {
    cout << "stack is already empty";
    return;
  }
  for (int i = tos; i >= 0; i--)
    cout << '[' << this->stack[i] << ']' << endl;
}

Stack &Stack::operator=(const Stack &s)
{
  if (this == &s)
    return *this;
  delete[] this->stack;
  this->len = s.len;
  this->tos = s.tos;
  this->stack = new int[this->len];
  memcpy(this->stack, s.stack, this->tos * sizeof(int));
  return *this;
}