
import java.util.function.Function;
import java.util.Scanner;

class Lab1 {

    public static void main(String[] argv) {
        System.out.print("Enter temprature in celsius: ");
        Scanner scanner = new Scanner(System.in);
        Function<Float, Float> toFahrenheit = c -> ((c * 1.8f) + 32.0f);
        float cel = scanner.nextInt();
        System.out.println("Temprature in Fahrenheit: " + toFahrenheit.apply(cel));
    }
}
