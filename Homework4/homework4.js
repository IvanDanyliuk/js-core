//Task 1
function calcRectangleArea(width, height) {
    if(isNaN(width * height)) {
        throw new Error("Width and height values must be numbers");
    } else if(width <= 0 || height <= 0) {
        throw new Error("Width and height values must be greater than 0");
    } else {
        return width * height;
    }
}

try {
    let rectWidth = +prompt("Enter width", "");
    let rectHeight = +prompt("Enter height", "");
    console.log(calcRectangleArea(rectWidth, rectHeight));
} catch(error) {
    console.error(error);
}


//Task 2
function checkAge() {
    let age = +prompt("Please enter your age", "");
    switch(true) {
        case age == "":
            throw new Error("The field is empty! Please enter your age");
        case !!isNaN(age):
            throw new Error("The age value must be a number!");
        case age < 14:
            throw new Error("You must be older than 14 y.o.");
        default:
            return "The age checking is over! Welcome!"
    }
}

try {
    let result = checkAge();
    console.log(result)
} catch(error) {
    console.error(error);
}


//Task 3
class MonthException {
    constructor(message) {
        this.name = "MonthException",
        this.message = message
    }
    showMessage() {
        console.error(this.name + " " + this.message)
    }
}

function showMonthName(month) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    if(!!isNaN(month) || month < 1 || month > 12) {
        throw new MonthException("Incorrect month number");
    }
    return months[month - 1];
}

const testValues = [5, 14, 1, 12, -1, "a"];
for(let i = 0; i < testValues.length; i++) {
    try {
        console.log(showMonthName(testValues[i]));
    } catch(error) {
        error.showMessage();
    }
}


//Task 4
function showUser(id) {
    if(id < 0) {
        throw new Error("ID must not be negative: " + id);
    } else {
        return {id};
    }
}

function showUsers(ids) {
    try {
        return ids.map(function(item) {
            showUser(item);
        });
    } catch(error) {
        console.error(error);
    } finally {
        return ids
                .filter(function(item) {
                    return item > 0        
                })
                .map(function(item) {
                    return showUser(item);
                });
    }
}

console.log(showUsers([7, -12, 44, 22]));