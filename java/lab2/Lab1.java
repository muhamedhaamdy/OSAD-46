import java.util.Scanner;

class Lab1 {
	public static void main(String[] argv)
	{
		Scanner myObj = new Scanner(System.in);
		System.out.print("Enter a sentence : ");
		String sentence = myObj.nextLine();
		System.out.print("Enter a Word : ");
		String word = myObj.nextLine();

    String[] words = sentence.split("\\s+");
		int c = 0;
		for (int i = 0; i < words.length; i++)
		{
			if (words[i].equals(word))
				c++;
		}
		System.out.print(c);
	}
}

