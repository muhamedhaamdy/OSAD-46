var radius;

do {
  radius = prompt("Enter the radius of the circle!!");
} while (isNaN(radius));

var area = Math.PI * radius ** 2;
alert("The area = " + area);