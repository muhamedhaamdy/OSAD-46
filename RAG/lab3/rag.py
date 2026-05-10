import pathlib

pathes= list(pathlib.Path('./data').glob('*.pdf'))

print(pathes)