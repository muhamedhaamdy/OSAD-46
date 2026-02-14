var user_name;
var birthyear, age;

do {
  user_name = prompt("Enter your name plz");
} while (!isNaN(user_name));

do {
  birthyear = prompt("Enter your birthyear plz!!!");
} while (!birthyear || isNaN(birthyear) || birthyear >= 2010);

age = 2026 - Number(birthyear);
alert(
  "Your name is " + user_name + "\nborn in " + birthyear + "\nAge = " + age
);x