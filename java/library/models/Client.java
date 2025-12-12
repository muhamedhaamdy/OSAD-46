package models;

import controllers.HandleItems;
import java.util.ArrayList;
import models.*;

public class Client {

    private int cId = 0;
    private int id;
    private String name;
    private String email;
    private String password;
    private HandleItems handler = new HandleItems();
    private String role;
    private ArrayList<LibraryItem> borrowedItems;

    public Client(String name, String email, String password) {
        cId++;
        this.id = cId;
        this.name = name;
        this.email = email;
        this.password = password;
        borrowedItems = new ArrayList<>();
        role = "client";
    }

    public String getEmail() {
        return email;
    }

    public String getPasswrod() {
        return email;
    }

    public String getName() {
        return name;
    }

    public int getId() {
        return id;
    }

    public String getPassword() {
        return password;
    }

    public ArrayList<LibraryItem> getBorrowed() {
        return borrowedItems;
    }

    // public void borrow(LibraryItem item) throws ItemNotFound {
    // try {
    // handler.getItemById(item.getId(), item.getType());
    // } catch (ItemNotFound e) {
    // System.out.println(e);
    // }
    // }
}
