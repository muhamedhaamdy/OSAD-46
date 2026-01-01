#include <iostream>

// DANGEROUS FUNCTION
// 1. 'x' is created on the stack when bad() is called.
// 2. We return a reference (memory address) to 'x'.
// 3. bad() finishes, so 'x' is POPPED from the stack and destroyed.
// 4. The returned reference now points to invalid memory (garbage).
int& bad() {
    int x = 42;
    return x; // Compiler warning: reference to local variable returned
}

// SAFE FUNCTION (in this usage)
// We return a reference to 'a' or 'b', which were passed in.
// As long as the arguments exist, the return value exists.
int& safe_max(int& a, int& b) {
    return (a > b) ? a : b;
}

int main() {
    // SCENARIO 1: The Crash (or Garbage)
    std::cout << "Calling bad()..." << std::endl;
    int& ref = bad(); 
    // Accessing 'ref' is Undefined Behavior. It might print 42, 
    // it might print 0, or it might Crash (Segmentation Fault).
    std::cout << "Value from bad(): " << ref << std::endl; 
    
    // SCENARIO 2: Safe Usage
    int var1 = 10;
    int var2 = 20;
    int& maxRef = safe_max(var1, var2);
    std::cout << "Max value: " << maxRef << std::endl;
    
    return 0;
}
