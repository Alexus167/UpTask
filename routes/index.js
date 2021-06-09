const express = require('express');
const router = express.Router();
const {body} = require('express-validator') 

const proyectosController = require('../controllers/proyectosControllers')

module.exports = function () {

router.get('/', proyectosController.proyectosHome );
router.get('/nuevoProyecto', proyectosController.formularioProyecto);
router.post('/nuevoProyecto',
body('name').not().isEmpty().trim().escape(),
 proyectosController.nuevoProyecto);

 //Lista de proyectos
router.get('/proyectos/:url', proyectosController.proyectoPorUrl);

//Actualiza el proyecto
router.get('/proyecto/editar/:id', proyectosController.formularioEditar);
router.post('/nuevoProyecto/:id',
body('name').not().isEmpty().trim().escape(),
 proyectosController.actualizarProyecto);

 //Elimino proyecto
router.delete('/proyectos/:url', proyectosController.eliminarProyecto);
return router;
}