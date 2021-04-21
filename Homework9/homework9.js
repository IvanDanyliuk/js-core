//Task 1
let arr = ["Tom", "Sam", "Ray", "Bob"];
let [x, y, , ...z] = arr;

console.log(x); // "Tom"
console.log(y); // "Sam"
console.log(z); // [Bob]


//Task 2
let data = {
    names: ["Sam", "Tom", "Ray", "Bob"],
    ages: [20, 24, 22, 26],
};

let {
    names: [, name2],
    ages: [, age2],
    names: [, , , name4],
    ages: [, , , age4]
} = data;

console.log(name2); // "Tom"
console.log(age2); // 24
console.log(name4); // "Bob"
console.log(age4); // 26


//Task 3
const mul = (...params) => {
    let result = [...params].filter(item => typeof item === 'number');
    return result.length !== 0 ? result.reduce((a, b) => a * b) : 0;
}

console.log(mul(1, "str", 2, 3, true));
console.log(mul(null, "str", false, true));


//Task 4
let server = {
    data: 0,
    convertToString(callback) {
        callback((() => this.data + ""));
    }
};
let client = {
    server: server,
    result: "",
    calc(data) {
        this.server.data = data;
        this.server.convertToString(this.notification());
    },
    notification() {
        return (callback) => this.result = callback();
    }
};

client.calc(123);
console.log(client.result); // "123"
console.log(typeof client.result); // "string"
 

//Task 5
const mapBuilder = (keysArray, valuesArrays) => {
    const myMap = new Map();
    for(let i = 0; i < keysArray.length; i++) {
        myMap.set(keysArray[i], valuesArrays[i])
    }
    return myMap;
}

let keys = [1, 2, 3, 4];
let values = ["div", "span", "b", "i"];
let map = mapBuilder(keys, values);
console.log(map.size); // 4
console.log(map.get(2)); // "span"
