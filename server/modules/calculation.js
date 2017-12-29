
// Used to construct Calculation objects to be pushed into calcArray
// and sent to the client side.
class Calculation {
    constructor(result, equation) {
        this.result = result;
        this.equation = equation;
    }
}

// Stores Calculation objects.
calcArray = [];


// Performs mathmatical calculations on the objects that are sent from
// client side.
function performCalc(inputObject) {
    let result = 0;
    let pastCalc = 0;
    numOne = Number(inputObject.firstNum);
    numTwo = Number(inputObject.secondNum);
    operator = inputObject.operator;

    // evaluates operator passed in through object to determin which
    // calculation to perform.
    switch (operator) {
        case '+':
            result = numOne + numTwo
            pastCalc = numOne + ' + ' + numTwo + ' = ' + result;
            calcArray.push(new Calculation(result, pastCalc));
            break;
        case '−':
            result = numOne - numTwo
            pastCalc = numOne + ' − ' + numTwo + ' = ' + result;
            calcArray.push(new Calculation(result, pastCalc));
            break;
        case '×':
            result = numOne * numTwo
            pastCalc = numOne + ' × ' + numTwo + ' = ' + result;
            calcArray.push(new Calculation(result, pastCalc));
            break;
        case '÷':
            result = numOne / numTwo
            pastCalc = numOne + ' ÷ ' + numTwo + ' = ' + result;
            calcArray.push(new Calculation(result, pastCalc));
            break;
        case 'xy':
            result = Math.pow(numOne, numTwo);
            pastCalc = numOne + ' ^ ' + numTwo + ' = ' + result;
            calcArray.push(new Calculation(result, pastCalc));
            break;
    }
}

// Resets calcArray to an empty array.
function resetAll() {
    calcArray.length = 0;
}

// Exports functions and array to be used on server.js
module.exports = {
    performCalc: performCalc,
    calcArray: calcArray,
    resetAll: resetAll
}   