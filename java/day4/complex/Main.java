package day4.complex;

public class Main {
  public static void main(String[] args) {
    Complex<Integer> c1 = new Complex<>(5, 3);
    Complex<Double> c2 = new Complex<>(2.5, 1.5);

    System.out.println("Complex Number 1: " + c1);
    System.out.println("Complex Number 2: " + c2);

    Complex<Double> sum = c1.add(c2);
    System.out.println("Sum: " + sum);

    Complex<Double> diff = c1.subtract(c2);
    System.out.println("Difference: " + diff);

    Complex<Double> prod = c1.multiply(c2);
    System.out.println("Product: " + prod);
  }
}
