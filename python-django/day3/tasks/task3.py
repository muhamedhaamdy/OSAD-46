grade_file = open('grade.txt')

for line in grade_file:
    if(line.strip().split(',')[1] == 'python'):
        id = line.strip().split(',')[0]
        grade = line.strip().split(',')[2]
        print(f'python grade for student {id} is {grade}')
