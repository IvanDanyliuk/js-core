function showHeaderGreeting() {
    let time = new Date().getHours();
    let greetImageContainer = document.querySelector("#greeting__image");
    time > 5 && time < 17 ? greetImageContainer.classList.add("fa-sun") : greetImageContainer.classList.add("fa-moon");
    switch(true) {
        case time >= 23 && time <= 24 || time >= 0 && time < 5:
            return "Good night!";
        case time >= 5 && time < 11:
            return "Good morning!";
        case time >= 11 && time < 17:
            return "Good afternoon!";
        case time >= 17 && time < 23:
            return "Good evening!";
        default:
            return "Hm... Somthing wrong!";
    }
}

function getCurrentDate() {
    let currentDate = new Date();
    let day = currentDate.getDate();
    let month = currentDate.getMonth() + 1;
    let year = currentDate.getFullYear();
    day < 10 ? day = "0" + day : day;
    month < 10 ? month = "0" + month : month;
    return `${day}.${month}.${year}`;
}

window.addEventListener("load", function() {
    let dateContainer = document.querySelector("#header-date");
    let greetContainer = document.querySelector("#header-greeting");
    dateContainer.innerHTML = getCurrentDate();
    greetContainer.innerHTML = showHeaderGreeting();
});