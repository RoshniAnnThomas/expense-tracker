console.log("JS connected");
let expenses = [];

// Add Expense
document.getElementById("add-btn").addEventListener("click", function () {
    let item = document.getElementById("item").value;
    let amount = document.getElementById("amount").value;
    let category = document.getElementById("category").value;

    if (item === "" || amount === "" || category === "") {
        alert("Please fill all fields");
        return;
    }

    let expense = {
        item: item,
        amount: Number(amount),
        category: category
    };

    expenses.push(expense);
    displayExpenses();
    saveData();

    document.getElementById("item").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("category").value = "";
});

// Display Expenses
function displayExpenses() {
    let tableBody = document.querySelector("#expense-table tbody");
    tableBody.innerHTML = "";
    updateTotal();

    let filteredExpenses = expenses;

    // Apply category filter
    let selectedCategory = document.getElementById("filter-category").value;
    if (selectedCategory !== "All") {
        filteredExpenses = filteredExpenses.filter(exp => exp.category === selectedCategory);
    }

    // Apply search filter
    let searchText = document.getElementById("search").value.toLowerCase();
    if (searchText !== "") {
        filteredExpenses = filteredExpenses.filter(exp =>
            exp.item.toLowerCase().includes(searchText)
        );
    }

    filteredExpenses.forEach((exp, index) => {
        let row = `
            <tr>
                <td>${exp.item}</td>
                <td>₹${exp.amount}</td>
                <td>${exp.category}</td>
                <td>
                   <button class="delete-btn" onclick="deleteExpense(${index})">Delete</button>
                   <button class="edit-btn" onclick="editExpense(${index})">Edit</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// Delete
function deleteExpense(index) {
    expenses.splice(index, 1);
    displayExpenses();
    saveData();
}

// Edit
function editExpense(index) {
    let exp = expenses[index];

    document.getElementById("item").value = exp.item;
    document.getElementById("amount").value = exp.amount;
    document.getElementById("category").value = exp.category;

    deleteExpense(index);
}

// Total
function updateTotal() {
    let sum = 0;
    expenses.forEach(e => sum += e.amount);
    document.getElementById("total").innerText = `Total: ₹${sum}`;
}

// Save
function saveData() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

// Load
function loadData() {
    let data = localStorage.getItem("expenses");
    if (data) {
        expenses = JSON.parse(data);
        displayExpenses();
    }
}
loadData();

// Filter Events
document.getElementById("filter-category").addEventListener("change", function () {
    displayExpenses();
});

// Search Events
document.getElementById("search").addEventListener("input", function () {
    displayExpenses();
});

// Sort by amount
document.getElementById("sort-amount").addEventListener("click", function () {
    expenses.sort((a, b) => a.amount - b.amount);
    displayExpenses();
    saveData();
});
