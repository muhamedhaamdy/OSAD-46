public class EBook extends Book{

    public EBook(String title) {
        super(title);
    }

    @Override
    public void borrowBook() {
        System.out.println(" borrowed the e-book: "+super.getTitle() );

    }
}
