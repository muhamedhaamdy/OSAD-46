var message;

do {
  message = prompt("Enter your message plz!!");
} while (!message);

for (var i = 1; i <= 6; i++) {
  document.writeln("<h" + i + ">" + message + "</h" + i + ">");
}