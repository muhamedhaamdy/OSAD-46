#include "linkedlist.h"

Node::Node()
{
  next = NULL;
  prev = NULL;
}

Node::Node(int data)
{
  this->data = data;
  next = NULL;
  prev = NULL;
}

Linkedlist::Linkedlist()
{
  head = NULL;
  tail = NULL;
}

void Linkedlist::append(int data)
{
  Node *n = new Node(data);
  if (head == tail && head == NULL)
  {
    head = tail = n;
    return;
  }
  else if (head == tail)
  {
    head->next = n;
    n->prev = head;
    tail = n;
    return;
  }
  Node *t = tail;
  t->next = n;
  n->prev = t;
  tail = n;
}

void Linkedlist::displayFront()
{
  if (!head)
  {
    cout << "it's empty!";
    return;
  }
  Node *curr = head;
  while (curr->next)
  {
    cout << curr->data << ' ';
    curr = curr->next;
  }
  cout << curr->data << '\n';
}

void Linkedlist::displayBack()
{
  if (!tail)
  {
    cout << "it's empty!";
    return;
  }
  Node *curr = tail;
  while (curr->prev)
  {
    cout << curr->data << ' ';
    curr = curr->prev;
  }
  cout << curr->data << '\n';
}

Node *Linkedlist::getNode(int data)
{
  Node *curr = head;
  if (!head)
  {
    return NULL;
  }
  while (curr->next)
  {
    if (curr->data == data)
      return curr;
    curr = curr->next;
  }
  if (curr->data == data)
    return curr;
  return NULL;
}

void Linkedlist::deleteNode(int data)
{
  Node *n = getNode(data);
  if (n == NULL)
    return;
  if (n == head && n == tail)
  {
    head = NULL;
    tail = NULL;
  }
  else if (n == head)
  {
    Node *nxt = n->next;
    nxt->prev = NULL;
    head = nxt;
  }
  else if (n == tail)
  {
    Node *prv = n->prev;
    prv->next = NULL;
    tail = prv;
  }
  else
  {
    Node *nxt = n->next;
    Node *prv = n->prev;
    prv->next = n->next;
    nxt->prev = n->prev;
  }
  delete n;
}

void Linkedlist::deleteNode(Node *n)
{
  if (n == NULL)
    return;
  if (n == head && n == tail)
  {
    head = NULL;
    tail = NULL;
  }
  else if (n == head)
  {
    Node *nxt = n->next;
    nxt->prev = NULL;
    head = nxt;
  }
  else if (n == tail)
  {
    Node *prv = n->prev;
    prv->next = NULL;
    tail = prv;
  }
  else
  {
    Node *nxt = n->next;
    Node *prv = n->prev;
    prv->next = n->next;
    nxt->prev = n->prev;
  }
  delete n;
}

void Linkedlist::deleteAllNodes(int data)
{
  while (getNode(data))
  {
    Node *n = getNode(data);
    deleteNode(n);
  }
}

int Linkedlist::length()
{
  int c = 0;
  Node *curr = head;
  while (curr)
  {
    curr = curr->next;
    c++;
  }
  return c;
}

int Linkedlist::getDataInedx(int index)
{
  int c = 0;
  Node *curr = head;
  while (curr)
  {
    if (c == index)
      return curr->data;
    curr = curr->next;
    c++;
  }
  return -1;
}

void Linkedlist::insertAfter(int data, int indx)
{
  Node *newNode = new Node(data);
  Node *curr = getNode(indx);
  Node *after = curr->next;
  if (!curr)
    return;
  curr->next = newNode;
  newNode->prev = curr;
  newNode->next = after;
}

void Linkedlist::insertBefore(int data, int indx)
{
  Node *newNode = new Node(data);
  Node *curr = getNode(indx);
  Node *before = curr->prev;
  if (!curr)
    return;
  curr->prev = newNode;
  newNode->next = curr;
  newNode->prev = before;
}