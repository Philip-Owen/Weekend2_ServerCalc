

$(document).ready( () => {
    // runs to pull past calcs from server if there are any
    getResults()
    
    // *** Event Listeners ***
    $('button.numbers').on('click', numberInputs)
    $('#addCalc, #subCalc, #mulCalc, #divdCalc ').on('click', startExpression);
    $('#equalCalc').on('click', calculateExpression)
    $('#clearCalc').on('click', resetAll);
    $('#past-calc').on('click', 'li', getHistoryResults)
    
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
function numberInputs() {
    if (!setter) {
        $('#calc-results').text('');
        $('#calc-results').append($(this).text()).val();
        setter = true;
    } else {
        $('#calc-results').append($(this).text());
    }      
} // end numberInputs()


// begin startExpression()
// packages equation into an object to be sent to the server
function startExpression() {
    firstInput = $('#calc-results').text();
    operator = $(this).text();
    $('#value-one').text(firstInput);
    $('#exp-opr').text(operator);
    setter = false;
} // end startExpression()


// begin calculateExpression()
function calculateExpression() {
    secondInput = $('#calc-results').text();
    objectToSend = new CalcObj(firstInput, secondInput, operator);
    console.log(objectToSend);
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
        }
    });
} // end resetAll()

function getHistoryResults() {
    $('#calc-waiting').children().empty();
    $('#calc-results').html($(this).data('results'))
    
}