package controllers;

import models.Client;
import models.ClientDatabase;

import java.util.ArrayList;
import models.LibraryItem;

import utils.ClientNotFound;

public class HandleClient {

    // ArrayList<LibraryItem> itemsborrwed = new ArrayList<>();
    HandleItems handler;
    Client client;
    ArrayList<Client> clients = ClientDatabase.getClients();

    public HandleClient(Client client, HandleItems handler) {
        this.client = client;
        this.handler = handler;
    }

    public Client getClientByEmail(String email) throws ClientNotFound {
        for (Client c : clients) {
            if (c.getEmail().equals(email)) {
                return c;
            }
        }
        throw new ClientNotFound("this Email is not valid");
    }

    public <T extends LibraryItem> void borrowItem(int itemId, Class<T> type) {
        try {
            LibraryItem item = handler.getItemById(itemId, type);
            if (!item.isBorrowed()) {
                item.setStatus(true);
                this.client.getBorrowed().add(item);
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
                this.client.getBorrowed().remove(item);
                System.out.println(item.getTitle() + " Returned successfully");
            } else {
                System.out.println("Item is not borrowed");
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    public void listBorrwed() {
        for (LibraryItem item : this.client.getBorrowed()) {
            item.getItemDetails();
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
