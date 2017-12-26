// requires
const express = require('express');
const bodyParser = require('body-parser');
const calculation = require('./modules/calculation.js')
const app = express();



app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended:true}));

app.post('/calculation', (req,res) => {
    calculation.performCalc(req.body);
    res.sendStatus(201);
});

app.delete('/clearResults', (req,res) => {  
    calculation.resetAll();
    res.send(calculation.calcArray);
});

app.get('/calculation', (req,res) =>  {
    // console.log('in calc', calculation.calcArray);
    res.send(calculation.calcArray);
});


// server listener
const port = 8088;
app.listen(port, () => console.log('server up on port:', port))