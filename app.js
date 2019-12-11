const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const uploader = require('./routes/uploadFile');

const app = express();

// Load View Engine
app.set('views',path.join(__dirname,"views"));
app.set('view engine','pug');

// parse Application/Json
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname,"public")));

app.get('/',(req, res)=>{
     res.render('index');
});

app.post('/submitForm',uploader.getFileInput, (req, res, next)=>{
    
});

app.listen(port = 8080, () =>{
    console.log("app started at port :"+port);
});