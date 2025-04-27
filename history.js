$(document).ready(function () {
    const $historyList = $("#history-list");
    const $resetBtn = $("#reset-btn");

    // Display Transactions from Local Storage
    function displayHistory() {
        const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
        $historyList.empty();

        if (transactions.length === 0) {
            $historyList.html("<p>No transactions found!</p>");
            return;
        }

        transactions.forEach((transaction) => {
            const item = $(`
                <li class="${transaction.amount < 0 ? "minus" : "plus"}">
                    ${transaction.text}: ₹ ${Math.abs(transaction.amount)} 
                    <button class="delete-btn" data-id="${transaction.id}">X</button>
                </li>
            `);
            $historyList.append(item);
        });
    }

    // Delete a Single Transaction
    $historyList.on("click", ".delete-btn", function () {
        const id = parseInt($(this).data("id"));
        let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
        transactions = transactions.filter(transaction => transaction.id !== id);
        localStorage.setItem("transactions", JSON.stringify(transactions));
        displayHistory();
        updateValues();  // Ensure balance updates after deletion
    });

    // Reset Button Click Event
    $resetBtn.on("click", function () {
        if (confirm("Are you sure you want to clear all transactions?")) {
            localStorage.removeItem("transactions");
            displayHistory();
            updateValues();  // Ensure values reset to zero
        }
    });

    displayHistory();
});
