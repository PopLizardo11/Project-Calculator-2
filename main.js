const display = document.querySelector("#display");
const numberButtons = document.querySelectorAll(".numberButton");
const opButtons = document.querySelectorAll(".opButton");
const clearButton = document.querySelector("#clearButton");

let firstNum = 0;
let operator = "+";
let nextNum = false; 
let toNext = false;

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

numberButtons.forEach((btn) => btn.addEventListener("click", () => {
    if (display.textContent !== "") {
        display.textContent += btn.textContent;
    } else {
        display.textContent = btn.textContent;   
    }

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
    display.textContent = ""
    toNext = true;
    if (nextNum === false) {
        return
    }
    if (nextNum === 0 && operator === "/") {
        alert("Dividing by zero is not advised")
        return
    }
    alert(operate(firstNum, nextNum, operator))
}))

equalButton.addEventListener("click", () => {})

clearButton.addEventListener("click", () => {
    display.textContent = ""
    firstNum = 0;
    operator = "+";
    nextNum = 0;
});