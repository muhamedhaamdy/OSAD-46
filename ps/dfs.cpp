#include <bits/stdc++.h>

using namespace std;

class Node {
  public:
  int val;
  vector<Node*> neighbors;
  Node () {}
  Node(int data)
  {
    this->val=data;
    // this.neighbors = neighbors;
  }
  void data(int data)
  {
    this->val = data;
  }
};

class Solution {
  public:
  void dfs(Node *n)
  {
    if (!n) return;
    stack<Node*> st;
    st.push(n);

    while(!st.empty())
    {
      Node* curr = st.top();
      st.pop();

      cout << curr->val;

      for (Node* neighbor: curr->neighbors)
        st.push(neighbor);
    }
    cout << '\n';
  }

  void bfs(Node *n)
  {
    if (!n) return;
    queue<Node*> st;
    st.push(n);

    while(!st.empty())
    {
      Node* curr = st.front();
      st.pop();

      cout << curr->val;

      for (Node* neighbor: curr->neighbors)
        st.push(neighbor);
    }
    cout << '\n';
  }
};

int main()
{
  Node* a = new Node();
  Node* b = new Node();
  Node* c = new Node();
  Node* d = new Node();
  Node* e = new Node();
  Node* f = new Node();

  a->data(1);
  a->neighbors.push_back(f);
  a->neighbors.push_back(d);
  b->data(2);
  // b->neighbors.push_back(c);
  c->data(3);
  // c->neighbors.push_back(d);
  d->data(4);
  d->neighbors.push_back(e);
  e->data(5);
  e->neighbors.push_back(b);
  f->data(6);
  f->neighbors.push_back(c);

  Solution* s = new Solution();
  cout << "DFS : ";
  s->dfs(a);
  cout << "BFS : ";
  s->bfs(a);
}