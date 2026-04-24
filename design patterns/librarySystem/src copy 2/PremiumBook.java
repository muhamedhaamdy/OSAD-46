/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

/**
 *
 * @author hamdy
 */
public class PremiumBook extends BookDecorator {

    public PremiumBook(Book book) {
        super(book);
    }
    
    @Override
    public void borrowBook() {
        super.borrowBook();
        System.out.println("extra 10 days for this premium book");
    }
}
