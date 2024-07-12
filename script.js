const display = document.querySelector('.display');
const operationSign = document.querySelector('.operation-sign');
const buttons = document.querySelectorAll('.btn');
const displayContainer = document.querySelector('.display-container');
let currentValue = '';
let prevValue = '';
let operator = null;

// Event listener for button clicks
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.dataset.value;

        if (!isNaN(value) || value === '.') {
            handleNumber(value);
        } else if (value === 'C') {
            clearAll();
        } else if (value === '=') {
            calculate();
        } else {
            handleOperator(value);
        }
    });
});

// Event listener for keyboard input
document.addEventListener('keydown', (event) => {
    const key = event.key;

    if (!isNaN(key) || key === '.') {
        handleNumber(key);
    } else if (key === 'C' || key === 'Escape') {
        clearAll();
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (['+', '-', '*', '/'].includes(key)) {
        handleOperator(key);
    }
});

function handleNumber(value) {
    if (currentValue.length <= 10) {
        currentValue += value;
        display.value = currentValue;
        animateDisplayContainer();
    }
}

function handleOperator(value) {
    if (!operator) {
        prevValue = currentValue;
        operator = value;
        currentValue = '';
        operationSign.textContent = value;
    } else {
        calculate();
        operator = value;
        operationSign.textContent = value;
    }
}

function clearAll() {
    currentValue = '0';
    prevValue = '';
    operator = null;
    display.value = currentValue;
    operationSign.textContent = '';
    animateDisplayContainer();
}

function clear_calc() {
    currentValue = '0';
    prevValue = '';
    operator = null;
    display.value = 0;
    operationSign.textContent = '';
    animateDisplayContainer();
}

function calculate() {
    let result;
    const prev = parseFloat(prevValue);
    const current = parseFloat(currentValue);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case '+':
            // let ss  = Number(prev);
            // console.log(ss);
            result = prev+ current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                display.value = 'Error: Division by zero';
                clearAll();
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }

    currentValue = result.toString();
    // currentValue = result;
    display.value = currentValue;
    prevValue = '';
    operator = null;
    operationSign.textContent = '';
    animateDisplayContainer();
}

function animateDisplayContainer() {
    displayContainer.style.backgroundColor = '#e6e6e6';
    setTimeout(() => {
        displayContainer.style.backgroundColor = '#e0e0e0';
    }, 300);
}