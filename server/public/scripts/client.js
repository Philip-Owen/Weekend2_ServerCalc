console.log('js');

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
    let objectToSend = new CalcObj(firstVal, secondVal, operator);
    console.log(objectToSend);
    $.ajax({
        method: 'POST',
        url: '/calculation',
        data: objectToSend,
        success: (response) => {
            console.log(response);
            $('input').val('')
            getResults()
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

function getResults() {
    $.ajax({
        method: 'GET',
        url: '/calculation',
        success: (response) => {
            console.log(response);
        }
    })
}