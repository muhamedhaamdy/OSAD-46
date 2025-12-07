
import java.util.Scanner;
import java.util.function.Function;

class Lab2 {

    public static void main(String[] argv) {
        double[] factors = new double[4];
        Scanner scanner = new Scanner(System.in);
        for (int i = 0; i < 3; i++) {
            System.out.println("Enter the " + (i + 1) + "th factor: ");
            try {
                factors[i] = scanner.nextDouble();
            } catch (Exception e) {
                System.out.println("the input must be number");
                scanner.next();
                i--;
            }
        }
        Function<double[], double[]> getRoots = f -> {
            double a = f[0], b = f[1], c = f[2];
            double comp = b * b - 4 * a * c;
            if (comp >= 0) {
                double[] root = new double[2];
                root[0] = (-b + Math.sqrt(b * b - 4 * a * c)) / 2 * a;
                root[1] = (-b - Math.sqrt(b * b - 4 * a * c)) / 2 * a;
                return root;
            } else {
                throw new IllegalArgumentException("the b^2 - 4ac is must be > 0");
            }
        };

        try {
            double[] result = getRoots.apply(factors);
            System.out.println("Root 1: " + result[0]);
            System.out.println("Root 2: " + result[1]);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
}
