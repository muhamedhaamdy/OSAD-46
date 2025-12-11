package models;

public abstract class LibraryItem {

    protected int id;
    protected String title;
    protected boolean borrowed = false;

    public void getItemDetails() {
        System.out.println("id: " + id + " title: " + title);
    }

    public abstract int getId();

    public abstract String getTitle();

    public abstract String getType();

    public abstract boolean isBorrowed();

    public abstract void setStatus(boolean status);

    public void setTitle(String title) {
        this.title = title;
    }
}
