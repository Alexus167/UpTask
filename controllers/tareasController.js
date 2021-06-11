const { noExtendLeft } = require('sequelize/types/lib/operators');
const db = require('../database/models');
const Proyectos = require('../database/models/Proyectos');
const Tareas = require('../database/models/Tareas');

exports.agregarTarea = async (req, res, next) => {
    //obtengo el proyecto actual
    const proyecto = await db.Proyectos.findOne({where: {url:req.params.url}});

    //lee el valor del input
    const {tarea} = req.body;

    const estado = 0;
    const proyectoId = proyecto.id;

    //inserto en la base de datos
    const resultado = await db.Tareas.create({ tarea, estado, proyectoId});

    if(!resultado){
        return noExtendLeft();
    }

    res.redirect(`/proyectos/${req.params.url}`);
}

exports.cambiarEstadoTarea = (req, res) => {
    const { id } = req.params;
    const tarea = await db.Tareas.findOne({where: { id }});

    //cambio el estado
    let estado = 0;
    if(tarea.estado === estado){
        estado = 1;
    }
    tarea.estado = estado;

    const resultado = await tarea.save();
    
    if(!resultado) return next();

    res.status(200).send('Actualizado');
}

exports.eliminarTarea = (req, res, next) => {
    const { id } = req.params;

    const resultado = await Tareas.destroy({where: { id }});

    if(!resultado){
        return next();
    }

    res.status(200).send('Proyecto Eliminado Correctamente');
} 
