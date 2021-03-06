

$(document).ready( () => {
    // runs to pull past calcs from server if there are any
    getResults()
    
    // *** Event Listeners ***
    $('button.numbers').on('click', numberInputs)
    $('.operators').on('click', startExpression);
    $('#equalCalc').on('click', calculateExpression)
    $('#clearCalc').on('click', resetAll);
    $('#past-calc').on('click', 'li', getHistoryResults)
    $('#clearEntry').on('click', clearEntries)
});


// *********************************************************
// Variables 
// *********************************************************


let firstInput = 0;
let operator = 0;
let secondInput = 0;
let setter = false;


// *********************************************************
//                      Functions
// *********************************************************


// begin numberInputs()
// appends number pad clicks into numbers on the page.
function numberInputs() {
    if (!setter) {
        $('#calc-results').text('');
        $('#calc-results').append($(this).text());
        setter = true;
    } else {
        $('#calc-results').append($(this).text());
    }      
} // end numberInputs()


// begin startExpression()
// after expression click, stores expression and first value to be packaged in object after equals is clicked
function startExpression() {    
    firstInput = $('#calc-results').text();
    operator = $(this).text();
    if (operator == 'xy') {
        $('#value-one').text(firstInput);
        $('#exp-opr').text('^');
    } else {
        $('#value-one').text(firstInput);
        $('#exp-opr').text(operator);
    }
    setter = false;
} // end startExpression()


// begin calculateExpression()
// builds objects to be sent to server side for calculation results.
function calculateExpression() {
    secondInput = $('#calc-results').text();
    objectToSend = new CalcObj(firstInput, secondInput, operator);
    // console.log(objectToSend);
    $.ajax({
        method: 'POST',
        url: '/calculation',
        data: objectToSend,
        success: (response) => {         
            $('input').val('');
            getResults();
            $('#calc-waiting').children().empty();
            setter = false;
        }
    })
} // end calculateExpression()


// Begin getResults()
// Runs at begining of 'document ready' to post any past calculations to the page.
// Also runs at the end of calculateExpression() to get the last calculation made and appends it to the DOM. 
function getResults() {
    let returnValue = 0;
    $.ajax({
        method: 'GET',
        url: '/calculation',
        success: (response) => { 
            // console.log('in getResults', response);
            let calcLength = response.length - 1;
            if (calcLength >= 0) {
                $('#calc-results').html(response[calcLength].result);
                $('#past-calc').empty();
                for (let i = 0; i < response.length; i++) {
                    $row = $('<li>');
                    $row.append(response[i].equation);
                    // Applies data tag to each li to be used to pull past history results
                    $row.data('results', response[i].result);
                    $('#past-calc').prepend($row)
                }
            }
        }
    });
} // end getResults()


// begin resetAll()
// resets calcArray array on the server to an empty array and changes calc-results to 0
function resetAll() {
    $.ajax({
        method: 'DELETE',
        url: '/clearResults',
        success: (response) => {
            // console.log('in resetAll', response);
            $('#past-calc').empty();
            $('#calc-results').html('0')
            $('#calc-waiting').children().empty();
            setter = false;
        }
    });
} // end resetAll()


// begin getHistoryResults()
// used to pull past results off of each li .data tag
function getHistoryResults() {
    $('#calc-waiting').children().empty();
    $('#calc-results').html($(this).data('results'))
} // end getHistoryResults()


// begin clearEntries()
// clears only the current calculation.
function clearEntries() {
    $('#calc-waiting').children().empty();
    $('#calc-results').html('0')
    firstInput = 0;
    operator = 0;
    secondInput = 0;
    setter = false;
} // end clearEntries()