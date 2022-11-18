
const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');//modulo que jatem o http internamente ele cria abstrações de rotas, 
//middlewares e muitas outras funções para facilitar a criação tanto de API's quanto SPA's.

let app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(expressValidator());

consign().include('routes').include('utils').into(app);

app.listen(3000, '127.0.0.1', () => {

    console.log('servidor rodando!');

});