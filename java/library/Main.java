// package library;

import controllers.HandleClient;
import controllers.HandleItems;
// import controllers.Admin;
import controllers.Login;
import java.util.ArrayList;
import java.util.Scanner;
import models.Book;
import models.Client;
import models.ClientDatabase;
import models.Magazine;
import utils.ChekcEmail;
import utils.ClientAlreadyExist;
import utils.ClientNotFound;

public class Main {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        HandleItems library = new HandleItems();

        ArrayList<Client> userDatabase = ClientDatabase.getClients();

        Login loginSystem = new Login(library, userDatabase);
        // Admin admin = new Admin();

        ChekcEmail chekcEmail = new ChekcEmail();
        Client admin = new Client("Mohamed", "m@gmail.com", "123", "admin");
        try {
            loginSystem.register(admin);
        } catch (ClientAlreadyExist e) {
            System.out.println(e);
        }
        System.out.println("Welcome to the Advanced Library System!");

        while (true) {
            System.out.println("\n=== LOGIN SCREEN ===");
            System.out.println("1. Login");
            System.out.println("2. Register");
            System.out.println("3. Exit System");
            System.out.print("Enter choice: ");

            int choice = -1;
            try {
                choice = Integer.parseInt(scanner.nextLine());
            } catch (NumberFormatException e) {
                System.out.println("Invalid input.");
                continue;
            }

            if (choice == 3) {
                System.out.println("Goodbye!");
                break;
            }

            HandleClient activeSession = null;

            if (choice == 1) {
                System.out.print("Enter Email: ");
                String email = scanner.nextLine();
                if (!chekcEmail.checking(email)) {
                    System.out.println("invalid Email Format");
                    continue;
                }
                System.out.print("Enter Password: ");
                String password = scanner.nextLine();

                activeSession = loginSystem.login(email, password);

                if (activeSession != null) {
                    System.out.print("Loggedin Successfully with: " + email);
                } else {
                    System.out.print("Login Failed!!");
                }

            } else if (choice == 2) {
                System.out.print("Enter Name: ");
                String name = scanner.nextLine();
                System.out.print("Enter Email: ");
                String email = scanner.nextLine();
                if (!chekcEmail.checking(email)) {
                    System.out.println("invalid Email Format");
                    continue;
                }
                System.out.print("Enter Password: ");
                String password = scanner.nextLine();

                try {
                    loginSystem.register(name, email, password);
                } catch (ClientAlreadyExist e) {
                    System.out.println(e.getMessage());
                }

            }

            if (activeSession != null) {

                boolean isAdmin = activeSession.getClient().isAdmin();

                if (isAdmin) {
                    runAdminMenu(scanner, activeSession, library);
                } else {
                    runClientMenu(scanner, activeSession, library);
                }
            }
        }
        scanner.close();
    }

    private static void runAdminMenu(Scanner scanner, HandleClient session, HandleItems library) {
        while (true) {
            System.out.println("\n--- ADMIN MENU ---");
            System.out.println("1. Add Book");
            System.out.println("2. Add Magazine");
            System.out.println("3. Remove Item");
            System.out.println("4. Update Item");
            System.out.println("5. List All Items");
            System.out.println("6. List All Users");
            System.out.println("7. Delete User");
            System.out.println("8. Logout");
            System.out.print("Choice: ");

            int choice = -1;
            try {
                choice = Integer.parseInt(scanner.nextLine());
            } catch (NumberFormatException e) {
                System.out.println("Invalid input. Please enter a number.");
                continue;
            }

            switch (choice) {
                case 1:
                    System.out.print("Enter Book Title: ");
                    String bTitle = scanner.nextLine();
                    library.addItem(new Book(bTitle));
                    System.out.println("Book added successfully.");
                    break;
                case 2:
                    System.out.print("Enter Magazine Title: ");
                    String mTitle = scanner.nextLine();
                    library.addItem(new Magazine(mTitle));
                    System.out.println("Magazine added successfully.");
                    break;
                case 3:
                    System.out.println("1. Remove Book\n2. Remove Magazine");
                    System.out.print("Enter type: ");
                    try {
                        int rType = Integer.parseInt(scanner.nextLine());
                        System.out.print("Enter ID: ");
                        int rmId = Integer.parseInt(scanner.nextLine());
                        if (rType == 1)
                            library.removeItem(rmId, Book.class);
                        else if (rType == 2)
                            library.removeItem(rmId, Magazine.class);
                        else
                            System.out.println("Invalid type.");
                    } catch (NumberFormatException e) {
                        System.out.println("Invalid input.");
                    }
                    break;
                case 4:
                    System.out.println("1. Update Book\n2. Update Magazine");
                    System.out.print("Enter type: ");
                    try {
                        int type = Integer.parseInt(scanner.nextLine());
                        System.out.print("Enter ID: ");
                        int uid = Integer.parseInt(scanner.nextLine());
                        System.out.print("Enter New Title: ");
                        String newTitle = scanner.nextLine();
                        if (type == 1)
                            library.updateItemTitle(uid, Book.class, newTitle);
                        else if (type == 2)
                            library.updateItemTitle(uid, Magazine.class, newTitle);
                        else
                            System.out.println("Invalid type.");
                    } catch (NumberFormatException e) {
                        System.out.println("Invalid input.");
                    }
                    break;
                case 5:
                    System.out.println("--------------------------------------");
                    library.listLibrary();
                    System.out.println("--------------------------------------");
                    break;
                case 6:
                    System.out.println("--------------------------------------");
                    // Admin admin = new Admin();
                    HandleClient.listAllUsers();
                    System.out.println("--------------------------------------");
                    break;
                case 7:
                    System.out.print("Enter User ID to Delete: ");
                    int id = Integer.parseInt(scanner.nextLine());
                    // Admin admin = new Admin();
                    try {
                        session.deleteUser(id);
                    } catch (ClientNotFound e) {
                        System.out.print(e);
                    }
                    break;
                case 8:
                    return;
                default:
                    System.out.println("Invalid choice.");
            }
        }
    }

    private static void runClientMenu(Scanner scanner, HandleClient session, HandleItems library) {
        while (true) {
            System.out.println("\n--- CLIENT MENU ---");
            System.out.println("1. Borrow Book");
            System.out.println("2. Return Book");
            System.out.println("3. List My Borrowed Items");
            System.out.println("4. List All Library Items");
            System.out.println("5. Logout");
            System.out.print("Choice: ");

            int c = -1;
            try {
                c = Integer.parseInt(scanner.nextLine());
            } catch (Exception e) {
                // System.out.println(e);
            }

            switch (c) {
                case 1:
                    System.out.print("Enter Book ID: ");
                    try {
                        session.borrowItem(Integer.parseInt(scanner.nextLine()), Book.class);
                    } catch (Exception e) {
                        System.out.println("Invalid ID");
                    }
                    break;
                case 2:
                    System.out.print("Enter Book ID to Return: ");
                    try {
                        session.returnItem(Integer.parseInt(scanner.nextLine()), Book.class);
                    } catch (Exception e) {
                        System.out.println("Invalid ID");
                    }
                    break;
                case 3:
                    session.listBorrwed();
                    break;
                case 4:
                    System.out.println("Listing all items...");
                    System.out.println("--------------------------------------");
                    library.listLibrary();
                    System.out.println("--------------------------------------");
                    break;
                case 5:
                    System.out.println("Logging out...");
                    return;
                default:
                    System.out.println("Invalid choice.");
            }
        }
    }
}
