var user_name;
var name_regex = /^[a-zA-Z\s]+$/;
var phone_number;
var phone_regex = /^\d{8}$/;
var mobile_number;
var mobile_regex = /^01[012]\d{8}$/;
var email;
var email_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

do {
  user_name = prompt("Enter your name plz !!");
} while (!name_regex.test(user_name));

do {
  phone_number = prompt("Enter your phone number plz !!");
} while (!phone_regex.test(phone_number));

do {
  mobile_number = prompt("Enter your mobile number plz !!");
} while (!mobile_regex.test(mobile_number));

do {
  email = prompt("Enter your email plz !!");
} while (!email_regex.test(email));

alert(
  "Welcome " + user_name + "\n" +
    "Your data is:\nphone number: " + phone_number +
    "\nmobile number: " + mobile_number +   
    "\nemail: " +  email
);