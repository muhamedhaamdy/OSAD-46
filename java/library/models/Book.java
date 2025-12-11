package models;

public class Book extends LibraryItem {

    static int bId = 0;

    public Book(String title) {
        bId++;
        this.id = bId;
        this.title = title;
    }

    @Override
    public int getId() {
        return id;
    }

    @Override
    public String getTitle() {
        return title;
    }

    @Override
    public String getType() {
        return "book";
    }

    @Override
    public boolean isBorrowed() {
        return borrowed;
    }

    @Override
    public void setStatus(boolean status) {
        this.borrowed = status;
    }
}
