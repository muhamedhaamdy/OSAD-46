import java.util.Random;
import java.util.Arrays;

class lab5 {
  public static void main(String[] argv) {
    int arr[] = new int[1000];
    Random random = new Random();
    
    int find = random.nextInt(1000);
    long start = System.nanoTime(); 

    for (int i = 0; i < 1000; i++) {
      arr[i] = random.nextInt(1000);
    }
    Arrays.sort(arr); 
    
    int l = 0;
    int r = arr.length - 1;
    int mid;
    int index = -1;
    while (l <= r)
    {
      mid = (l + r) / 2;
      if (arr[mid] == find)
      {
        index = mid; 
        break;       
      }
      if (arr[mid] > find)
      {
          r = mid - 1;
      }
      if (arr[mid] <  find)
      {
         l = mid + 1;
      }
    }

    long duration = System.nanoTime() - start;
    if (index == -1)
    {
      System.out.println(find + " not found");
    }
    if (index >= 0)
    {
      System.out.println(find + " found in index " + index);
    }
    System.out.println("Search running time: " + duration + " nanoseconds");
  }
}