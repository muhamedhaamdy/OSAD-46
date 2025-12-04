import java.util.Scanner;

class Lab1_Part2 {
	public static void main(String[] argv)
	{
		Scanner myObj = new Scanner(System.in);
		System.out.print("Enter a sentence : ");
		String sentence = myObj.nextLine();
		System.out.print("Enter a Word : ");
		String word = myObj.nextLine();


		int index = 0;
		int c =0;
    while ((sentence.indexOf(word, index)) != -1)
		{
			c++;
			index += word.length();
		}
		System.out.print(c);
	}
}

