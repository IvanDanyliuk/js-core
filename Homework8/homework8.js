//Task 1
function upperCase(str) {
    const re = /^[A-Z]/;
    return str.match(re) ? "String\'s starts with uppercase character" : "String\'s not starts with uppercase character"
}

[
    "regexp",
    "RegExp",
    "1RegExp",
    ".RegExp"
].forEach(function(item) {
    console.log(upperCase(item));
});


//Task 2
function checkEmail(email) {
    return /\w+@\w+/.test(email);
}

[
    "example@gmail.com", 
    "1111", 
    "example.gmail.com", 
    "@gmail.com", 
    "example@", 
    "@", 
    ".@.", 
    "example@.", 
    "$@$."
].forEach(function(item) {
    console.log(checkEmail(item));
});


//Task 3
let re = /d(b+)(d)/i;
let result = "cdbBdbsbz".match(re).filter(function(str) { return typeof str === "string" });
console.log(result);


//Task 4
let re = /(.+)\s(.+)/;
let result = "Java Script".replace(re, "$2, $1");
console.log(result);


//Task 5
function checkCardNumber(value) {
    let re = /\d{16}/g;
    let number = value.split(/\D/gi).join("");
    return re.test(number) ? "Card number is valid" : "Card number is invalid";
}

[
    "9999-9999-9999-9999", 
    "9999-9999-99999999", 
    "9999-99a9-9999-9999", 
    "9999-9999-9999"
].forEach(function(item) {
    console.log(checkCardNumber(item));    
});


//Task 6
function checkEmail(email) {
    let re = /^[a-z0-9](\w+)?(-?)\w*@[a-z0-9]+.[a-z]{2,}/i;
    return re.test(email) ? "Email is correct!" : "Email is not correct!";
}

[
    "my_mail@gmail.com", 
    "mymail@gmail.com", 
    "#my_mail@gmail.com", 
    "my-mail@gmail.com", 
    "my-ma-il@gmail.com", 
    "-mymail@gmail.com", 
    "mymail@3mail.com",
    "1-my_mail@3mail.com",
    "1-my_ma-il@3mail.com"
].forEach(function(item) {
    console.log(checkEmail(item));
});


//Task 7
function checkLogin(login) {
    let isValid = /^[a-z]([a-z0-9\.]){1,9}$/gi.test(login);
    let result = login.match(/(\d+(\.\d*)?)/gi);
    console.log(isValid, result);
}

[
    "ee1.1ret3", 
    "ee1*1ret3", 
    "1e1*1ret3", 
    "ee11$ret3", 
    "ee1.1ret3asdasd999", 
    "e"
].forEach(function(item) {
    checkLogin(item);
});
