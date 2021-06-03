const express = require('express');
const router = express.Router();

const proyectosController = require('../controllers/proyectosControllers')

module.exports = function () {

router.get('/', proyectosController.proyectosHome );
router.get('/nuevoProyecto', proyectosController.formularioProyecto);
router.post('/nuevoProyecto', proyectosController.nuevoProyecto);



return router;
}