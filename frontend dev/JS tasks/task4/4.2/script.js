function func() {
  var args = [];
  for (var i = 0; i < arguments.length; i++) {
    args.push(arguments[i]);
  }
  alert(args.reverse());
}

func("Mohamed", "Hamdy", 1 ,false, true, 15);
func(0, 3);
func('hello', 'welcome', '17');
func();