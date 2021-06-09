const express = require ('express');
const routes = require ('./routes');
const path = require('path');

//helpers
const helpers = require('./helpers');

// creo una app de express
const app = express();

//Donde carga los arch estaticos
app.use(express.static('public'));

//habilito Pug
app.set('view engine', 'pug');
// añado la carpeta de las vistas
app.set('views', path.join(__dirname, './views'));


//Paso var dump a la app
app.use((req,res,next) => {
    res.locals.vardump = helpers.vardump;
    next();
});


app.use(express.urlencoded({ extended: true }));

/* RUTAS */ 
app.use('/', routes());

app.listen(3000);