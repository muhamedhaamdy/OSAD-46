function sum() {
  var sum = 0;
  for (var i = 0; i < arguments.length; i++) {
    if (isNaN(arguments[i])) {
      throw "numbers only!!";
    } else sum = sum + arguments[i];
  }
  return sum;
}

alert(sum(20, 30, 40, 50));
alert(sum(1, 2, 3, 4, 5, 6, 7));
alert(sum(20, "hamdy", 40, 50));
