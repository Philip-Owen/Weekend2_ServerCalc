console.log('js');

let objectToSend = 0;

$(document).ready(onLoad);

// Begin onLoad function
function onLoad() {
    console.log('JQ');
    $('button').on('click',bundleObject)
} // end onLoad

// Begin bundleObject function
function bundleObject() {
    let firstVal = $('#value-one').val();
    let secondVal = $('#value-two').val();
    let operator = getOperator($(this).text());
    objectToSend = new CalcObj(firstVal, secondVal, operator);
    console.log(objectToSend);
    $.ajax({
        method: 'POST',
        url: '/calculation',
        data: objectToSend,
        success: (response) => {
            console.log(response);
            $('input').val('');
            getResults();
        }
    })
    
} // end bundleObject

// Begin getOperator function
function getOperator(operator) {
    let operation = '';
    switch (operator) {
        case '+':
            operation = 'add';
            break;
        case '-':
            operation = 'subtract';
            break;
        case '*':
            operation = 'multiply';
            break;
        case '/':
            operation = 'divide';
            break;
    }   
    return operation;
} // end getOperator

// Begin getResults
function getResults() {
    let returnValue = 0;
    $.ajax({
        method: 'GET',
        url: '/calculation',
        success: (response) => {
            console.log(response);
            $('#calc-results').text(response.equals);
            let numOne = objectToSend.firstNum;
            let numTwo = objectToSend.secondNum;
            let operator = objectToSend.operator;
            switch (operator) {
                case 'add':
                    operator = '+';
                    break;
                case 'subtract':
                    operator = '-';
                    break;
                case 'multiply':
                    operator = '*';
                    break;
                case 'divide':
                    operator = '/';
                    break;
            }   
            $('#past-calc').append('<li>'+numOne+' '+operator+' '+numTwo+' = ' + response.equals+'</li>');
        }
    });
} // end getResults

