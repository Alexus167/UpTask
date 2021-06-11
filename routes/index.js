const express = require('express');
const router = express.Router();
const {body} = require('express-validator'); 

const proyectosController = require('../controllers/proyectosControllers');
const tareasController = require('../controllers/tareasController');

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

 //Tareas
router.post ('/proyectos/:url', tareasController.agregarTarea);
return router;

//actualizar tarea
router.patch('/tareas/:id', tareasController.cambiarEstadoTarea);

//Eliminar Tarea
router.delete('/tareas/:id', tareasController.eliminarTarea);



}