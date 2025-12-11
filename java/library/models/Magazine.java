package models;

public class Magazine extends LibraryItem {

    static int magId = 0;

    public Magazine(String title) {
        magId++;
        this.id = magId;
        this.title = title;
    }

    @Override
    public int getId() {
        return id;
    }

    @Override
    public String getTitle() {
        return this.title;
    }

    @Override
    public String getType() {
        return "magazine";
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
