let gameData = {
    targetNumber: null,
    currentNumber: null,
    numberRange: [0, 5],
    prizeRange: [10, 5, 2],
    totalPrize: 0
};

function compareNumber() {
    gameData.targetNumber = Math.floor(Math.random() * (gameData.numberRange[1] - gameData.numberRange[0] + 1)) + gameData.numberRange[0];
    
    for(let i = 1; i <= 3; i++) {
        gameData.currentNumber = +prompt(
                        "Enter your number from " + gameData.numberRange[0] + " to " + gameData.numberRange[1] + "\n" +
                        "Attempts left: " + (4 - i) + "\n" +
                        "Total prize: " + gameData.totalPrize + "$" + "\n" +
                        "Possible prize on current attempt: " + gameData.prizeRange[i - 1] + "$", "");
        if(gameData.currentNumber === gameData.targetNumber) {
            gameData.totalPrize += gameData.prizeRange[i - 1];
            break;
        } 
    }
    
    if(gameData.currentNumber === gameData.targetNumber) {
        let isContinue = confirm("Do you want to continue the game?"); 
        if(isContinue) {
            gameData.numberRange = gameData.numberRange.map(function(item) {
                return item * 2;
            });
            gameData.prizeRange = gameData.prizeRange.map(function(item) {
                return item * 3;
            });
            compareNumber();
        } else {
            console.log("Thank you for a game. Your prize is: " + gameData.totalPrize);
            isGameActive = false;
        }
    } else {
        console.log("Thank you for a game. Your prize is: " + gameData.totalPrize);
        isGameActive = confirm("Do you want to play again?");
        if(isGameActive) {
            compareNumber();
        }
    }
    
}

let isGameActive = confirm("Do you want to play a game?");

if(isGameActive) {
    while(isGameActive) {
        compareNumber();
    }
} else {
    console.log("You did not become a millionaire");
}