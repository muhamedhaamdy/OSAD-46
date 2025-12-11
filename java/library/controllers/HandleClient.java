package controllers;

import models.Client;
import controllers.HandleItems;
import java.util.ArrayList;
import models.LibraryItem;

public class HandleClient {

    ArrayList<LibraryItem> itemsborrwed = new ArrayList<>();
    HandleItems handler;
    Client client;

    public HandleClient(Client client, HandleItems handler) {
        this.client = client;
        this.handler = handler;
    }

    public <T extends LibraryItem> void borrowItem(int itemId, Class<T> type) {
        try {
            LibraryItem item = handler.getItemById(itemId, type);
            if (!item.isBorrowed()) {
                item.setStatus(true);
                itemsborrwed.add(item);
                System.out.println(item.getTitle() + " Borrowed successfully");
            } else {
                System.out.println("Item is already borrowed");
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    public <T extends LibraryItem> void returnItem(int itemId, Class<T> type) {
        try {
            LibraryItem item = handler.getItemById(itemId, type);
            if (item.isBorrowed()) {
                item.setStatus(false);
                itemsborrwed.remove(item);
                System.out.println(item.getTitle() + " Returned successfully");
            } else {
                System.out.println("Item is not borrowed");
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
    // public void returnItem(int itemId) {
    // try {
    // LibraryItem item = handler.getItemById(itemId, );
    // if (item.isBorrowed()) {
    // item.setStatus(false);
    // itemsborrwed.remove(item);
    // System.out.println(item.getTitle() + " Returned successfully");
    // } else {
    // System.out.println("Item is not borrowed");
    // }
    // } catch (Exception e) {
    // System.out.println(e.getMessage());
    // }
    // }
}
