const express = require('express');
const router = express.Router();
const {body} = require('express-validator'); 

const proyectosController = require('../controllers/proyectosControllers');
const tareasController = require('../controllers/tareasController');
const usuariosController = require('../controllers/usuariosControllers');
const authController = require('../controllers/authController');
module.exports = function () {

router.get('/', authController.usuarioAutenticado, proyectosController.proyectosHome );

router.get('/nuevoProyecto', authController.usuarioAutenticado, proyectosController.formularioProyecto);

router.post('/nuevoProyecto', authController.usuarioAutenticado,
body('name').not().isEmpty().trim().escape(),
 proyectosController.nuevoProyecto);

 //Lista de proyectos
router.get('/proyectos/:url', authController.usuarioAutenticado, proyectosController.proyectoPorUrl);

//Actualiza el proyecto
router.get('/proyecto/editar/:id', authController.usuarioAutenticado, proyectosController.formularioEditar);
router.post('/nuevoProyecto/:id', authController.usuarioAutenticado,
body('name').not().isEmpty().trim().escape(),
 proyectosController.actualizarProyecto);

 //Elimino proyecto
router.delete('/proyectos/:url', authController.usuarioAutenticado, proyectosController.eliminarProyecto);

 //Tareas
router.post ('/proyectos/:url', authController.usuarioAutenticado, tareasController.agregarTarea);

//actualizar tarea
router.patch('/tareas/:id', authController.usuarioAutenticado, tareasController.cambiarEstadoTarea);

//Eliminar Tarea
router.delete('/tareas/:id', authController.usuarioAutenticado, tareasController.eliminarTarea);

//Crear usuario
router.get('/crearCuenta', usuariosController.formCrearCuenta );
router.post('/crearCuenta', usuariosController.crearCuenta );

//Inicio de sesion
router.get('/iniciarSesion', usuariosController.formIniciarSesion );
router.post('/iniciarSesion', authController.autenticarUsuario );

//Logout
router.get('/cerrarSesion', authController.cerrarSesion);

// reestablecer contraseña
router.get('/reestablecer', usuariosController.formRestablecerPassword);
router.post('/reestablecer', authController.enviarToken);
router.get('/reestablecer/:token', authController.resetPassword);
router.post('/reestablecer/:token', authController.actualizarPassword);

return router;
}
