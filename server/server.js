// requires
const express = require('express');
const bodyParser = require('body-parser');
const calculation = require('./modules/calculation.js')
const app = express();



app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended:true}));

// Receives object from client side ajax POST, and performs calculations
app.post('/calculation', (req,res) => {
    console.log(req.body);
    calculation.performCalc(req.body);
    res.sendStatus(201);
});

// Delete request to clear history from the page, changes server side history
// array to zero.
app.delete('/clearResults', (req,res) => {  
    calculation.resetAll();
    res.send(calculation.calcArray);
});

// Returns an array of objects to the client side.
app.get('/calculation', (req,res) =>  {
    // console.log('in calc', calculation.calcArray);
    res.send(calculation.calcArray);
});

// server listener
const port = 8088;
app.listen(port, () => console.log('server up on port:', port))