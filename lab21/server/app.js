const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE'); 
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); 
    next();
});

app.post('/calculate', (req, res) => {
    const number = req.body.number;
    const square = number * number;
    res.json({ square: square });
});

app.listen(port, () => {
    console.log(`Сервер запущено на порті ${port}`);
});
