const display = document.querySelector("#display");
const numberButtons = document.querySelectorAll(".numberButton");
const opButtons = document.querySelectorAll(".opButton");
const clearButton = document.querySelector("#clearButton");
const decButton = document.querySelector("#decButton");
const delButton = document.querySelector("#delButton");

let firstNum = 0;
let operator = false;
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
    if (!isEmpty && parseFloat(display.textContent) !== 0) {
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
    } else {
        firstNum = parseFloat(display.textContent);
    } 

    console.log(`${firstNum}, ${operator}, ${nextNum}, `)
}))

decButton.addEventListener("click", () => {
    populateDis(decButton)
    decButton.disabled = true;
})

delButton.addEventListener("click", () => {
    let oldDis = display.textContent
    let newDis = oldDis.split("")
    .splice(0, oldDis.length-1)
    .join("");
    display.textContent = newDis;

    if (display.textContent === "") {
        display.textContent = 0;
    }

    if (toNext) {
        nextNum = parseFloat(display.textContent);
    } else {
        firstNum = parseFloat(display.textContent);
    } 

    console.log(`${firstNum}, ${operator}, ${nextNum}, `)
})

opButtons.forEach((btn) => btn.addEventListener("click", ()=> {

    if (nextNum === 0 && operator === "/") {
        alert("Dividing by zero is not advised")
        return
    }

    if(operator) {
        let opResult = operate(firstNum, nextNum, operator);
        firstNum = Math.round(opResult * 100) / 100;
        nextNum = false;
        display.textContent = firstNum;
        isEmpty = true;
    }

    operator = btn.getAttribute("data-key")
    isEmpty = true;
    toNext = true;
    decButton.disabled = false;

    console.log(`${firstNum}, ${operator}, ${nextNum}, `)
}))

equalButton.addEventListener("click", () => {
    if(nextNum === false) {
        return
    }

    if (nextNum === 0 && operator === "/") {
        alert("Dividing by zero is not advised")
        return
    }

    let opResult = operate(firstNum, nextNum, operator)
    firstNum = Math.round(opResult * 100) / 100; 
    nextNum = false;
    operator = false;
    display.textContent = firstNum;
    console.log(`${firstNum}, ${operator}, ${nextNum}, `)
    decButton.disabled = false;
})

clearButton.addEventListener("click", () => {
    display.textContent = 0
    firstNum = 0;
    operator = false;
    nextNum = false;
});