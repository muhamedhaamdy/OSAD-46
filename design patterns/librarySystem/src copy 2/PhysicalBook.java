public class PhysicalBook extends Book{

    public PhysicalBook(String title) {
        super(title);
    }

    @Override
    public void borrowBook() {
        System.out.println("Physical Book: "+super.getTitle() + " has been borrowed byd.");

    }
}
