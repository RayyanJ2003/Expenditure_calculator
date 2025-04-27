$(document).ready(function () {
    const $balance = $("#balance");
    const $moneyPlus = $("#plus");
    const $moneyMinus = $("#minus");
    const $text = $("#text");
    const $amount = $("#amount");

    const $incomeBtn = $("#income-btn");
    const $expenseBtn = $("#expense-btn");

    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

    // Add Transaction Function
    function addTransaction(type) {
        if ($.trim($text.val()) === "" || $.trim($amount.val()) === "") {
            alert("Please enter both transaction name and amount.");
            return;
        }

        const transaction = {
            id: generateId(),
            text: $text.val(),
            amount: type === "income" ? +$amount.val() : -Math.abs($amount.val())
        };

        transactions.push(transaction);
        updateLocalStorage();
        updateValues();
        displayHistory();

        $text.val("");
        $amount.val("");
    }

    // Update Balance, Income, and Expense
    function updateValues() {
        const amounts = transactions.map(transaction => transaction.amount);
        const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);
        const income = amounts.filter(item => item > 0).reduce((acc, item) => acc + item, 0).toFixed(2);
        const expense = (
            amounts.filter(item => item < 0).reduce((acc, item) => acc + item, 0) * -1
        ).toFixed(2);

        $balance.text(`Rs. ${total}`);
        $moneyPlus.text(`Rs. ${income}`);
        $moneyMinus.text(`Rs. ${expense}`);
    }

    // Generate Random ID
    function generateId() {
        return Math.floor(Math.random() * 100000000);
    }

    // Update Local Storage
    function updateLocalStorage() {
        localStorage.setItem("transactions", JSON.stringify(transactions));
    }

    // Initialize App
    function init() {
        updateValues();
        displayHistory();
    }

    // Add Transaction Events
    $incomeBtn.on("click", (e) => {
        e.preventDefault();
        addTransaction("income");
    });

    $expenseBtn.on("click", (e) => {
        e.preventDefault();
        addTransaction("expense");
    });

    init();
});
