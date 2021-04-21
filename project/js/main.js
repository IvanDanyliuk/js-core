const appData = {
    incomes: [],
    expenses: [],
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
    report: []
}

let incomeName = document.querySelector("#income-name");
let incomeSum = document.querySelector("#income-sum");
let addIncomeBtn = document.querySelector("#add-income");

let expenseName = document.querySelector("#expense-name");
let expenseSum = document.querySelector("#expense-sum");
let expenseCategory = document.querySelector("#expense-category");
let addExpenseBtn = document.querySelector("#add-expense");

let incomesContainer = document.querySelector("#incomes-container");
let expensesContainer = document.querySelector("#expenses-container");
let budgetContainer = document.querySelector("#final-budget-value");

const countTotalIncome = () => {
    if(appData.incomes.length > 0) {
        appData.totalIncome = appData.incomes.reduce((a, b) => a + +b.sum, 0);
    }
};

const countTotalExpenses = () => {
    if(appData.expenses.length > 0) {
        appData.totalExpenses = appData.expenses.reduce((a, b) => a + +b.sum, 0);
    }
}

const countBalance = () => {
    appData.balance = appData.totalIncome - appData.totalExpenses;
    budgetContainer.innerHTML = appData.balance;
}

const getData = () => {
    //Should get the app data from database and write it to the appData object
}



const renderIncomes = () => {
    incomesContainer.innerHTML = "";
    for(let i = 0; i < appData.incomes.length; i++) {
        let element = document.createElement("li");
        element.className = "item income-item";
        element.innerHTML = (`
            <div class="item-body">
                <div class="item-body__title">${appData.incomes[i].title}</div>
                <div class="item-body__value">${appData.incomes[i].sum}</div>
            </div>
            <div class="close-btn remove-income">
                <i class="fas fa-times"></i>
            </div>
        `);
        incomesContainer.appendChild(element);
    }
}

const renderExpenses = () => {
    expensesContainer.innerHTML = "";
    for(let i = 0; i < appData.expenses.length; i++) {
        let element = document.createElement("li");
        element.className = "item expense-item";
        element.innerHTML = (`
            <div class="item-body">
                <div class="item-body__title">${appData.expenses[i].title}</div>
                <div class="item-body__category">
                    <i class="fas fa-home"></i>
                </div>
                <div class="item-body__value">${appData.expenses[i].sum}</div>
            </div>
            <div class="close-btn">
                <i class="fas fa-times"></i>
            </div>
        `);
        expensesContainer.appendChild(element);
    }
}

const fillReport = () => {
    let categories = [];
    for(let i = 0; i < appData.expenses.length; i++) {
        categories = [...categories, appData.expenses[i].category]
    }
    let categoryList = [...new Set(categories)];

    for(let i = 0; i < categoryList.length; i++) {
        let data = appData.expenses.filter(item => item.category == categoryList[i]).reduce((a, b) => a + b);
        appData.report = [...appData.report, {title: categoryList[i], sum: data}]
        
    }
    console.log(categoryList);
}


addIncomeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let itemId = new Date().getTime();
    //This should be send to database
    appData.incomes = [...appData.incomes, {id: itemId,title: incomeName.value, sum: incomeSum.value}];
    //
    incomeName.value = "";
    incomeSum.value = "";
    countTotalIncome();
    countBalance();
    renderIncomes();
});

addExpenseBtn.addEventListener("click", (e) => {
    e.preventDefault();
    //This should be send to database
    appData.expenses = [...appData.expenses, {title: expenseName.value, category: expenseCategory.value, sum: expenseSum.value}];
    //
    expenseName.value = "";
    expenseSum.value = "";
    countTotalExpenses();
    countBalance();
    renderExpenses();
    fillReport();
});



