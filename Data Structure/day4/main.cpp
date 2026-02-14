#include "bst.h"

int main() {
    BST *bst = new BST();

    bst->add(4);
    bst->add(2);
    bst->add(6);
    bst->add(10);
    bst->add(1);
    bst->add(3);
    bst->add(5);
    cout << "BFS" << endl;
    // bst->displayBFS();
    // bst->printTree();
}