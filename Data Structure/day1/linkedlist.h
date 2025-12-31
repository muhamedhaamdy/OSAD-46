#ifndef LINKEDLIST_H
#define LINKEDLIST_H

#include <iostream>

using namespace std;

class Node
{
public:
  int data;
  Node *next;
  Node *prev;
  Node();
  Node(int data);
};

class Linkedlist
{
  Node *getNode(int data);
  void deleteNode(Node *node);

public:
  Node *head;
  Node *tail;
  Linkedlist();
  void append(int data);
  void displayFront();
  void displayBack();
  void deleteNode(int data);
  void deleteAllNodes(int data);
  void insertAfter(int data, int after);
  void insertBefore(int data, int after);
  int length();
  int getDataInedx(int indx);
  void truncate();
};

#endif