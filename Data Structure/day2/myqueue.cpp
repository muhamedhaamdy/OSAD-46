#include "myQueue.h"

myQueue::myQueue()
{
    // this->lst = new Linkedlist();
}

void myQueue::push(int num)
{
    lst.append(num);
}

int myQueue::pop()
{
    if (lst.length() == 0)
    {
        cout << "Already empty" << endl;
        return -1;
    }
    int popped = lst.head->data;
    lst.deleteNode(popped);
    return popped;
}

int myQueue::front()
{
    if (lst.length() == 0)
    {
        cout << "Already empty" << endl;
        return -1;
    }
    return lst.head->data;
}

int myQueue::back()
{
    if (lst.length() == 0)
    {
        cout << "Already empty" << endl;
        return -1;
    }
    return lst.tail->data;
}

void myQueue::display()
{
    lst.displayFront();
}

int myQueue::size()
{
    return lst.length();
}

bool myQueue::empty()
{
    if (lst.length() == 0)
    {
        return false;
    }
    return true;
}