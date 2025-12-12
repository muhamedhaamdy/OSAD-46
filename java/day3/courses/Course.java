package day3.courses;

class Course {

    private int courseId;
    private int creditHours;
    private String courseName;

    public Course(int courseId, int creditHours, String courseName) {
        this.courseId = courseId;
        this.creditHours = creditHours;
        this.courseName = courseName;
    }

    public int getCourseId() {
        return courseId;
    }

    public int getcreditHours() {
        return creditHours;
    }

    public String getcourseName() {
        return courseName;
    }
}
