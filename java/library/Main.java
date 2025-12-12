// package library;

import controllers.HandleClient;
import controllers.HandleItems;
import java.util.Scanner;
import models.Book;
import models.Client;
import models.Magazine;
// import utils.ItemNotFound;

public class Main {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        // Book b1 = new Book("Harry Poter");
        // Book b2 = new Book("Journy to the center of the earth");
        // Magazine m1 = new Magazine("Alahram");
        // Magazine m2 = new Magazine("Elgezera");

        Client c1 = new Client(1, "Hamdy", "hamdy@gmail.com");

        HandleItems handlerItem = new HandleItems();
        HandleClient handlerClient = new HandleClient(c1, handlerItem);

        // handlerItem.addItem(b1);
        // handlerItem.addItem(b2);
        // handlerItem.addItem(m1);
        // handlerItem.addItem(m2);
        System.out.println("Welcome to the Library System!");

        while (true) {
            System.out.println("\n--- Menu ---");
            System.out.println("1. List All Items");
            System.out.println("2. Borrow Book");
            System.out.println("3. Return Book");
            System.out.println("4. Borrow Magazine");
            System.out.println("5. Return Magazine");
            System.out.println("6. Exit");
            System.out.println("7. Add New Book");
            System.out.println("8. Add New Magazine");
            System.out.println("9. Update Item");
            System.out.println("10. Remove Item");
            System.out.println("11. List Borrowed Items");
            System.out.print("Enter your choice: ");

            int choice = -1;
            try {
                choice = Integer.parseInt(scanner.nextLine());
            } catch (NumberFormatException e) {
                System.out.println("Invalid input. Please enter a number.");
                continue;
            }

            switch (choice) {
                case 1:
                    System.out.println("--------------------------------------");
                    handlerItem.listLibrary();
                    System.out.println("--------------------------------------");
                    break;
                case 2:
                    System.out.print("Enter Book ID to borrow: ");
                    try {
                        int bid = Integer.parseInt(scanner.nextLine());
                        handlerClient.borrowItem(bid, Book.class);
                    } catch (NumberFormatException e) {
                        System.out.println("Invalid ID.");
                    }
                    break;
                case 3:
                    System.out.print("Enter Book ID to return: ");
                    try {
                        int rid = Integer.parseInt(scanner.nextLine());
                        handlerClient.returnItem(rid, Book.class);
                    } catch (NumberFormatException e) {
                        System.out.println("Invalid ID.");
                    }
                    break;
                case 4:
                    System.out.print("Enter Magazine ID to borrow: ");
                    try {
                        int mid = Integer.parseInt(scanner.nextLine());
                        handlerClient.borrowItem(mid, Magazine.class);
                    } catch (NumberFormatException e) {
                        System.out.println("Invalid ID.");
                    }
                    break;
                case 5:
                    System.out.print("Enter Magazine ID to return: ");
                    try {
                        int rmid = Integer.parseInt(scanner.nextLine());
                        handlerClient.returnItem(rmid, Magazine.class);
                    } catch (NumberFormatException e) {
                        System.out.println("Invalid ID.");
                    }
                    break;
                case 6:
                    System.out.println("Exiting...");
                    scanner.close();
                    return;
                case 7:
                    System.out.print("Enter Book Title: ");
                    String bTitle = scanner.nextLine();
                    handlerItem.addItem(new Book(bTitle));
                    System.out.println("Book added successfully.");
                    break;
                case 8:
                    System.out.print("Enter Magazine Title: ");
                    String mTitle = scanner.nextLine();
                    handlerItem.addItem(new Magazine(mTitle));
                    System.out.println("Magazine added successfully.");
                    break;
                case 9:
                    System.out.println("1. Update Book\n2. Update Magazine");
                    System.out.print("Enter type: ");
                    try {
                        int type = Integer.parseInt(scanner.nextLine());
                        System.out.print("Enter ID: ");
                        int uid = Integer.parseInt(scanner.nextLine());
                        System.out.print("Enter New Title: ");
                        String newTitle = scanner.nextLine();
                        if (type == 1) {
                            handlerItem.updateItemTitle(uid, Book.class, newTitle);
                        } else if (type == 2) {
                            handlerItem.updateItemTitle(uid, Magazine.class, newTitle);
                        } else {
                            System.out.println("Invalid type.");
                        }
                    } catch (NumberFormatException e) {
                        System.out.println("Invalid input.");
                    }
                    break;
                case 10:
                    System.out.println("1. Remove Book\n2. Remove Magazine");
                    System.out.print("Enter type: ");
                    try {
                        int rType = Integer.parseInt(scanner.nextLine());
                        System.out.print("Enter ID: ");
                        int rmId = Integer.parseInt(scanner.nextLine());
                        if (rType == 1)
                            handlerItem.removeItem(rmId, Book.class);
                        else if (rType == 2)
                            handlerItem.removeItem(rmId, Magazine.class);
                        else
                            System.out.println("Invalid type.");
                    } catch (NumberFormatException e) {
                        System.out.println("Invalid input.");
                    }
                    break;
                case 11:
                    handlerClient.listBorrwed();
                    break;
                default:
                    System.out.println("Invalid choice. Please try again.");
            }
        }
    }
}
