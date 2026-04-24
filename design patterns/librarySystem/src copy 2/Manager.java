/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

/**
 *
 * @author hamdy
 */
public class Manager extends BorrowRequestHandler {
    @Override
    public void handle(User user, Book book) {
        System.out.println("this borrow request passed throw Manager with book: "+ book.getTitle() + " and the user: " + user.getName());
        System.out.println("Manager: Account looks good. Manager Approve.");   

        book.borrowBook();

        if (nextHandler != null) {
            nextHandler.handle(user, book);
        } 
    }
}
