package day3.courses;

import java.util.ArrayList;
import java.util.Scanner;

class Main {

    // add student 
    // student register for courses
    // print report for each student using StringBuilder
    // multiple courses parsed usinng StringTokenizer
    // autoBoxing and auto unBoxing in Id and grades
    // interface in some action like registeration
    // inner class represent the student registeration for a course
    static ArrayList<Student> students = new ArrayList<>();
    static ArrayList<Course> courses = new ArrayList<>();
    static Scanner input = new Scanner(System.in);
    static int studentId = 0;
    static int courseId = 0;

    public static void main(String[] args) {
        while (true) {
            System.out.println("\n--- SCHOOL MANAGEMENT SYSTEM ---");
            System.out.println("1. Add New Student");
            System.out.println("2. Add New Course");
            System.out.println("3. List all Students");
            System.out.println("4. List all Courses");
            System.out.println("5. Register Course to Student");
            System.out.println("6. Print Student Report");
            System.out.println("7. Exit");
            System.out.print("Enter choice: ");

            int choice = input.nextInt();
            switch (choice) {
                case 1:
                    addNewStudent();
                    break;
                case 2:
                    addNewCourse();
                    break;
                case 3:
                    listStudents();
                    break;
                case 4:
                    listCourses();
                    break;
                case 5:
                    System.out.print("please enter the grade: ");
                    double grade = input.nextDouble();
                    System.out.println();
                    registerCourseToStudent(grade);
                    break;
                case 6:
                    System.out.print("please enter the id: ");
                    int id = input.nextInt();
                    System.out.println();
                    printStudentReport(id);
                    break;
                case 7:
                    System.out.println("Exiting...");
                    return;
                default:
                    System.out.println("Invalid option.");
            }
        }
    }

    public static void addNewStudent() {
        studentId++;
        input.nextLine();
        System.out.print("Enter student name: ");
        String name = input.nextLine();
        if (name.matches("[a-zA-Z\\s]+")) {
            Student student = new Student(studentId, name);
            students.add(student);
        } else {
            System.out.println("invalid name");
        }
    }

    public static void addNewCourse() {
        courseId++;
        input.nextLine();
        System.out.print("Enter course name: ");
        String name = input.nextLine();
        System.out.print("Enter course hours: ");
        int hours = input.nextInt();
        Course course = new Course(courseId, hours, name);
        courses.add(course);
    }

    public static void listStudents() {
        System.out.println("-----------------------------------------------------------");
        for (Student student : students) {
            System.out.println("id: " + student.getStudentId() + " name: " + student.getName());
        }
        System.out.println("-----------------------------------------------------------");
    }

    public static void listCourses() {
        System.out.println("-----------------------------------------------------------");
        for (Course course : courses) {
            System.out.println("id: " + course.getCourseId() + " name: " + course.getcourseName() + " hours: " + course.getcreditHours());
        }
        System.out.println("-----------------------------------------------------------");
    }

    public static void registerCourseToStudent(double grade) {
        System.out.print("Enter course ID: ");
        int cId = input.nextInt();
        input.nextLine();
        System.out.print("Enter student ID: ");
        int sId = input.nextInt();

        Course course = findCourseById(cId);
        Student student = findStudentById(sId);
        if (course != null || student != null) {
            student.registerCourse(course, grade);
        }
    }

    public static void printStudentReport(int id) {
        Student student = findStudentById(id);
        student.printReport();
    }

    public static Course findCourseById(int id) {
        for (Course c : courses) {
            if (c.getCourseId() == id) {
                return c;
            }
        }
        System.out.println("this course id is invalid or not avalable");
        return null;
    }

    public static Student findStudentById(int id) {
        for (Student s : students) {
            if (s.getStudentId() == id) {
                return s;
            }
        }
        System.out.println("this student id is invalid or not avalable");
        return null;
    }
}
