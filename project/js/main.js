const appData = {
    incomes: [],
    expenses: [],
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
    report: []
};

//Validation
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
};


//Validation

let addIncomeBtn = document.querySelector("#add-income");
let addExpenseBtn = document.querySelector("#add-expense");
let removeBtns = document.querySelectorAll(".remove");
let sortBtn = document.querySelector("#sort-data");

let incomesContainer = document.querySelector("#incomes-container");
let totalIncome = document.querySelector("#total-income");
let expensesContainer = document.querySelector("#expenses-container");
let totalExpenses = document.querySelector("#total-expenses");

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
};
dbReq.onsuccess = event => {
    db = event.target.result;
};
dbReq.onerror = event => {
    console.log("Error of opening database" + event.target.errorCode);
};

const addDBObjectItem = (db, dbObject, title, sum, category = "incomes") => {
    let tx = db.transaction([dbObject], "readwrite");
    let store = tx.objectStore(dbObject);
    let item = {title, category, sum, id: Date.now()};
    store.add(item);
};
//IndexedDB

const setExpenseIcon = (type) => {
    switch(type) {
        case 'home':
            return 'fa-home';
        case 'transport':
            return 'fa-bus';
        case 'food':
            return 'fa-pizza-slice';
        case 'sport':
            return 'fa-dumbbell';
        case 'rest':
            return 'fa-plane-departure';
        case 'health':
            return 'fa-first-aid';
        case 'clothes':
            return 'fa-tshirt';
        case 'other':
            return 'fa-dollar-sign';
        default:
            return 'fa-question';
    }
};

const countBalance = () => {
    let budgetContainer = document.querySelector("#final-budget-value");
    if(appData.incomes.length > 0) {
        appData.totalIncome = appData.incomes.reduce((a, b) => a + (+b.sum), 0);
    } else {
        appData.totalIncome = 0;
    }
    if(appData.expenses.length > 0) {
        appData.totalExpenses = appData.expenses.reduce((a, b) => a + (+b.sum), 0);
    } else {
        appData.totalExpenses = 0;
    }
    appData.balance = appData.totalIncome - appData.totalExpenses;
    budgetContainer.innerHTML = appData.balance;
};

const getData = (container, total, branch) => {
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
            appData[branch] = [...data];
            countBalance();
            if(branch === "incomes") {
                renderData(container, total, branch);
            } else {
                renderData(container, total, branch);
                fillReport();
                renderReport();
            }
        }
    };
};

const renderData = (dataContainer, totalDataValue, branch) => {
    if(appData[branch].length > 0) {
        dataContainer.innerHTML = "";
        for(let i = 0; i < appData[branch].length; i++) {
            let element = document.createElement("li");
            element.className = "item expense-item";
            element.innerHTML = (`
                <div class="item-body">
                    <div class="item-body__title">${appData[branch][i].title}</div>
                    ${branch === "expenses" ? (
                        `<div class="item-body__category">
                            <i class="fas ${setExpenseIcon(appData[branch][i].category)}"></i>
                        </div>`
                    ) : ''}
                    <div class="item-body__value">${appData[branch][i].sum}</div>
                </div>
                <div class="close-btn">
                    <i class="fas fa-times remove" onclick="removeDataItem(event)" data-id="${appData[branch][i].id}" data-branch="${branch}"></i>
                </div>
            `);
            dataContainer.appendChild(element);
        }
        totalDataValue.innerHTML = branch === "incomes" ? appData.totalIncome : appData.totalExpenses;
    } else {
        totalDataValue.innerHTML = 0;
        dataContainer.innerHTML = (`
            <div class="item-message">Your ${branch} list is empty${branch === "incomes" ? "&#x1F641" : "&#x1F642;"}</div>
        `);
    }
    
    
};

const fillReport = () => {
    let categoryList = appData.expenses.map(item => item.category);
    let categories = [...new Set(categoryList)];
    
    appData.report = [];
    for(let i = 0; i < categories.length; i++) {
        let data = appData.expenses.filter(item => item.category == categories[i]).reduce((a, b) => a + b.sum, 0);
        appData.report = [...appData.report, {title: categories[i].toUpperCase(), percent: Math.round(data / appData.totalExpenses * 100), sum: data}];
    }
};

