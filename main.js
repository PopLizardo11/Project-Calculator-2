const display = document.querySelector("#display");
const numberButtons = document.querySelectorAll(".numberButton");
const clearButton = document.querySelector("#clearButton");

let firstNum;
let operator;
let nextNum; 

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

numberButtons.forEach((node) => node.addEventListener("click", () => {
    if (display.textContent !== "") {
        display.textContent += node.textContent;
    } else {
        display.textContent = node.textContent;    
    }
}))

clearButton.addEventListener("click", () => display.textContent = "")