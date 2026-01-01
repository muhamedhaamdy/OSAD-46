package models;

import java.util.ArrayList;
// import Controller.HandleClient;

public class Library {

    private static ArrayList<LibraryItem> items = new ArrayList<>();

    public ArrayList<LibraryItem> getLibraryItems() {
        return items;
    }
}
