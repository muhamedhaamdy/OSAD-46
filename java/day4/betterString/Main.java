package day4.betterString;

public class Main {
  public static void main(String[] args) {
    String string1 = "Hello";
    String string2 = "World!!!";

    String longer = StringUtils.betterString(string1, string2, (s1, s2) -> s1.length() > s2.length());
    String first = StringUtils.betterString(string1, string2, (s1, s2) -> true);

    System.out.println("String 1: " + string1);
    System.out.println("String 2: " + string2);
    System.out.println("Longer string: " + longer);
    System.out.println("Better string (first): " + first);
  }
}
