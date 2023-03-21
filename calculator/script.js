/* eslint-disable space-before-function-paren */

// CONSTANTS
const OPERATORS = ['+', '-', '*', '/'];

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

/* Core functionality */

function operation(/** @type {string} */ numStr) {
    const [leftOperand, operator, rightOperand] = parseNumericExpression(numStr);
    let result = NaN;
    switch (operator) {
        case '+': result = add(leftOperand, rightOperand); break;
        case '-': result = subtract(leftOperand, rightOperand); break;
        case '*': result = multiply(leftOperand, rightOperand); break;
        case '/': result = divide(leftOperand, rightOperand); break;
    }
    return result;
}

function updateResult (str) {
    const resultDiv = document.querySelector('.results');
    resultDiv.innerText = str;
}

/* Parsers and Validators */

function parseNumericExpression(numStr) {
    let [leftOperand, rightOperand] = numStr.split(/[+\-*/]/g);
    const rightOperandIdx = numStr.indexOf(rightOperand);
    const operator = numStr[rightOperandIdx - 1];

    leftOperand = Number(leftOperand.trim());
    rightOperand = Number(rightOperand.trim());
    return [leftOperand, operator, rightOperand];
}

function isValidNumericalExpression(/** @type {string} */ str) {
    // Scenario 1: string should have at least 3 characters
    if (str.length < 3) {
        return false;
    }
    if (OPERATORS.includes(str[0]) || OPERATORS.includes(str[str.length - 1])) {
        return false;
    }
    const nOperators = str.match(/[+\-*/]/g);
    if (nOperators === null) {
        return false;
    }
    if (nOperators.length > 1) {
        return false;
    }
    return true;
}

/* Event Handlers */

function handleKeyClick(evt) {
    const btnValue = this.innerText;
    const resultDiv = document.querySelector('.results');
    const resultStr = resultDiv.innerText;
    if (btnValue === '=') {
        if (!isValidNumericalExpression(resultStr)) {
            return;
        }
        const ans = operation(resultStr);
        updateResult(ans);
    } else if (btnValue === 'AC') {
        updateResult('');
    } else if (!(OPERATORS.includes(btnValue) && OPERATORS.some(op => resultStr.includes(op)))) {
        // Update the result string with button value
        updateResult(resultStr === 'Infinity' ? btnValue : (resultStr + btnValue));
    }
}
const buttons = document.querySelectorAll('.button');
buttons.forEach(button => button.addEventListener('click', handleKeyClick));
