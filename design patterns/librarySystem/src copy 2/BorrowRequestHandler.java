/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

/**
 *
 * @author hamdy
 */
public abstract class BorrowRequestHandler {
    protected BorrowRequestHandler nextHandler;

    public void nextHandler(BorrowRequestHandler handler) {
        this.nextHandler = handler;
    }

    public abstract void handle(User user, Book book);
}

