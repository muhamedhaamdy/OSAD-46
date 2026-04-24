/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

/**
 *
 * @author hamdy
 */
public class LibraryFacade {
    LibraryService library;

    public LibraryFacade() {
        this.library = LibraryService.getInstance();
        Librarian lb = new Librarian();
        Manager mg = new Manager();

        lb.nextHandler(mg);

        this.library.setRequestChain(lb);
    }

    public void addBookRequest(Book book) {
        library.addBook(book);
    }

    public void performBorrowRequest(String title, User user) {
        library.borrowBook(title, user);
    }
}
