const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const name = req.cookies.name;
    if (name) {
        res.render('index', { name });
    } else {
        res.redirect('/hello');
    }
});

router.get('/hello', (req, res) => {
    const name = req.cookies.name;
    if (name) {
        res.redirect('/');
    } else {
        res.render('hello');
    }
});

router.post('/hello', (req, res) => {
    res.cookie('name', req.body.name);
    res.redirect('/');
});

router.post('/goodbye', (req, res) => {
    res.clearCookie('name');
    res.redirect('/hello');
});

module.exports = router;

