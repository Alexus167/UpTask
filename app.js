const express = require ('express');
const routes = require ('./routes');
const path = require('path');

// creo una app de express
const app = express();

//Donde carga los arch estaticos
app.use(express.static('public'));

//habilito Pug
app.set('view engine', 'pug');
// añado la carpeta de las vistas
app.set('views', path.join(__dirname, './views'));

app.use('/', routes());

app.listen(3000);