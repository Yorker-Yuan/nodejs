const express = require('express');
const fs = require('fs');
const multer = require('multer');
const upload = multer({dest:'tmp_uploads/'});   //設定上傳暫存目錄

const app = express();

app.set('view engine', 'ejs');

// top-level middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());



app.get('/', (req, res)=>{
    res.render('home', {name: 'Cole'});
});

app.get('/json-sales', (req, res)=>{
    const data = require(__dirname + '/../data/sales');
    res.render('json-sales', {sales: data});
});

app.get('/try-qs', (req, res)=>{
    res.json(req.query);
});

app.post('/try-post', (req, res)=>{
    res.json(req.body);
});

app.get('/try-post-form', (req, res)=>{
    res.render('try-post-form');
});

app.post('/try-post-form', (req, res)=>{
    res.render('try-post-form',req.body);
});


// --- static folder ---
app.use(express.static('public'));
// --- 404 ---
app.use( (req, res)=>{
    res.status(404).send('<h2>404 - 找不到網頁</h2>')
});

app.listen(3000, ()=>{
    console.log('server started!');
});


