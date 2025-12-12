package day4.exception;

public class Main {
  public static void main(String[] args) {
    TestException test = new TestException();

// unchecked and checked 
    try {
      test.method1();
    } catch (MyException e) {
      System.out.println("Caught in main: " + e.getMessage());
    } finally {
      System.out.println("Finally block for method1");
    }

    System.out.println("-------------------------");

    try {
      test.method2();
    } catch (MyException e) {
      System.out.println("Caught in main: " + e.getMessage());
    } finally {
      System.out.println("Finally block for method2");
    }

    System.out.println("-------------------------");

    try {
      test.method3();
    } catch (MyException e) {
      System.out.println("Caught in main: " + e.getMessage());
    } finally {
      System.out.println("Finally block for method3");
    }
  }
}
