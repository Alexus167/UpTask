const express = require('express');
const router = express.Router();

const proyectosController = require('../controllers/proyectosControllers')

module.exports = function () {

router.get('/', proyectosController.proyectosHome );



return router;
}