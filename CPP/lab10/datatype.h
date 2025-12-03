#ifndef DATATYPE_H
#define DATATYPE_H

#include <iostream>
#include <string>
using namespace std;

class DataType
{
public:
  virtual ~DataType() {}
  virtual void print() const = 0;
  virtual const char *type() const = 0;
};

class IntType : public DataType
{
public:
  int value;
  IntType(int v) : value(v) {}
  void print() const override
  {
    cout << value;
  }
  const char *type() const override
  {
    return "int";
  }
};

class FloatType : public DataType
{
public:
  double value;
  FloatType(double v) : value(v) {}
  void print() const override
  {
    cout << value;
  }
  const char *type() const override
  {
    return "float";
  }
};

class StringType : public DataType
{
public:
  std::string value;
  StringType(std::string v) : value(v) {}
  void print() const override
  {
    cout << value;
  }
  const char *type() const override
  {
    return "string";
  }
};
//
inline ostream &operator<<(ostream &os, const DataType *dt)
{
  if (dt)
  {
    dt->print();
  }
  else
  {
    os << "NULL";
  }
  return os;
}

#endif