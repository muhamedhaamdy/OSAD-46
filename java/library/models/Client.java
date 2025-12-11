package models;

import controllers.HandleItems;

public class Client {

    private int id;
    private String name;
    private String email;
    private HandleItems handler = new HandleItems();

    public Client(int id, String name, String email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    // public void borrow(LibraryItem item) throws ItemNotFound {
    //     try {
    //         handler.getItemById(item.getId(), item.getType());
    //     } catch (ItemNotFound e) {
    //         System.out.println(e);
    //     }
    // }
}
