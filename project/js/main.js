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
let removeBtns = document.querySelectorAll(".remove");


//IndexedDB
let db;
let dbReq = indexedDB.open("budgetDB", 1);
dbReq.onupgradeneeded = event => {
    db = event.target.result;
    let incomes = db.createObjectStore("incomes", {autoIncrement: true, keyPath: 'id'});
    let expenses = db.createObjectStore("expenses", {autoIncrement: true, keyPath: 'id'});

    if (!incomes.indexNames.contains('id')) {
        incomes.createIndex('id', 'id');
    }
    if (!expenses.indexNames.contains('id')) {
        expenses.createIndex('id', 'id');
    }
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
    let item = {title, category, sum, id: Date.now()};
    store.add(item);
}
//IndexedDB


const countBalance = () => {
    let budgetContainer = document.querySelector("#final-budget-value");
    if(appData.incomes.length > 0) {
        appData.totalIncome = appData.incomes.reduce((a, b) => a + +b.sum, 0);
    }
    if(appData.expenses.length > 0) {
        appData.totalExpenses = appData.expenses.reduce((a, b) => a + +b.sum, 0);
    }
    appData.balance = appData.totalIncome - appData.totalExpenses;
    budgetContainer.innerHTML = appData.balance;
}

const getData = (branch) => {
    let tx = db.transaction([branch], "readonly");
    let store = tx.objectStore(branch);

    let req = store.openCursor();
    let data = [];

    req.onsuccess = event => {
        let cursor = event.target.result;
        if(cursor != null) {
            data = [...data, cursor.value];
            cursor.continue();
        } else {
            switch(branch) {
                case "incomes":
                    appData.incomes = [...data];
                    countBalance();
                    renderIncomes(appData.incomes);
                    break;
                case "expenses":
                    appData.expenses = [...data]
                    countBalance();
                    renderExpenses(appData.expenses);
                    fillReport();
                    renderReport();
                    break;
                default:
                    alert("Something went wrong!!!");
            }
        }
    }
}

const renderIncomes = (data) => {
    let incomesContainer = document.querySelector("#incomes-container");
    let totalIncome = document.querySelector("#total-income");
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
                <i class="fas fa-times remove" onclick="removeDataItem(event)" data-id="${appData.incomes[i].id}" data-branch="incomes"></i>
            </div>
        `);
        incomesContainer.appendChild(element);
    }
    totalIncome.innerHTML = appData.totalIncome;
}

const renderExpenses = () => {
    let expensesContainer = document.querySelector("#expenses-container");
    let totalExpenses = document.querySelector("#total-expenses");
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
                <i class="fas fa-times remove" onclick="removeDataItem(event)" data-id="${appData.expenses[i].id}" data-branch="expenses"></i>
            </div>
        `);
        expensesContainer.appendChild(element);
    }
    totalExpenses.innerHTML = appData.totalExpenses;
}

const fillReport = () => {
    let categoryList = appData.expenses.map(item => item.category);
    let categories = [...new Set(categoryList)];
    
    appData.report = [];
    for(let i = 0; i < categories.length; i++) {
        let data = appData.expenses.filter(item => item.category == categories[i]).reduce((a, b) => a + b.sum, 0);
        appData.report = [...appData.report, {title: categories[i].toUpperCase(), percent: Math.round(data / appData.totalExpenses * 100), sum: data}]
    }
}

const renderReport = () => {
    let reportContainer = document.querySelector("#report-body");
    reportContainer.innerHTML = "";
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

const removeDataItem = (event) => {
    let idValue = +event.target.getAttribute("data-id");
    let branchValue = event.target.getAttribute("data-branch");

    const tx = db.transaction([branchValue], "readwrite");
    tx.oncomplete = event => {
        getData(branchValue);
    }
    tx.onerror = event => {
        alert(event.target.errorCode);
    }

    const store = tx.objectStore(branchValue);
    const index = store.index("id");

    const req = index.getKey(idValue);
    req.onsuccess = event => {
        const key = req.result;
        let removeReq = store.delete(key);
        removeReq.onsuccess = event => {
            countBalance();
        }
    }
}

const isValidData = (title, sum) => {
    let titleValue = /^(?! *$)[a-zA-Z0-9.+ '-]+$/.test(title.value);
    let sumValue = /\d/.test(sum.value);
    if(titleValue === false) {
        title.previousElementSibling.style.display = "block";
    }
    if(sumValue === false) {
        sum.previousElementSibling.style.display = "block";
    }
    if(titleValue && sumValue) {
        title.previousElementSibling.style.display = "none";
        sum.previousElementSibling.style.display = "none";
    }
    return titleValue && sumValue;
}

window.addEventListener("load", () => {
    getData("incomes");
    getData("expenses");
});

addIncomeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let incomeName = document.querySelector("#income-name");
    let incomeSum = document.querySelector("#income-sum");
    let isDataValid = isValidData(incomeName, incomeSum);
    if(isDataValid === false) {
        return;
    }
    addDBObjectItem(db, e.target.dataset.dbbranch, incomeName.value, +incomeSum.value);
    incomeName.value = "";
    incomeSum.value = "";
    getData(e.target.dataset.dbbranch);
});

addExpenseBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let expenseName = document.querySelector("#expense-name");
    let expenseSum = document.querySelector("#expense-sum");
    let expenseCategory = document.querySelector("#expense-category");
    let isDataValid = isValidData(expenseName, expenseSum);
    if(isDataValid === false) {
        return;
    }
    addDBObjectItem(db, e.target.dataset.dbbranch, expenseName.value, +expenseSum.value, expenseCategory.value);
    expenseName.value = "";
    expenseSum.value = "";
    getData(e.target.dataset.dbbranch);
});

removeBtns.forEach(item => item.addEventListener("click", alert("Remove")));
