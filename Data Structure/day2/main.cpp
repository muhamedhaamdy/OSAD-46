#include <iostream>

#include "myQueue.h"
using namespace std;

int main()
{
    myQueue q;

    q.push(1);
    q.push(5);
    q.push(6);

    cout << q.front() << endl;

    int n = q.pop();
    
    cout << n << endl;
    cout << q.front() << endl;
    cout << q.pop() << endl;
    cout << q.front() << endl;
        cout << q.pop() << endl;
        cout << q.pop() << endl;
        cout << q.pop() << endl;

}