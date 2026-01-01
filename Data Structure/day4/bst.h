#ifndef BST_H
#define BST_H

#include <iostream>

using namespace std;
class Node
{
public:
  int data;
  Node *right;
  Node *left;
  Node();
  Node(int data);
};

class BST {
    Node *root;
    public:
    void add(int data, Node* root);
    void displayBFS(Node *root);
};

#endif