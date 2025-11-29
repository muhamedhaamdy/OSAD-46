#ifndef SWAP
#define SWAP

#include <cstddef>
void swapXOR(int &a, int &b);
void swapArithmetic1(int &a, int &b);
void swapArithmetic2(int &a, int &b);
void swapGeneric(void *a, void *b, size_t size);
#endif