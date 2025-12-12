package day3.courses;

import java.util.ArrayList;

class Student {
    // studentId -> int unique
    // name -> string 
    // registrations -> ArrayList of all the courses the student registerd

    // registerCourse(Course course, Double grade) -> 
    //
    private int id;
    private String name = new String();
    ArrayList<CourseRegistration> ls = new ArrayList<>();

    public Student(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public void registerCourse(Course course, double grade) {
        CourseRegistration courseReg = new CourseRegistration(course, grade);
        ls.add(courseReg);
    }

    public void printReport() {
        System.out.println("ID: " + id);
        System.out.println("Student: " + name);
        for (CourseRegistration c : ls) {
            System.out.println("course (" + c.getCourse().getcourseName() + ") and its grade is " + c.getGrade());
        }
    }

    public String getName() {
        return name;
    }

    public int getStudentId() {
        return id;
    }

    public ArrayList getRegistrations() {
        return ls;
    }

    public ArrayList<CourseRegistration> getLs() {
        return ls;
    }

    public void setLs(ArrayList<CourseRegistration> ls) {
        this.ls = ls;
    }

    class CourseRegistration {

        private Course course;
        private double grade;

        public CourseRegistration(Course course, double grade) {
            this.course = course;
            this.grade = grade;
        }

        public Course getCourse() {
            return this.course;
        }

        public double getGrade() {
            return this.grade;
        }
    }
}
