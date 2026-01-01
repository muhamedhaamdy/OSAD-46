package controllers;

// import java.util.ArrayList;
import models.*;
import utils.ItemNotFound;

interface libraryHandle {

    public <T extends LibraryItem> void addItem(T b);

    public <T extends LibraryItem> void removeItem(int id, Class<T> type);

    public <T extends LibraryItem> void updateItemTitle(int id, Class<T> type, String newTitle);

    public void listLibrary();
}

public class HandleItems implements libraryHandle {

    // static ArrayList<LibraryItem> items = new ArrayList<>();
    private Library library = new Library();

    public <T extends LibraryItem> void addItem(T b) {
        this.library.getLibraryItems().add(b);
    }

    public <T extends LibraryItem> T getItemById(int id, Class<T> type) throws ItemNotFound {
        return this.library.getLibraryItems().stream()
                .filter(item -> item.getId() == (id) && type.isInstance(item))
                .map(type::cast) // Stream<LibraryItem> -> Stream<T>
                .findFirst()
                .orElseThrow(() -> new ItemNotFound("Item Not Found"));

        // for (LibraryItem item : this.library.getLibraryItems()) {
        //     if (item.getId() == id && type.isInstance(item)) {
        //         return type.cast(item);
        //     }
        // }
    }

    public int itemAt(LibraryItem item) throws ItemNotFound {
        for (int i = 0; i < library.getLibraryItems().size(); i++) {
            if (library.getLibraryItems().get(i).equals(item)) {
                return i;
            }
        }
        throw new ItemNotFound("Item not found");
    }

    public <T extends LibraryItem> void removeItem(int id, Class<T> type) {
        boolean removed = this.library.getLibraryItems().removeIf(item -> item.getId() == id && type.isInstance(item));
        if (removed) {
            System.out.println("Item removed successfully.");
        } else {
            System.out.println("Item not found.");
        }
    }

    public <T extends LibraryItem> void updateItemTitle(int id, Class<T> type, String newTitle) {
        try {
            LibraryItem item = getItemById(id, type);
            item.setTitle(newTitle);
            System.out.println("Item title updated successfully.");
        } catch (ItemNotFound e) {
            System.out.println("Item not found.");
        }
    }

    public void listLibrary() {
        for (LibraryItem item : this.library.getLibraryItems()) {
            System.out.println("id: (" + item.getId() + ") title: (" + item.getTitle() + ") Type: (" + item.getType()
                    + ") status: (" + (item.isBorrowed() ? "borrowed" : "available") + ")");
        }
    }
}
