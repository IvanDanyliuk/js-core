const appData = {
    incomes: [],
    expenses: [],
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
    report: []
}

let addIncomeBtn = document.querySelector("#add-income");
let addExpenseBtn = document.querySelector("#add-expense");

//IndexedDB
let db;
let dbReq = indexedDB.open("budgetDB", 1);
dbReq.onupgradeneeded = event => {
    db = event.target.result;
    let incomes = db.createObjectStore("incomes", {autoIncrement: true});
    let expenses = db.createObjectStore("expenses", {autoIncrement: true});
}
dbReq.onsuccess = event => {
    db = event.target.result;
}
dbReq.onerror = event => {
    console.log("Error of opening database" + event.target.errorCode);
}

const addDBObjectItem = (db, dbObject, title, sum, category = "incomes") => {
    let tx = db.transaction([dbObject], "readwrite");
    let store = tx.objectStore(dbObject);
    let item = {title, category, sum};
    store.add(item);
}
//IndexedDB


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
    let budgetContainer = document.querySelector("#final-budget-value");
    appData.balance = appData.totalIncome - appData.totalExpenses;
    budgetContainer.innerHTML = appData.balance;
}

const getIncomesData = () => {
    let txIncomes = db.transaction(["incomes"], "readonly");
    let storeIncomes = txIncomes.objectStore("incomes");

    let reqIncomes = storeIncomes.openCursor();
    let incomesData = [];
    
    reqIncomes.onsuccess = event => {
        let cursor = event.target.result;

        if(cursor != null) {
            incomesData.push(cursor.value);
            cursor.continue();
        } else {
            appData.incomes = [...incomesData];
            renderIncomes(appData.incomes);
            countTotalIncome();
            countBalance();
        } 
    }
}

const getExpensesData = () => {
    let txExpenses = db.transaction(["expenses"], "readonly");
    let storeExpenses = txExpenses.objectStore("expenses");

    let reqExpenses = storeExpenses.openCursor();
    let expensesData = [];

    reqExpenses.onsuccess = event => {
        let cursor = event.target.result;

        if(cursor != null) {
            expensesData.push(cursor.value)
            cursor.continue();
        } else {
            appData.expenses = [...expensesData]
            renderExpenses(appData.expenses);
            countTotalExpenses();
            countBalance();
            fillReport();
        }   
    }
}

const renderIncomes = (data) => {
    let incomesContainer = document.querySelector("#incomes-container");
    incomesContainer.innerHTML = "";
    for(let i = 0; i < data.length; i++) {
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
    let expensesContainer = document.querySelector("#expenses-container");
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
    let reportContainer = document.querySelector("#report-body");
    reportContainer.innerHTML = "";
    let categories = [];
    for(let i = 0; i < appData.expenses.length; i++) {
        categories = [...categories, appData.expenses[i].category]
    }
    let categoryList = [...new Set(categories)];

    for(let i = 0; i < categoryList.length; i++) {
        let data = appData.expenses.filter(item => item.category == categoryList[i]).reduce((a, b) => a + b.sum, 0);
        appData.report = [...appData.report, {title: categoryList[i].toUpperCase(), percent: Math.round(data / appData.totalExpenses * 100), sum: data}]
        
    }

    for(let i = 0; i < appData.report.length; i++) {
        let element = document.createElement("li");
        element.className = "report-item";
        element.innerHTML = (`
            <div class="report-item__title">
                <i class="fas fa-home"></i>
                <span>${appData.report[i].title}</span>
            </div>
            <div class="report-item__percent">${appData.report[i].percent}%</div>
            <div class="report-item__value">${appData.report[i].sum}</div>
        `);
        reportContainer.appendChild(element);
    }
}

window.addEventListener("load", () => {
    getIncomesData();
    getExpensesData();
});

addIncomeBtn.addEventListener("click", (e) => {
    e.preventDefault();

    let incomeName = document.querySelector("#income-name");
    let incomeSum = document.querySelector("#income-sum");
    addDBObjectItem(db, e.target.dataset.dbbranch, incomeName.value, +incomeSum.value);
    incomeName.value = "";
    incomeSum.value = "";
    getIncomesData();
    console.log()
});

addExpenseBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let expenseName = document.querySelector("#expense-name");
    let expenseSum = document.querySelector("#expense-sum");
    let expenseCategory = document.querySelector("#expense-category");
    addDBObjectItem(db, e.target.dataset.dbbranch, expenseName.value, +expenseSum.value, expenseCategory.value);
    expenseName.value = "";
    expenseSum.value = "";
    getExpensesData();
    fillReport();
});



