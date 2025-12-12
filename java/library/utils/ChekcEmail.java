package utils;

public class ChekcEmail {
  public boolean checking(String email) {
    return email.matches("(?i)^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$");
  }
}
