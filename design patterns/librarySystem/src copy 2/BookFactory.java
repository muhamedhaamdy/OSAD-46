/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

/**
 *
 * @author hamdy
 */
public class BookFactory {
    public static Book createBook(BooksTypes type, String title) {
        return switch (type) {
            case BooksTypes.EBook -> new EBook(title);
            case BooksTypes.HistoricalBook -> new HistoricalBook(title);
            case BooksTypes.PhysicalBook -> new PhysicalBook(title);
        };
    }
}
