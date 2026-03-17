names = ['ahmed', 'fatama', 'said', 'mohamed', 'assad']

dict = {}

for name in names:
    if not dict.get(name[0]):
        dict[name[0]] = [name]
    else:
        dict[name[0]].append(name)

print(dict)