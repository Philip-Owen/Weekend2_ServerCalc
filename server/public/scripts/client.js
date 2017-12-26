
$(document).ready( () => {
    // runs to pull past calcs from server if there are any
    getResults()
    
    // *** Event Listeners ***
    $('#addCalc, #subCalc, #mulCalc, #divdCalc ').on('click', bundleObject);
    $('#clearCalc').on('click', resetAll);
});


// *********************************************************
//                      Functions
// *********************************************************

// begin bundleObject()
// packages equation into an object to be sent to the server
function bundleObject() {
    let objectToSend;
    let firstVal = $('#value-one').val();
    let secondVal = $('#value-two').val();
    let operator = $(this).text();
    objectToSend = new CalcObj(firstVal, secondVal, operator);  
    $.ajax({
        method: 'POST',
        url: '/calculation',
        data: objectToSend,
        success: (response) => {         
            $('input').val('');
            getResults();
        }
    })
} // end bundleObject()

// Begin getResults()
// Runs at begining of 'document ready' to post any past calculations to the page.
// Also runs at the end of bundleObject() to get the last calculation made and appends it to the DOM. 
function getResults() {
    let returnValue = 0;
    $.ajax({
        method: 'GET',
        url: '/calculation',
        success: (response) => { 
            console.log('in getResults', response);
            let calcLength = response.length - 1;
            if (calcLength >= 0) {
                $('#calc-results').html(response[calcLength].result);
                $('#past-calc').empty();
                for (let i = 0; i < response.length; i++) {
                    $('#past-calc').prepend('<li>' + response[i].equation + '</li>')  
                }
            }
        }
    });
} // end getResults()

// begin resetAll()
// resets calcArray array on the server to an empty array and changes calc-results to 0
function resetAll() {
    $.ajax({
        method: 'GET',
        url: '/clearResults',
        success: (response) => {
            console.log('in resetAll', response);
            $('#past-calc').empty();
            $('#calc-results').html('0')
        }
    });
} // end resetAll()