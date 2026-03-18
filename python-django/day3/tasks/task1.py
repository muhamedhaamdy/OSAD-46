import random

student_file = open('students.txt', 'a')
grade_file = open('grade.txt', 'a')

student_database = [
    {1: "Ahmed"}, {2: "Hamo"}, {3: "Sara"}, {4: "Omar"}, 
    {5: "Laila"}, {6: "Youssef"}, {7: "Mariam"}, 
    {8: "Ziad"}, {9: "Nour"}, {10: "Kareem"}
]

subjects = ["Python", "Math", "C++"]

for student in student_database:
    id,name = list(student.items())[0]
    student_data = f'{id},{name}\n'
    student_file.write(student_data)
    for sub in subjects:
        grade = random.randrange(0, 100)
        sub_data = f'{id},{sub},{grade}\n'
        grade_file.write(sub_data)




