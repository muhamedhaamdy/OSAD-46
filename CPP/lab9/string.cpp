#include "string.h"
#include <cstdlib>
#include <cstring>
#include <iostream>

// Helper to grow buffer if needed
void String::ensure_capacity(int min_capacity)
{
  if (capacity >= min_capacity)
    return;

  while (capacity < min_capacity)
    capacity *= 2;

  char *newBuffer = (char *)realloc(buffer, capacity);
  if (!newBuffer)
  {
    free(buffer);
    throw std::bad_alloc();
  }
  buffer = newBuffer;
}

// Constructors
String::String()
{
  capacity = DEFAUL_CAPACITY;
  len = 0;
  buffer = (char *)malloc(capacity);
  if (!buffer)
    throw std::bad_alloc();
  buffer[0] = '\0';
}

String::String(const char *str)
{
  len = std::strlen(str);
  capacity = len + 1;
  buffer = (char *)malloc(capacity);
  if (!buffer)
    throw std::bad_alloc();
  memcpy(buffer, str, len + 1);
}

String::String(const String &other)
{
  len = other.len;
  capacity = other.capacity;
  buffer = (char *)malloc(capacity);
  if (!buffer)
    throw std::bad_alloc();
  memcpy(buffer, other.buffer, len + 1);
}

// Destructor
String::~String()
{
  free(buffer);
}

// Assignment
String &String::operator=(const String &other)
{
  if (this == &other)
    return *this;

  free(buffer);
  len = other.len;
  capacity = other.capacity;
  buffer = (char *)malloc(capacity);
  if (!buffer)
    throw std::bad_alloc();
  memcpy(buffer, other.buffer, len + 1);
  return *this;
}

// Indexing
char &String::operator[](int index)
{
  if (index < 0 || index >= len)
    throw std::out_of_range("Index out of range");
  return buffer[index];
}

const char &String::operator[](int index) const
{
  if (index < 0 || index >= len)
    throw std::out_of_range("Index out of range");
  return buffer[index];
}

// Concatenation
String String::operator+(const String &other) const
{
  String result;
  result.len = len + other.len;
  result.capacity = result.len + 1;
  result.buffer = (char *)malloc(result.capacity);
  memcpy(result.buffer, buffer, len);
  memcpy(result.buffer + len, other.buffer, other.len + 1);
  return result;
}

String &String::operator+=(const String &other)
{
  ensure_capacity(len + other.len + 1);
  memcpy(buffer + len, other.buffer, other.len + 1);
  len += other.len;
  return *this;
}

String &String::operator+=(const char *cstr)
{
  int otherLen = std::strlen(cstr);
  ensure_capacity(len + otherLen + 1);
  memcpy(buffer + len, cstr, otherLen + 1);
  len += otherLen;
  return *this;
}

// Comparison
bool String::operator==(const String &other) const
{
  if (len != other.len)
    return false;
  return std::memcmp(buffer, other.buffer, len) == 0;
}

bool String::operator!=(const String &other) const
{
  return !(*this == other);
}

// Output
ostream &operator<<(ostream &out, const String &str)
{
  out << str.buffer;
  return out;
}

// Input
istream &operator>>(istream &in, String &str)
{
  char temp[1024];
  in >> temp;
  str = String(temp);
  return in;
}
