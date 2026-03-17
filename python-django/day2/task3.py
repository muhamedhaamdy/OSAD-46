n = 3

lst = []

for i in range(1, 5):
    mul = []
    for j in range(1, i+1):
        mul.append(i * j)
    lst.append(mul)

print(lst)