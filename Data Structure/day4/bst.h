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
    void displayHelper(Node *curr);
    void addHelper(int data, Node*& curr);
    public:
    BST();
    void printTreeHelper(Node* curr, int space);
    void printTree();
    void add(int data);
    void displayBFS();
};

#endif