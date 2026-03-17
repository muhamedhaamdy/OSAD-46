n = 6

x = n - 1

for i in range(n):
    for j in range(n):
        if j < x:
            print(' ', end='')
        else:
            print('*', end='')
    x -= 1
    print()
