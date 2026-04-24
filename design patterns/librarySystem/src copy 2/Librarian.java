/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

/**
 *
 * @author hamdy
 */
public class Librarian extends BorrowRequestHandler {
    @Override
    public void handle(User user, Book book) {
        System.out.println("this borrow request passed throw librarian with book: "+ book.getTitle() + " and the user: " + user.getName());
        System.out.println("Librarian: Account looks good. Forwarding request to Manager.");
        if (nextHandler != null) {
            nextHandler.handle(user, book);;
        }
    }
}
