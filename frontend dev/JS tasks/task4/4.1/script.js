function func() {
  if (arguments.length != 2) {
    throw "this is wrong call";
  } else {
    console.log("right call");
  }
}

func(2, "mohamed");
func('hamdy', 3);
func();