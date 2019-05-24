
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', function(requisicao, resposta){
    resposta.send('Bem Vindo à API Awake!');
});

const urlConexao = 'mongodb://localhost:27017/awake';

app.post('/cliente', function(requisicao, resposta){
    var dados = requisicao.body;

    mongoose.connect(urlConexao, function(erro, banco){
        banco.collection('cliente').insertOne({
            'nome': dados.nome,
            'idade': dados.idade,
            'cidade': dados.cidade
        }, function(erro, resultado){
            if(!erro)
            resposta.json(resultado);
        });
    });
});

app.get('/cliente', function(requisicao, resposta){
    mongoose.connect(urlConexao, function(erro, banco){
        banco.collection('cliente').find().toArray(function(erro, resultado){
            if(!erro)
            resposta.json(resultado);
        });
    });
});

var objectId = require('mongodb').ObjectID;

app.get('/cliente/:id', function(requisicao, resposta){

    var codigoCliente = requisicao.params.id;

    mongoose.connect(urlConexao, function(erro, banco){
        banco.collection('cliente').find({'_id': objectId(codigoCliente)}).toArray(function(erro, resultado){
            resposta.json(resultado);
        });    
    });
});

app.post('/cliente/pesquisar/nome', function(requisicao, resposta){
    var dados = requisicao.body;
    mongoose.connect(urlConexao, function(erro, banco){
        banco.collection('cliente').find({'nome': {$regex: dados.nome}}).toArray(function(erro, resultado){
            if(!erro)
            resposta.json(resultado);
        });
    });
});

app.delete('/cliente/:id', function(requisicao,resposta){
    var codigoCliente = requisicao.params.id;
    mongoose.connect(urlConexao, function(erro, banco){
        banco.collection('cliente').remove({'_id':objectId(codigoCliente)},function(erro, resultado){
            resposta.json(resultado);   
        });
    });
});

app.put('/cliente/:id', function(requisicao, resposta){
    var codigoCliente = requisicao.params.id;
    var dados = requisicao.body;
    mongoose.connect(urlConexao, function(erro, banco){
        banco.collection('cliente').update(
            {'_id': objectId(codigoCliente)}, {$set:
            {
                'nome': dados.nome,
                'idade': dados.idade,
                'cidade': dados.cidade,
            }}, function (erro, resultado){
                if(!erro)
                resposta.json(resultado);
        });
    });
});

app.listen(3000, function(){
    console.log('SERVIDOR RODANDO NA PORTA 3000');
});