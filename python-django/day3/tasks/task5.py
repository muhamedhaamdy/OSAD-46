student_name = ''
student_subject = ''
student_grade = ''

try:
    student_file = open('students.txt')
    grade_file = open('grade.txt')
except FileNotFoundError as e:
    print(e)


student_list = student_file.read().splitlines()
grade_list = grade_file.read().splitlines()

for student in student_list:
    avg = 0
    std_id = student.split(',')[0]
    name = student.split(',')[1]
    print(f"{name} avg: ",end='')
    for grade in grade_list:
        g_id, subject, score = grade.split(',')
        if (std_id == g_id):
            avg += int(score)
    print(avg//3)