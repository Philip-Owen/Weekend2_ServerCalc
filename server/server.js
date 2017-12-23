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

app.get('/calculation', (req,res) =>  res.send(calculation.result));


// server listener
const port = 8088;
app.listen(port, () => console.log('server up on port:', port))