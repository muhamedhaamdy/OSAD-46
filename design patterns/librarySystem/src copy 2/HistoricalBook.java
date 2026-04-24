public class HistoricalBook extends Book {
    public HistoricalBook(String title) {
        super(title);
    }
    @Override
    public void borrowBook() {
        System.out.println("Historical Book: "+super.getTitle() + " has been borrowed.");
    }
 }
