var sum = 0;
var current_number;

do {
  current_number = prompt("Enter the new number: ");
  while(!current_number || isNaN(current_number)){
    current_number = prompt("YOU SHOULD ENTER A NUMBER!!!");
  }
  sum = sum + Number(current_number);
} while (current_number != '0' && sum <= 100);

alert("Your sum is: " + sum);