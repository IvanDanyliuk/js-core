
module.exports.greetUser = name => {
    let currentTime = new Date();
    let time = currentTime.getHours();
    switch(true) {
        case time >= 23 && time <= 24 || time >= 0 && time < 5:
            return (`<div>Date of request: ${currentTime}</div>
                    <div>Good night, ${name}</div>`);
        case time >= 5 && time < 11:
            return (`<div>Date of request: ${currentTime}</div>
                    <div>Good morning, ${name}</div>`);
        case time >= 11 && time < 17:
            return (`<div>Date of request: ${currentTime}</div>
                    <div>Good afternoon, ${name}</div>`);
        case time >= 17 && time < 23:
            return (`<div>Date of request: ${currentTime}</div>
                    <div>Good evening, ${name}</div>`);
        default:
            return `<div>Time has an incorrect value!</div>`;
    }
}