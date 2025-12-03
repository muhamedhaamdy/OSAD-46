#include "list.h"

List::List(int n)
{
  this->capacity = n;
  this->count = 0;
  this->items = new DataType *[n];
}

List::~List()
{
  for (int i = 0; i < count; ++i)
  {
    delete items[i];
  }
  delete[] items;
}

void List::print() const
{
  cout << "[ ";
  for (int i = 0; i < count; ++i)
  {
    cout << "(" << items[i]->type() << ")";
    items[i]->print();
    cout << ' ';
  }
  cout << ']' << endl;
}

DataType *List::operator[](int index) const
{
  if (index < 0 || index >= count)
    throw std::out_of_range("Index out of range");
  return items[index];
}