const renderReport = () => {
    let reportContainer = document.querySelector("#report-body");
    if(appData.expenses.length > 0) {
        reportContainer.innerHTML = "";
        for(let i = 0; i < appData.report.length; i++) {
            let element = document.createElement("li");
            element.className = "report-item";
            element.innerHTML = (`
                <div class="report-item__title">
                    <i class="fas ${setExpenseIcon(appData.report[i].title.toLowerCase())}"></i>
                    <span>${appData.report[i].title}</span>
                </div>
                <div class="report-item__percent">${appData.report[i].percent}%</div>
                <div class="report-item__value">${appData.report[i].sum}</div>
            `);
            reportContainer.appendChild(element);
        }
    } else {
        reportContainer.innerHTML = "<div class='empty-report-message'>Your expenses list is empty!</div>"
    }
};

const removeDataItem = (event) => {
    let idValue = +event.target.getAttribute("data-id");
    let branchValue = event.target.getAttribute("data-branch");

    const tx = db.transaction([branchValue], "readwrite");
    tx.oncomplete = event => {
        if(branchValue === "incomes") {
            getData(incomesContainer, totalIncome, branchValue);
        } else {
            getData(expensesContainer, totalExpenses, branchValue);
        }
    };
    tx.onerror = event => {
        alert(event.target.errorCode);
    };

    const store = tx.objectStore(branchValue);
    const index = store.index("id");

    const req = index.getKey(idValue);
    req.onsuccess = event => {
        const key = req.result;
        let removeReq = store.delete(key);
        removeReq.onsuccess = event => {
            countBalance();
        };
    };
};

const sortReportData = () => {
    appData.report.sort((a, b) => b.sum - a.sum);
}

window.addEventListener("load", () => {
    getData(incomesContainer, totalIncome, "incomes");
    getData(expensesContainer, totalExpenses, "expenses");
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
    getData(incomesContainer, totalIncome, e.target.dataset.dbbranch);
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
    getData(expensesContainer, totalExpenses, e.target.dataset.dbbranch);
});

// removeBtns.forEach(item => item.addEventListener("click", alert("Remove")));

sortBtn.addEventListener("click", (e) => {
    e.preventDefault();
    sortReportData();
    renderReport();
})


//Currency Exchange
const convertCurrency = () => {
    let fromCurrency = document.querySelector("#from-currency");
    let toCurrency = document.querySelector("#to-currency");
    let currencySum = document.querySelector("#currency-sum");
    let resultContainer = document.querySelector("#currency-result");
    
    if(fromCurrency.value !== toCurrency.value) {
        fetch(`https://fcsapi.com/api-v3/forex/latest?symbol=${fromCurrency.value}/${toCurrency.value}&access_key=dHHeQmYDhbEYF2jHfrgE`, {method: 'GET'})
        .then(response => {
            return response.json();
        }).then(response => {
            let result = +currencySum.value * +response.response[0].c;
            resultContainer.innerHTML = (`
                <div class="from-data">${currencySum.value} ${fromCurrency.value.toUpperCase()} =</div>
                <div class="toData">${result.toFixed(2)} ${toCurrency.value.toUpperCase()}</div>
                <div class="exchange-result__rates">
                    <div>1 ${fromCurrency.value.toUpperCase()} = ${Number(response.response[0].c).toFixed(4)} ${toCurrency.value.toUpperCase()}</div>
                    <div>1 ${toCurrency.value.toUpperCase()} = ${Number(currencySum.value / result).toFixed(4)} ${fromCurrency.value.toUpperCase()}</div>
                </div>
            `);
            currencySum.value = "";
            
        });
    } else {
        alert("You cannot conver the same currencies!");
    }
};

const convertBtn = document.querySelector("#convert");
convertBtn.addEventListener("click", event => {
    event.preventDefault();
    convertCurrency();
});


