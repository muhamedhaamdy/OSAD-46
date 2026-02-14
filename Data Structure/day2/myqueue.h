#ifndef MYQUEUE_H
#define MYQUEUE_H

#include "../day1/linkedlist.h"


class myQueue {
    Linkedlist lst;

    public:
    myQueue();
    void push(int num);
    int pop();
    int front();
    int back();
    void display();
    bool empty();
    int size();
};

#endif