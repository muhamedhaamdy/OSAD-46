package day4.alphabets;

public class StringChecker {
  public static boolean isOnlyAlphabets(String s) {
    if (s == null || s.isEmpty()) {
      return false;
    }
    for (char c : s.toCharArray()) {
      if (!Character.isLetter(c)) {
        return false;
      }
    }
    return true;
  }
}
