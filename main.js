const display = document.querySelector("#display");
const numberButtons = document.querySelectorAll(".numberButton") 

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