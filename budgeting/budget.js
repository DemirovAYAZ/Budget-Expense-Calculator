const calculate = document.querySelectorAll(".calculate");
const valueOfBudget = document.getElementById("value-of-budget");
const valueOfExpense = document.getElementById("value-of-expense");
const budget = document.getElementById("budget");
const expense = document.getElementById("expense");
const balance = document.getElementById("balance");
const expensesUl = document.getElementById("expenses-ul");
const createExpense = document.getElementById("create-expense");
const expensesArray = [];
let selectedExpenseIndex = null;

expensesUl.addEventListener("click", function (e) {
  const targetElement = e.target;
  if (targetElement.classList.contains("remove-btn")) {
    const listItem = targetElement.closest("li");
    const index = Array.from(expensesUl.children).indexOf(listItem);
    expensesArray.splice(index, 1);
    listItem.remove();
    writeBalance();
  } else if (targetElement.classList.contains("edit-btn")) {
    const listItem = targetElement.closest("li");
    selectedExpenseIndex = Array.from(expensesUl.children).indexOf(listItem);
    const expenseInArray = expensesArray[selectedExpenseIndex];
    document.getElementById("expense-title").value = expenseInArray.expenseTitle;
    valueOfExpense.value = expenseInArray.expenseValue.toFixed(2);
  }
});

valueOfBudget.addEventListener("input", maxInputLength);
valueOfExpense.addEventListener("input", maxInputLength);
calculate.forEach(button => button.addEventListener("click", writeValues));
createExpense.addEventListener("click", addExpenseToList);

function maxInputLength() {
  const maxLength = 9;
  if (valueOfBudget.value.length > maxLength) {
    valueOfBudget.value = valueOfBudget.value.slice(0, maxLength);
  }
  if (valueOfExpense.value.length > maxLength) {
    valueOfExpense.value = valueOfExpense.value.slice(0, maxLength);
  }
}

function writeBalance() {
  const budgetValue = parseFloat(budget.innerHTML);
  const totalExpenses = calculateTotalExpenses();
  const balanceValue = budgetValue - totalExpenses;
  expense.innerHTML = totalExpenses.toFixed(2);
  balance.innerHTML = balanceValue.toFixed(2);
}

function addExpenseToList() {
  const expenseTitle = document.getElementById("expense-title").value;
  const expenseValue = valueOfExpense.value;

  const expenseObject = {
    expenseTitle: expenseTitle === '' ? 'Not Mentioned' : expenseTitle,
    expenseValue: valueOfExpense.value === '' ? 0 : parseFloat(expenseValue)
  };

  if (selectedExpenseIndex !== null) {
    expensesArray[selectedExpenseIndex] = expenseObject;
    selectedExpenseIndex = null;
  } else {
    expensesArray.push(expenseObject);
  }

  updateExpensesList();
  writeBalance();
  clearExpenseInputs();
}

function updateExpensesList() {
  expensesUl.innerHTML = '';

  expensesArray.forEach((exp) => {
    const expensesLi = document.createElement('li');
    expensesLi.classList.add("expenses-li");

    expensesLi.innerHTML = `
      <div class="expense-title"><h4 class="red-color">- ${exp.expenseTitle}</h4></div>
      <div class="expense-value"><h4 class="red-color">${exp.expenseValue.toFixed(2)}</h4></div>
      <div class="crud">
        <p class="blue-color"><i class="fa-solid fa-pen-to-square edit-btn"></i></p>
        <p class="red-color"><i class="fa-solid fa-trash remove-btn"></i></p>
      </div>
    `;
    expensesUl.appendChild(expensesLi);
  });
}  
function calculateTotalExpenses() {
  let totalExpenses = 0;

  expensesArray.forEach(exp => {
    totalExpenses += exp.expenseValue;
  });

  return totalExpenses;
}

function clearExpenseInputs() {
  document.getElementById("expense-title").value = '';
  valueOfExpense.value = '';
}

function writeValues() {
  const budgetValue = valueOfBudget.value === '' ? 0 : parseFloat(valueOfBudget.value);
  budget.innerHTML = budgetValue.toFixed(2);
  writeBalance();
}
