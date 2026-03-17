str = "This is javaScript"
i = 0
letter = 'i'

lst = []

for ch in str:
    if ch == letter:
        lst.append(i)
    i += 1

print(lst)