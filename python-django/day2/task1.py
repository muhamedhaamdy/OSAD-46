str = 'Mobile'

vowels = 'aeiou'
new = ''

for ch in str:
    if ch in vowels:
        continue
    new += ch

print(new)