var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', function(req, res){
    res.send('BEM VINDO A API AWAKE!!!');
});

app.listen(8070, function(){
    console.log('SERVIDOR RODANDO NA PORTA 3000');
});