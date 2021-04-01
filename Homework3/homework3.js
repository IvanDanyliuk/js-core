//Task 1
let arr = [2, 3, 4, 5];

let result = 1;
for(let i = 0; i < arr.length; i++) {
    result *= arr[i];
}

let res = 1;
let counter = 0;
while(counter < arr.length) {
    res *= arr[counter];
    counter++;
}


//Task 2
for(let i = 0; i <= 15; i++) {
    if(i % 2 === 0) {
        console.log(i + " is even")
    } else {
        console.log(i + " is odd")
    }
}


//Task 3
function randArray(k) {
    let arr = [];
    for(let i = 0; i < k; i++) {
        let number = Math.floor(Math.random() * 500) + 1;
        arr.push(number);
    }
    console.log(arr);
}
randArray(5);


//Task 4
let number = +prompt("Enter the integer", "");
let degree = +prompt("Enter the degree", "");

function raiseToDegree(a, b) {
    if(Number.isInteger(a) && Number.isInteger(b)) {
        console.log(a ** b);
    } else {
        console.log("Your values should be an integer!");
    }
}

raiseToDegree(number, degree);


//Task 5
function findMin() {
    let args = [];
    for(let i = 0; i < arguments.length; i++) {
        args.push(arguments[i]);
    }
    return Math.min.apply(null, args);
}

console.log(findMin(12, 14, 4, -4, 0.2));


//Task 6
function findUnique(arr) {
    let sortedArr = arr.sort(function(a, b) {
        return a - b;
    });
    for(let i = 0; i < sortedArr.length - 1; i++) {
        if(sortedArr[i] === sortedArr[i + 1]) {
            return false
        }
    }
    return true;
}

console.log(findUnique([1, 2, 3, 5, 3]));
console.log(findUnique([1, 2, 3, 5, 11]));


//Task 7
function getLastElement(arr, num = 1) {
    if(arr.length > num) {
        return arr.slice(arr.length - num, arr.length);
    } else {
        return arr;
    }
}

console.log(getLastElement([3, 4, 10, -5]));
console.log(getLastElement([3, 4, 10, -5], 2));
console.log(getLastElement([3, 4, 10, -5], 8));


//Task 8
function makeUpperCase(str) {
    return str
            .split(' ')
            .map(function(substr) {
                return substr = substr[0].toUpperCase() + substr.slice(1, substr.length);
            })
            .join(' ');
}

console.log(makeUpperCase('i love java script'));
