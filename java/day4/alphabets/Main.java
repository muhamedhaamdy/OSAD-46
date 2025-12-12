package day4.alphabets;

public class Main {
  public static void main(String[] args) {
    String s1 = "Hello";
    String s2 = "Java 123";
    String s3 = "World!";
    String s4 = "Test";

    System.out.println(StringChecker.isOnlyAlphabets(s1));
    System.out.println(StringChecker.isOnlyAlphabets(s2));
    System.out.println(StringChecker.isOnlyAlphabets(s3));
    System.out.println(StringChecker.isOnlyAlphabets(s4));
  }
}
