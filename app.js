const express = require('express');
const morgan = require('morgan');

const app = express();

// This is middleware that requests pass through
// on their way to the final handler
app.use(morgan('dev'));

//This is the final request handler
app.get('/', (req, res) => {
    res.send('Hello Express!');
});

app.get('/sum', (req, res) => {
    //1. get values from the request
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    //2. validate the values
    if (!a || isNaN(a)) {
        //3. name was not provided
        return res.status(400).send('Please provide a number');
    }

    if (!b || isNaN(b)) {
        //3. race was not provided
        return res.status(400).send('Please provide another number');
    }

    //4. and 5. both name and race are valid so do the processing.
    const sum = `Sum of ${a} and ${b} is ${a + b}.`;

    //6. send the response 
    res.send(sum);
});

app.listen(8000, () => {
    console.log('Express server is listening on port 8000!');
});