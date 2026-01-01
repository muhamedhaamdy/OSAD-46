package models;

public abstract class LibraryItem {

    protected int id;
    protected String title;
    protected boolean borrowed = false;

    public void getItemDetails() {
        System.out.println("ID: (" + id + ") title: (" + title + ")");
    }

    public abstract int getId();

    public abstract String getTitle();

    public abstract String getType();

    public boolean isBorrowed() {
        return this.borrowed;
    }

    public void setStatus(boolean status) {
        this.borrowed = status;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
