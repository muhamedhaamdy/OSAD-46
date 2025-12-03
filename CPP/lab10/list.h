#ifndef LIST_H
#define LIST_H

#include <iostream>
#include <string>
#include "datatype.h"

using namespace std;

class List
{
  DataType **items;
  int capacity;
  int count;

  DataType *createObject(int v)
  {
    return new IntType(v);
  }

  DataType *createObject(double v)
  {
    return new FloatType(v);
  }

  DataType *createObject(const char *v)
  {
    return new StringType(string(v));
  }

  DataType *createObject(const string &v)
  {
    return new StringType(v);
  }

public:
  List(int n);
  ~List();

  template <typename T>
  void append(const T &value)
  {
    if (count < capacity)
    {
      items[count] = createObject(value);
      count++;
    }
    else
    {
      cout << "List is full!" << endl;
    }
  }
  DataType *operator[](int index) const;
  void print() const;
};

#endif