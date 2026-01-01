#include <iostream>
using namespace std;

class Base {
public:
    virtual void func(int x = 10) {
        cout << "Base::func called from Base with x = " << x << endl;
    }
};

class Derived : public Base {
public:
    // Override with DIFFERENT default argument
    void func(int x = 20) override {
        cout << "Derived::func called from Derived with x = " << x << endl;
    }
};

int main() {
    // Derived d;
    // Base* bp = &d;
    
    // cout << "Calling via Derived object (d.func()): ";
    // d.func(); // Static type is Derived, uses default 20
    
    // cout << "Calling via Base pointer (bp->func()): ";
    // bp->func(); // Static type is Base, uses default 10, BUT calls Derived::func!
   
    Base* ptr = new Derived();

    // 1. COMPILE-TIME:
    // The compiler asserts: "ptr is a Base*".
    // It looks at Base::func declaration: "void func(int x = 10)".
    // So it essentially rewrites this line to: ptr->func(10);
    //
    // 2. RUN-TIME:
    // The program sees 'func' is virtual.
    // It looks at the actual object 'ptr' points to (which is Derived).
    // It calls Derived::func(10).
    ptr->func(); 
    
    // ptr->func(20);
    return 0;
}
