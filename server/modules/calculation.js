let result = {
    equals: 0
}

function performCalc(inputObject) {
    numOne = Number(inputObject.firstNum);
    numTwo = Number(inputObject.secondNum);
    operator = inputObject.operator;

    switch (operator) {
        case 'add':
            result.equals = numOne + numTwo
            break;
        case 'subtract':
            result.equals = numOne - numTwo
            break;
        case 'multiply':
            result.equals = numOne * numTwo
            break;
        case 'divide':
            result.equals = numOne / numTwo
            break;
    }
}

module.exports = {
    performCalc: performCalc,
    result: result
}   