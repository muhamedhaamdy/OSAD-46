#include "bst.h"

Node::Node()
{
  right = NULL;
  left = NULL;
}

Node::Node(int data)
{
  this->data = data;
  right = NULL;
  left = NULL;
}

void BST::add(int data, Node* root)
{
  Node *node = new Node(data);
  if (root = NULL)
  {
    root = node;
    return;
  }
  // Node *curr = root;
  if (root->data > data && root->left == NULL)
    root->left = node;
  if (root->data < data && root->right == NULL)
    root->right = node;
  if (root->data > data)
  {
    delete node;
    add(data, root->left);
  }
  if (root->data < data && root->right == NULL)
  {
    delete node;
    add(data, root->right);
  }
}

void BST::displayBFS(Node *root)
{
  if (root == NULL)
    return;
  cout << root->data << endl;
  displayBFS(root->left);
  displayBFS(root->right);
}