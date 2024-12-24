const display = document.querySelector("#display");
const numberButtons = document.querySelectorAll(".numberButton");
const opButtons = document.querySelectorAll(".opButton");
const clearButton = document.querySelector("#clearButton");
const decButton = document.querySelector("#decButton");
const delButton = document.querySelector("#delButton");
const signButton = document.querySelector("#signButton");

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

function populateDis(btnText) {
    if (btnText === "." || display.textContent === "0.") {
        display.textContent += btnText;
    } else if (!isEmpty && parseFloat(display.textContent) !== 0) {
        display.textContent += btnText;
    } else {
        display.textContent = btnText;
        isEmpty = false;   
    }
}

function assignDis() {
    if (toNext && operator) {
        nextNum = parseFloat(display.textContent);
    } else {
        firstNum = parseFloat(display.textContent);
    } 

    console.log(`${firstNum}, ${operator}, ${nextNum}, `)
}

function deleteDis() {
    let oldDis = display.textContent
    let newDis = oldDis.split("")
    .splice(0, oldDis.length-1)
    .join("");
    display.textContent = newDis;

    if (display.textContent === "") {
        display.textContent = 0;
    }
}

function oprtDis(btnText) {
    if (nextNum === 0 && operator === "/") {
        clearDis()
        alert("Dividing by zero is not advised")
        return
    }

    if(isEmpty && nextNum === false) {
        operator = btnText;
        console.log(`${firstNum}, ${operator}, ${nextNum}, `)
        return
    }

    if(operator) {
        let opResult = operate(firstNum, nextNum, operator);
        firstNum = Math.round(opResult * 100) / 100;
        nextNum = false;
        display.textContent = firstNum;
        isEmpty = true;
    }

    operator = btnText
    isEmpty = true;
    toNext = true;
    decButton.disabled = false;

    console.log(`${firstNum}, ${operator}, ${nextNum}, `)
}

function evalDis() {
    if(nextNum === false || operator === false) {
        return
    }

    if (nextNum === 0 && operator === "/") {
        clearDis()
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
}

function clearDis() {
    display.textContent = 0
    firstNum = 0;
    operator = false;
    nextNum = false;
    toNext = false;
}

numberButtons.forEach((btn) => btn.addEventListener("click", () => {
    populateDis(btn.textContent)
    assignDis()
}))

decButton.addEventListener("click", () => {
    populateDis(decButton.textContent)
    decButton.disabled = true;
})

delButton.addEventListener("click", () => {
    deleteDis()
    assignDis()
})

opButtons.forEach((btn) => btn.addEventListener("click", ()=> {
    oprtDis(btn.getAttribute("data-key"))
}))

equalButton.addEventListener("click", () => {
    evalDis()
})

clearButton.addEventListener("click", () => {
    clearDis()
});

signButton.addEventListener("click", () => {
    if (!parseInt(display.textContent)) {
        return
    }

    display.textContent = parseInt(display.textContent) * -1;
    assignDis();
})

document.body.addEventListener("keydown", (e) => {
    const operations = ["+", "-", "*", "/"]

    if (Number.isInteger(parseInt(e.key))) {
        populateDis(e.key)
        assignDis()
    } else if (e.key === "." && !decButton.disabled) {
        populateDis(decButton.textContent)
        decButton.disabled = true
    } else if (e.key === "Backspace") {
        deleteDis()
        assignDis()
    } else if (operations.includes(e.key)) {
        oprtDis(e.key)
    } else if (e.key === "=" || e.key === "Enter") {
        evalDis()
    } else if (e.key === "c" || e.key === "C") {
        clearDis()
    }
})