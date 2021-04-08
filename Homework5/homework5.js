//Task 1
let mentor = { 
    course: "JS fundamental", 
    duration: 3,
    direction: "web-development"
};

function propsCount(currentObject) {
    return Object.keys(currentObject).length;
}

console.log(propsCount(mentor));


//Task 2
const car = {
    brand: "Mazda",
    model: "CX-5",
    year: 2017,
    engine: 'SKYACTIVE 2.5',
    isAllWheelDrive: false
}

function showProps(obj) {
    let keys = Object.keys(obj);
    let values = [];
    for(let prop in obj) {
        values.push(obj[prop]);
    }
    console.log(keys, values);
}

showProps(car);


//Task 3
class Person {
    constructor(name, surname) {
        this.name = name;
        this.surname = surname;
    }
    showFullName() {
        return this.surname + " " + this.name;
    }
}

class Student extends Person {
    constructor(name, surname, year) {
        super(name, surname);
        this.year = year;
    }
    showFullName(middleName) {
        return super.showFullName() + " " + middleName;
    }
    showCourse() {
        let course = new Date().getFullYear() - this.year;
        if(course >= 1 && course <= 6) {
            return "Current course " + course;
        } else {
            return "Hm... It looks like you are not a student";
        }
    }
}

let student1 = new Student("Petro", "Petrenko", 2015);
console.log(student1.showFullName("Petrovych"))
console.log(student1.showCourse());

let student2 = new Student("Andriy", "Shevchenko", 2008);
console.log(student2.showFullName("Mykolayovych"))
console.log(student2.showCourse());


//Task 4
class Worker {
    #experience;
    constructor(fullName, dayRate, workingDays) {
        this.fullName = fullName;
        this.dayRate = dayRate;
        this.workingDays = workingDays;
        this.#experience = 1.2;
    }
    showSalary() {
        if(this.dayRate >= 0 && this.workingDays >= 0) {
            return this.dayRate * this.workingDays;
        } else {
            throw new Error("The day rate and working days should not be negative");
        }
    }
    showSalaryWithExperience() {
        return this.showSalary() * this.#experience;
    }
    get experience() {
        return this.#experience;
    }
    set experience(value) {
        if(typeof value === 'number' && value > 0) {
            this.#experience = value;
        } else {
            throw new Error("The experience value must be a positive number");
        }
    }
}

let worker1 = new Worker("John Johnson", 20, 23);
let worker2 = new Worker("Tom Tomson", 48, 22);
let worker3 = new Worker("Andy Ander", 29, 23);

function showWorkersInfo() {
    let workers = [];
    for(let i = 0; i < arguments.length; i++) {
        workers.push(arguments[i]);
    }
    workers.forEach(function(worker) {
        console.log(worker.fullName);
        console.log(worker.fullName + " salary: " + worker.showSalary());
        console.log("New experince " + worker.experience);
        console.log(worker.fullName + " salary: " + worker.showSalaryWithExperience());
        worker.experience = 1.5;
        console.log("New experince " + worker.experience);
        console.log(worker.fullName + " salary: " + worker.showSalaryWithExperience());
        console.log("\n")
    });
}
showWorkersInfo(worker1, worker2, worker3);

function showSalaryRating() {
    let salaryRating = [];
    for(let i = 0; i < arguments.length; i++) {
        salaryRating.push([arguments[i].fullName, arguments[i].showSalaryWithExperience()]);
    }
    return salaryRating
                    .sort(function(a, b) {
                        return a[1] - b[1];
                    })
                    .map(function(employee) {
                        return employee = employee.join(": ");
                    })
                    .join("\n")
}
console.log("Sorted salary:" + "\n" + showSalaryRating(worker1, worker2, worker3));


//Task 5
class GeometricFigure {
    getArea() {
        return 0;
    }
    toString() {
        return Object.getPrototypeOf(this).constructor.name;
    }
}

class Triangle extends GeometricFigure {
    constructor(side, height) {
        super();
        this.side = side;
        this.height = height;
    }
    getArea() {
        if(this.side > 0 && this.height > 0) {
            return 0.5 * this.side * this.height;
        } else {
            throw new Error("Side and height must be positive numbers");
        }
    }
};

class Square extends GeometricFigure {
    constructor(side) {
        super();
        this.side = side;
    }
    getArea() {
        if(this.side > 0) {
            return this.side ** 2;
        } else {
            throw new Error("Side must be a positive number");
        }
    }
};

class Circle extends GeometricFigure {
    constructor(radius) {
        super();
        this.radius = radius;
    }
    getArea() {
        if(this.radius > 0) {
            return Math.PI * Math.pow(this.radius, 2);
        } else {
            throw new Error("Radius must be a positive number");
        }
    }
};

function handleFigures(figures) {
    let result = [];
    let totalArea = figures
                        .map(function(item) {
                            return item.getArea();
                        })
                        .reduce(function(a, b) {
                            return a + b;
                        });
    figures.forEach(function(item) {
        if(item instanceof GeometricFigure) {
            result.push("Geometric figure: " + item.toString() + " - area: " + item.getArea());
        }
    })
    result.push("Total area: " + totalArea);
    return result.join("\n")
}

const figures = [new Triangle(4, 5), new Square(7), new Circle(5)];
console.log(handleFigures(figures));