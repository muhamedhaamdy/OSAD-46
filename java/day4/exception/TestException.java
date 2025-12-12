package day4.exception;

public class TestException {
  public void method1() throws Exception {
    System.out.println("Inside method1");
    throw new MyException("Exception thrown from method1");
  }

  public void method2() throws MyException {
    System.out.println("Inside method2");
    throw new MyException("Exception thrown from method2");
  }

  public void method3() throws MyException {
    System.out.println("Inside method3");
    throw new MyException("Exception thrown from method3");
  }
}
