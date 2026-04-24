public class Main {
    public static void main(String[] args) {
        //1
        LibraryService AlexLibrary = LibraryService.getInstance();// Singleton
        AlexLibrary.addBook(new Book("Harry Potter"));
        AlexLibrary.addBook(new Book("Lord of the Rings"));

        User user = new User("John",true);
        // 3
        AlexLibrary.borrowBook("Harry Potter", user);
        
        
        System.out.println("-------------------------------");

        // 2 factory
        Book ebook = BookFactory.createBook(BooksTypes.EBook, "final distination");
        
        // 4
        Book premiumEBook = new PremiumBook(ebook);
        AlexLibrary.addBook(premiumEBook);
        User regualrUser = new User("Hamdy", false);

        AlexLibrary.borrowBook("final distination", regualrUser);
        
        System.out.println("-------------------------------");
        // 5
        Librarian lb = new Librarian();
        Manager mn = new Manager();

        EBook eb = new EBook("C++ programming OOP");
        User mohamed = new User("Mohamed");

        lb.nextHandler(mn);
        mn.nextHandler(null);
        AlexLibrary.addBook(eb);
        AlexLibrary.setRequestChain(lb);
        AlexLibrary.borrowBook("C++ programming OOP", mohamed);
        System.out.println("-------------------------------");
        System.out.println("-------------------------------");

        // 6
        String title= "base-book";

        Book bk = new Book(title);

        LibraryFacade facade = new LibraryFacade();
        facade.addBookRequest(bk);
        facade.performBorrowRequest(title, mohamed);;

    }
}
