var number;

do {
  number = prompt("Enter the number !!");
} while (isNaN(number));

alert("The square root = " + Math.sqrt(number));