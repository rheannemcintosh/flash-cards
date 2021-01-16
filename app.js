const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());

const colours = [
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'purple'
];

app.set('view engine', 'pug');

app.get('/', (req, res) => {
    const name = req.cookies.name;
    if (name) {
        res.render('index', { name });
    } else {
        res.redirect('/hello');
    }
});

app.get('/hello', (req, res) => {
    const name = req.cookies.name;
    if (name) {
        res.redirect('/');
    } else {
        res.render('hello');
    }
});

app.post('/hello', (req, res) => {
    res.cookie('name', req.body.name);
    res.redirect('/');
});

app.post('/goodbye', (req, res) => {
    res.clearCookie('name');
    res.redirect('/hello');
});

app.get('/cards', (req, res) => {
    res.render('card', { prompt: "Who is buried in Grant's tomb?", hint:"Think about whose tomb it is", colours });
});

app.listen(3000, () => {
    console.log('The application is running on localhost:3000');
});