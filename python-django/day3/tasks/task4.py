from helper import valid_id

student_name = ''
student_subject = ''
student_grade = ''

id = input('enter you id: ')
try:
    student_file = open('students.txt')
    grade_file = open('grade.txt')
except FileNotFoundError as e:
    print(e)


student_list = student_file.read().splitlines()
grade_list = grade_file.read().splitlines()

student_file.close()
grade_file.close()


for student in student_list:
    std_id = student.split(',')[0]
    name = student.split(',')[1]
    if (id == std_id):
        student_name = name
        break

if student_name:
    print(f'{student_name}: ', end='')
    results = []
    for grade in grade_list:
        g_id, subject, score = grade.split(',')
        if (id == g_id):
            results.append(f'{subject}: {score}')
    print(", ".join(results))
else:
    print('ID not found')