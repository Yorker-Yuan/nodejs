const express = require('express');
const fs = require('fs');
const multer = require('multer');
const upload = multer({dest: 'tmp_uploads/'});
const upload2 = require('./upload-module');
const {v4: uuidv4} = require('uuid');

const app = express();

app.set('view engine', 'ejs');

// top-level middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());



app.get('/', (req, res)=>{
    res.render('home', {name: 'Bill'});
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
    res.render('try-post-form', req.body);
});

app.post('/try-upload', upload.single('avatar'), (req, res)=>{
    // console.log(req.file);
    if(req.file && req.file.originalname){
        if(/\.(jpg|jpeg|png|gif)$/i.test(req.file.originalname) ){
            fs.rename(req.file.path, './public/img/'+req.file.originalname, error=>{
                res.json({success: true});
            });
        } else {
            fs.unlink(req.file.path, error=>{
                res.json({success: false, error: 'bad file type!'});
            });
        }
    } else {
        res.json({success: false, error: 'no upload file !'});
    }

});
app.post('/try-upload2', upload2.single('avatar'), (req, res)=>{
    res.json({
        file: req.file,
        body: req.body,
    });
});
app.post('/try-upload2a', upload2.array('photos', 10), (req, res)=>{
    res.json({
        files: req.files,
        body: req.body,
    });
});

app.get('/try-uuid', (req, res)=>{
    res.json({
        
        u1: uuidv4(),
        u2: uuidv4(),
    });
});
//設定路由
app.get('/my-params1/:action?/:id?', (req, res)=>{
    res.json(req.params);   //?為選擇性的
});
app.get(/\/m\/09\d{2}-?\d{3}-?\d{3}$/i, (req, res)=>{
    //res.send(req.url);
    let u = req.url.slice(3);
    u = u.split('?')[0];
    u = u.split('-').join('');
    res.send(u);
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


