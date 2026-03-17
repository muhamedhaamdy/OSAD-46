shape = input('input the shape: ')

if shape == 't':
    base = int(input("enter the base: "))
    height = int(input("enter the height: "))
    print(0.5 * base * height)
elif shape == 'r':
    base = int(input("enter the width: "))
    height = int(input("enter the height: "))
    print(base * height)
elif shape == 'c':
    r = int(input('enter the ridus: '))
    print(22/7 * r ** 2)
else:
    print('unspurtted shape')