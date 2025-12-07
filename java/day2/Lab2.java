import java.util.StringTokenizer;
import java.util.Scanner;


class Lab2 {
	public static void main(String[] argv)
	{
		Scanner myObj = new Scanner(System.in);
		System.out.print("Enter a sentence : ");
		String sentence = myObj.nextLine();
		System.out.print("Enter a word : ");
		String word = myObj.nextLine();
		StringTokenizer st = new StringTokenizer(sentence);
		int c = 0;

		while (st.hasMoreTokens())
		{
			if (st.nextToken().equals(word))
				c++;
		}
		System.out.print("the cout of the word: " + word + " is " + c);
	}
}
