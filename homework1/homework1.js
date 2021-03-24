//Task 2
const surname = "Danyliuk";
console.log(surname);


//Task 3
let currentCity = "Kyiv";
let nativeCity = "Lviv";
alert("Values before making a copy: " + currentCity + " " + nativeCity);

currentCity = nativeCity;
alert("Values after making a copy: " + currentCity + " " + nativeCity);

//Task 4
let myObject = {
    string: "This is a string",
    number: 7,
    boolean: true,
    undefined: undefined,
    null: null
};


//Task 5
let isAdult = confirm("Have you reached the age of 18 y.o?");
console.log(isAdult);


//Task 6
const firstName = "Ivan";
const secondName = "Danyliuk";
const group = "Lv-583.JSCore21";
const birthYear = 1991;
let isMarried = false;

console.log(
    "The type of firstName is " + typeof firstName + "\n", 
    "The type of secondName is " + typeof secondName + "\n", 
    "The type of group is " + typeof group + "\n",
    "The type of birthYear is " + typeof birthYear + "\n",
    "The type of isMarried is " + typeof isMarried + "\n"
);

console.log(birthYear, isMarried, firstName, secondName, group);

let undefinedVariable = undefined;
let nullVariable = null;
console.log(
    "The type of undefinedVariable is " + typeof undefinedVariable + "\n", 
    "The type of nullVariable is " + typeof nullVariable + "\n"
);


//Task 7
let login = prompt("Enter your login", "Login");
let email = prompt("Enter your email", "Email");
let password = prompt("Enter your password", "Password");
alert("Dear " + login + ", your email is " + email + ", your password is " + password);


//Task 8
let secondsPerHour = 60 * 60;
let secondsPerDay = secondsPerHour * 24;
let secondsPerMonth = secondsPerDay * 30;
document.write(
    "<h3>Task 8</h3>",
    "One hour includes " + secondsPerHour + " seconds" + "</br>",
    "One day includes " + secondsPerDay + " seconds" + "</br>",
    "One month includes " + secondsPerMonth + " seconds" + "</br>"
);
