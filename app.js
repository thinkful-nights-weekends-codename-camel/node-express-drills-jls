const express = require('express');
// const morgan = require('morgan');

const app = express();

// This is middleware that requests pass through
// on their way to the final handler
// app.use(morgan('dev'));

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

app.get('/cipher', (req, res) => {
    const text = req.query.text;
    const shift = parseInt(req.query.shift);

    if (!text) {
        return res.status(400).send('Please provide some text');
    }
    if (!shift || isNaN(shift)) {
        return res.status(400).send('Please provide a number');
    }

    let textArray = text.split('');

    let shiftedArray = textArray.map(letter => letter.charCodeAt(0) + shift).map(number => String.fromCharCode(number));

    let finalString = shiftedArray.join('');

    res.send(finalString);
});

app.get('/lotto', (req, res) => {
    const temp = req.query.arr;

    if (!temp) {
        return res.status(400).send('Please provide a set of six numbers');
    }

    if (!Array.isArray(temp)) {
        return res.status(400).send('Please enter numbers as an Array');
    }

    if (numbers.length !== 6) {
        return res.status(400).send('Please provide a set of six numbers');
    }

    let numbers = temp.map(n => parseInt(n))

    numbers.forEach(number => {
        if (number < 1 || number > 20) {
            return res.status(400).send('Please use numbers between 1 and 20');
        }
        if (isNaN(number)) {
            return res.status(400).send('Please provide a set of six numbers');
        }
    })


    const winningNumbers = [];
    for (let i = 0; i < 6; i++) {
        winningNumbers.push(Math.ceil(Math.random() * 20));
    }

    let results = winningNumbers.filter(n => numbers.includes(n)).length;

    switch (results) {
        case 4:
            responseText = 'Congratulations, You win a free ticket!'
            break;
        case 5:
            responseText = 'Congratulations, You win a $100.00!'
            break;
        case 6:
            responseText = 'Congratulations, You could have won a real lottery!'
            break;
        default:
            responseText = 'Sorry, you wasted you money!'
    }

    res.send(responseText);
})



app.listen(8000, () => {
    console.log('Express server is listening on port 8000!');
});