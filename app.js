const express = require ('express');
const routes = require ('./routes');
const path = require('path');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('./config/passport');
//helpers
const helpers = require('./helpers');

// creo una app de express
const app = express();

//Donde carga los arch estaticos
app.use(express.static('public'));

//lee datos del formulario
app.use(express.urlencoded({ extended: true }));

app.use(expressValidator());


//habilito Pug
app.set('view engine', 'pug');
// añado la carpeta de las vistas
app.set('views', path.join(__dirname, './views'));

app.use(flash());

app.use(cookieParser());

//navegas sin necesidad de autenticar
app.use(session({
    secret: 'Uptask esta vivo!',
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());

//Paso var dump a la app
app.use((req,res,next) => {
    res.locals.vardump = helpers.vardump;
    res.locals.mensajes = req.flash();
    res.locals.usuario = {...req.user} || null;
    next();
});



/* RUTAS */ 
app.use('/', routes());

app.listen(3000);