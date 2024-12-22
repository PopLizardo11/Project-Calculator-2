const display = document.querySelector("#display");
const numberButtons = document.querySelectorAll(".numberButton");
const opButtons = document.querySelectorAll(".opButton");
const clearButton = document.querySelector("#clearButton");

let firstNum = 0;
let operator = "+";
let nextNum = false; 
let toNext = false;
let isEmpty = true;

function add(a, b) {
    return a + b
}

function subtract(a, b) {
    return a - b
}

function multiply(a, b) {
    return a * b
}

function divide(a, b) {
    return a / b
}

function operate(x, y, op){
    switch (op) {
        case "+":
            return add(x,y)
        case "-":
            return subtract(x,y)
        case "*":
            return multiply(x,y)
        case "/":
            return divide(x,y)
    }
}

function populateDis(button) {
    if (!isEmpty) {
        display.textContent += button.textContent;
    } else {
        display.textContent = button.textContent;
        isEmpty = false;   
    }
}

numberButtons.forEach((btn) => btn.addEventListener("click", () => {
    populateDis(btn)

    if (toNext) {
        nextNum = parseFloat(display.textContent);
        console.log(`${firstNum}, ${nextNum}`)
    } else {
        firstNum = parseFloat(display.textContent);
        console.log(`${firstNum}, ${nextNum}`)
    } 
}))

opButtons.forEach((btn) => btn.addEventListener("click", ()=> {
    operator = btn.getAttribute("data-key")
    display.textContent = "";
    toNext = true;

    if (nextNum === false) {
        return
    }
    if (nextNum === 0 && operator === "/") {
        alert("Dividing by zero is not advised")
        return
    }

    let opResult = operate(firstNum, nextNum, operator);
    firstNum, nextNum = opResult, false;
    alert(opResult)
}))

equalButton.addEventListener("click", () => {})

clearButton.addEventListener("click", () => {
    display.textContent = ""
    firstNum = 0;
    operator = "+";
    nextNum = 0;
});