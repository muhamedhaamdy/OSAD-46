import java.util.ArrayList;
import java.util.List;

public class LibraryService {
    private static LibraryService instance;
    private List<Book> books = new ArrayList<>();
    private BorrowRequestHandler requesChain;

    private LibraryService(){

    }

    public static LibraryService getInstance() {
        if (instance == null)
        {
            instance = new LibraryService();
        }
        return instance;
    }

    public void addBook(Book book) {
        books.add(book);
    }

    public Book findBook(String title) {
        for (Book book : books) {
            if (book.getTitle().equalsIgnoreCase(title)) {
                return book;
            }
        }
        return null;
    }

    public void setRequestChain(BorrowRequestHandler chain) {
        this.requesChain = chain;
    }

    public void borrowBook(String title,User user) {
        Book book = findBook(title);
        if (book != null) {
            if (user.isPremium()){
                book = new PremiumBook(book);
            }
            if (requesChain != null)
            {
                requesChain.handle(user, book);
            }
            // book.borrowBook();
            System.out.println("borrowed by "+ user.getName());
        } else {
            System.out.println("Book not found.");
        }
    }

    public void returnBook(String title) {
        Book book = findBook(title);
        if (book != null) {
            book.returnBook();
        } else {
            System.out.println("Book not found.");
        }
    }
}
