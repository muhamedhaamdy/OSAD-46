
import java.util.Map;
import java.util.Scanner;
import java.util.Set;
import java.util.TreeMap;
import java.util.TreeSet;

class Main {

    static Map<Character, Set<String>> dict = new TreeMap<>();
    static Scanner input = new Scanner(System.in);

    public static void main(String[] args) {
        while (true) {
            System.out.println("1: add word");
            System.out.println("2: list all Dictionary");
            System.out.println("3: find a word");
            System.out.println("4: Exit");

            if (!input.hasNextInt()) {
                input.next();
                continue;
            }
            int choice = input.nextInt();
            input.nextLine();

            switch (choice) {
                case 1:
                    System.out.print("Enter the word: ");
                    String word = input.nextLine();
                    addWord(word);
                    break;
                case 2:
                    listDict();
                    break;
                case 3:
                    System.out.print("Enter the word: ");
                    String search = input.nextLine();
                    searchWord(search);
                    break;
                case 4:
                    System.out.println("Exitttt !!!");
                    return;
                default:
                    System.out.println("Invalid choice");
            }
        }
    }

    static void addWord(String word) {
        if (word == null || word.isEmpty())
            return;
        word = word.toLowerCase();
        char firstChar = word.charAt(0);
        dict.computeIfAbsent(firstChar, k -> new TreeSet<>()).add(word);
    }

    static void listDict() {
        if (dict.isEmpty()) {
            System.out.println("Dictionary is empty.");
            return;
        }
        dict.forEach((key, words) -> System.out.println(key + ": " + words));
    }

    static void searchWord(String search) {
        if (search == null || search.isEmpty()) {
            System.out.println("Not Found");
            return;
        }
        search = search.toLowerCase();
        char firstChar = search.charAt(0);
        if (dict.containsKey(firstChar) && dict.get(firstChar).contains(search)) {
            System.out.println("Found");
        } else {
            System.out.println("Not Found");
        }
    }
}
