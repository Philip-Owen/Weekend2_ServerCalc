// requires
const express = require('express');
const app = express();


app.use(express.static('server/public'));



// server listener
const port = 8088;
app.listen(port, () => console.log('server up on port:', port))