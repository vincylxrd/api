var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', function(req, res){
    res.send('BEM VINDO!!!');
});

app.post('/produto/', function(req, res ){
    var dados = req.body;
    res.send(`Produto: ${dados.nome} e o seu preço de R$: ${dados.preco} 199,90.`);
});

app.get('/produto/comprar/:qtd', function(req, res ){
    var valor = req.params.qts *199.90;
    res.send(`O Valor total é de R$ ${valor}`);
});

app.listen(8060, function(){
    console.log('SERVIDOR RODANDO NA PORTA 3000');
});