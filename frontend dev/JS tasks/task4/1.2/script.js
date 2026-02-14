var sensitive;

do {
  sensitive = prompt("sensitive(y or n)?");
} while (sensitive != "y" && sensitive != "n");

var str;

do {
  str = prompt("Enter String: ");
} while (!str);

var reversed_str;

// mohamed
// ['m', 'o']

if (sensitive == "y") {
  reversed_str = str.split("").reverse().join("");
  if (reversed_str === str) alert("palindrome");
  else alert("not plaindrome!!");
} else {
  reversed_str = str.toLowerCase().split("").reverse().join("");
  if (reversed_str === str.toLowerCase()) alert("palindrome!!");
  else alert("not plaindrome!!");
}