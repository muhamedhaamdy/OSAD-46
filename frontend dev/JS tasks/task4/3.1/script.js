var arr = [];

for (var i = 0; i < 3; i++) {
  var curr;
  do {
    curr = prompt("Enter element " + (i + 1));
  } while (!curr || isNaN(curr));
  arr.push(Number(curr));
}

var sum = arr[0] + arr[1] + arr[2];
var mult = arr[0] * arr[1] * arr[2];
var div = arr[0] / arr[1] / arr[2];

alert("sum of 3 values = " + arr.join("+") + " =" + sum);
alert("multiplication of 3 values = " + arr.join("*") + " =" + mult);
alert("division of 3 values = " + arr.join("/") + " =" + div);