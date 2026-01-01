/*
// Definition for a Node.
class Node {
public:
    int val;
    vector<Node*> neighbors;
    Node() {
        val = 0;
        neighbors = vector<Node*>();
    }
    Node(int _val) {
        val = _val;
        neighbors = vector<Node*>();
    }
    Node(int _val, vector<Node*> _neighbors) {
        val = _val;
        neighbors = _neighbors;
    }
};
*/

class Solution {
public:
    Node* cloneGraph(Node* node) {
        if (!node) return null;
        stack<Node *> st;
        Node* sol = new Node(node->data);
        vector<bool> visited (100);
        st.push(node);
        while (!st.empty())
        {
            Node* curr = st.top();
            Node* tmp = new Node(curr-> val);
            visited[curr->val] = true;
            st.pop;
            for (Node* neighbor: node->neighbors)
            {
                if (visited[neighbor->val]) continue;
                Node* n = new Node(neighbor->val);
                tmp->neighbors.push_back(n);
                st.push(neighbor);
            }
        }
        return sol;
  };
}