  #include "bst.h"


  // Define the spacing distance (10 spaces looks good)
#define GLOBAL_SPACE 10 

void BST::printTreeHelper(Node *curr, int space)
{
    // Base case
    if (curr == NULL)
        return;

    // 1. Increase distance between levels
    space += GLOBAL_SPACE;

    // 2. Process RIGHT child first (so it appears at the top)
    printTreeHelper(curr->right, space);

    // 3. Print current node after space
    cout << endl; // Start a new line
    for (int i = GLOBAL_SPACE; i < space; i++)
        cout << " "; // Print empty spaces
    
    cout << curr->data << "\n"; // Print the node data

    // 4. Process LEFT child
    printTreeHelper(curr->left, space);
}

void BST::printTree()
{
   printTreeHelper(root, 0);
}

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

  BST::BST()
  {
    root = NULL;
  }

  void BST::addHelper(int data, Node*& curr)
  {
    if (curr == NULL)
    {
      curr = new Node(data);
      return;
    }
    if (data > curr->data)
      addHelper(data, curr->right);
    if (data < curr->data)
      addHelper(data, curr->left);
  }

  void BST::add(int data)
  {
    addHelper(data, root);
    // Node *node = new Node(data);
    // if (root = NULL)
    // {
    //   root = node;
    //   return;
    // }
    // // Node *curr = root;
    // if (root->data > data && root->left == NULL)
    //   root->left = node;
    // if (root->data < data && root->right == NULL)
    //   root->right = node;
    // if (root->data > data)
    // {
    //   delete node;
    //   add(data, root->left);
    // }
    // if (root->data < data && root->right == NULL)
    // {
    //   delete node;
    //   add(data, root->right);
    // }
  }

  void BST::displayHelper(Node* curr)
  {
    if (curr == NULL)
      return;
    cout << curr->data << ' ';
    displayHelper(curr->left);
    displayHelper(curr->right);
  }


  void BST::displayBFS()
  {
    displayHelper(root);
    // if (root == NULL)
    //   return;
    // cout << root->data << endl;
    // displayBFS(root->left);
    // displayBFS(root->right);
  }