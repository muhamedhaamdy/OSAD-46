import java.util.Random;

class lab4 {
  public static void main(String[] argv) {
    int arr[] = new int[1000];
    Random random = new Random();
    
    int min = Integer.MAX_VALUE;
    int max = Integer.MIN_VALUE;

    long start = System.nanoTime(); 

    for (int i = 0; i < 1000; i++) {
      arr[i] = random.nextInt(1000);

      if (arr[i] < min) {
        min = arr[i];
      }
      if (arr[i] > max) {
        max = arr[i];
      }
    }

    long duration = System.nanoTime() - start;

    System.out.println("Minimum Value: " + min);
    System.out.println("Maximum Value: " + max);
    System.out.println("Search running time: " + duration + " nanoseconds");
  }
}