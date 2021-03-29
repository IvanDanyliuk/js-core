//Task 1
let x = 1;
let y = 2;

let res1 = String(x) + String(y);
console.log(res1);                  // "12"
console.log(typeof res1);           // "string"

let res2 = Boolean(x) + String(2);
console.log(res2);                  // "true2"
console.log(typeof res2);           // "string"

let res3 = Boolean(x + y);
console.log(res3);                  // true
console.log(typeof res3);           // "boolean"

let res4 = parseInt(x / isNaN(y));
console.log(res4);                  // NaN
console.log(typeof res4);           // "number"


//Task 2
let num = prompt("Enter your number", "");
if(num > 0 && num % 2 === 0 && num % 7 === 0) {
    console.log(true);
} else {
    console.log(false);
}


//Task 3
let arr = [];
arr[0] = 7;
arr[1] = "String";
arr[2] = true;
arr[3] = null;
alert(arr.length);
arr[4] = prompt("Enter something...", "");
alert(arr[4]);
arr.shift();
alert(arr);


//Task 4
let cities = ["Rome", "Lviv", "Warsaw"]; 
console.log(cities.join('*'));


//Task 5
let isAdult = prompt("Введіть Ваш вік", "");
if(isAdult >= 18) {
    console.log("Ви досягли повнолітнього віку");
} else if(isAdult < 10) {
    console.log("Ви ще надто молоді");
}


//Task 6
let sides = [];
sides[0] = +prompt("Enter the length of side A", "");
sides[1] = +prompt("Enter the length of side B", "");
sides[2] = +prompt("Enter the length of side C", "");

sides.sort(function(a, b) {
    return a - b;
});

let square = (((sides[0] + sides[1] + sides[2]) * (sides[1] + sides[2] - sides[0]) * (sides[0] + sides[2] - sides[1]) * (sides[0] + sides[1] - sides[2])) ** 0.5) / 4;

if(!isNaN(square) && square !== 0) {
    console.log("The square of the triangle is " + square.toFixed(3));
    if(sides[2] ** 2 === sides[0] ** 2 + sides[1] ** 2) {
        console.log("This is a right triangle!");
    } else {
        console.log("This is not a right triangle!");
    }
} else {
    console.log("Incorrect data");
}


//Task 7
let currentTime = new Date();
let time = currentTime.getHours();

//Method 1
switch(true) {
    case time >= 23 && time <= 24 || time >= 0 && time < 5:
        console.log("Доброї ночі");
        break;
    case time >= 5 && time < 11:
        console.log("Доброго ранку");
        break;
    case time >= 11 && time < 17:
        console.log("Доброго дня");
        break;
    case time >= 17 && time < 23:
        console.log("Доброго вечора");
        break;
    default:
        console.log("Щось пішло не так!");
}

//Method 2
time >= 23 && time <= 24 || time >= 0 && time < 5 ? 
    console.log("Доброї ночі") : 
    time >= 5 && time < 11 ? 
        console.log("Доброго ранку") : 
        time >= 11 && time < 17 ? 
            console.log("Доброго дня") : 
            time >= 17 && time < 23 ? 
                console.log("Доброго вечора") : 
                console.log("Введіть коректний час!");

