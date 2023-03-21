/* eslint-disable space-before-function-paren */
/* Operations */
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

/* Parsers */

function operation(/** @type {string} */ numStr) {
    let [leftOperand, rightOperand] = numStr.split(/[+\-*/]/g);
    const rightOperandIdx = numStr.indexOf(rightOperand);
    const operator = numStr[rightOperandIdx - 1];

    leftOperand = Number(leftOperand.trim());
    rightOperand = Number(rightOperand.trim());
    let result = NaN;
    switch (operator) {
        case '+': result = add(leftOperand, rightOperand); break;
        case '-': result = subtract(leftOperand, rightOperand); break;
        case '*': result = multiply(leftOperand, rightOperand); break;
        case '/': result = divide(leftOperand, rightOperand); break;
    }
    return result;
}

console.log(operation('23+45'));
console.log(operation('45-13'));
console.log(operation('12-24'));
console.log(operation('1*0'));
console.log(operation('1/0'));
