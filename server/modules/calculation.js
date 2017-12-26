class Calculation {
    constructor(result, equation) {
        this.result = result;
        this.equation = equation;
    }
}

calcArray = [];

let result = 0;
let pastCalc = 0;

function performCalc(inputObject) {
    numOne = Number(inputObject.firstNum);
    numTwo = Number(inputObject.secondNum);
    operator = inputObject.operator;

    switch (operator) {
        case '+':
            result = numOne + numTwo
            pastCalc = numOne + ' + ' + numTwo + ' = ' + result;
            calcArray.push(new Calculation(result, pastCalc));
            break;
        case '-':
            result = numOne - numTwo
            pastCalc = numOne + ' - ' + numTwo + ' = ' + result;
            calcArray.push(new Calculation(result, pastCalc));
            break;
        case '*':
            result = numOne * numTwo
            pastCalc = numOne + ' * ' + numTwo + ' = ' + result;
            calcArray.push(new Calculation(result, pastCalc));
            break;
        case '/':
            result = numOne / numTwo
            pastCalc = numOne + ' / ' + numTwo + ' = ' + result;
            calcArray.push(new Calculation(result, pastCalc));
            break;
    }
}

function resetAll() {
    calcArray.length = 0;
}

module.exports = {
    performCalc: performCalc,
    calcArray: calcArray,
    resetAll: resetAll
}   