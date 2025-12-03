#ifndef TEMPLATE_STACK
#define TEMPLATE_STACK

#define CAPACITY 1024
#include <iostream>

using namespace std;

template <class T>
class Template_Stack
{
  int capacity;
  int tos;
  T *stack;

public:
  Template_Stack();
  ~Template_Stack();

  void push(T data);
  T top();
  T pop();
};

template <class T>
Template_Stack<T>::Template_Stack()
{
  this->capacity = CAPACITY;
  this->tos = -1;
  this->stack = (T *)malloc(this->capacity);
}

template <class T>
Template_Stack<T>::~Template_Stack()
{
  free(this->stack);
}

template <class T>
void Template_Stack<T>::push(T data)
{
  if (tos == CAPACITY)
  {
    realloc(this->stack, this->capacity * 2);
  }
  this->tos++;
  this->stack[this->tos] = data;
}

template <class T>
T Template_Stack<T>::pop()
{
  if (tos == -1)
  {
    cout << "the stack already empty";
    return -1;
  }
  T curr = this->stack[this->tos];
  this->tos--;
  return curr;
}

template <class T>
T Template_Stack<T>::top()
{
  if (tos == -1)
  {
    cout << "the stack already empty";
    return -1;
  }
  return this->stack[this->tos];
}

#endif