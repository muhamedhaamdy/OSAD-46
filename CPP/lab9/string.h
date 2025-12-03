#ifndef STRING
#define STRING

#define DEFAUL_CAPACITY 1024

#include <iostream>
using namespace std;

class String
{
  char *buffer;
  int len;
  int capacity;

  void ensure_capacity(int min_capacity); // helper

public:
  // Constructors
  String();
  String(const char *str);
  String(const String &other);

  // Destructor
  ~String();

  // Assignment
  String &operator=(const String &other);

  // Member function
  int strlen() { return len; }

  // Indexing
  char &operator[](int index);
  const char &operator[](int index) const;

  // Concatenation
  String operator+(const String &other) const;
  String &operator+=(const String &other);
  String &operator+=(const char *cstr);

  // Comparison
  bool operator==(const String &other) const;
  bool operator!=(const String &other) const;
  // bool operator<(const String &other) const;
  // bool operator>(const String &other) const;

  // Output
  friend ostream &operator<<(ostream &out, const String &str);
  // Input
  friend istream &operator>>(istream &in, String &str);
};

#endif
