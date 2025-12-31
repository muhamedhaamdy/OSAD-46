#include "linkedlist.h"

int main()
{
  Linkedlist *l = new Linkedlist();
  l->append(1);
  l->append(5);
  l->append(9);
  // l->append(1);
  // l->append(5);
  // l->append(9);
  // l->deleteAllNodes(1);
  // l->deleteAllNodes(5);
  // l->deleteAllNodes(1);
  // l->deleteAllNodes(1);
  // l->deleteNode(9);
  l->insertAfter(7, 10);
  // cout << l->getDataInedx(1);
  // cout << l->length();
  l->displayFront();
}