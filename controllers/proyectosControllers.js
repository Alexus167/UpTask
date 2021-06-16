const db = require('../database/models');
const slug = require('slug');
const Proyectos = require('../database/models/Proyectos');

exports.proyectosHome = async (req, res) =>{

    const usuarioId = res.locals.usuario.id;
    const proyectos = await db.Proyectos.findAll({where: { usuarioId : usuarioId}});


    res.render('index', {
        title: 'Proyectos',
        proyectos
    });
}

exports.formularioProyecto = async (req, res) => {
    const usuarioId = res.locals.usuario.id;
    const proyectos = await db.Proyectos.findAll({where: { usuarioId : usuarioId}});

    res.render('nuevoProyecto', {
        title: 'Nuevo Proyecto',
        proyectos
    });
}

exports.nuevoProyecto = async (req,res) => {
    //se envia a la consola lo que el user ingrese
    const usuarioId = res.locals.usuario.id;
    const proyectos = await db.Proyectos.findAll({where: { usuarioId : usuarioId}});
    
    const name = req.body.name;

    let errores = [];

    if(!name) {
        errores.push({'texto': 'Agrega un Nombre al Proyecto'})
    }

    //si hay errores
    if(errores.length > 0 ){
        res.render('nuevoProyecto', {
            title: 'Nuevo Proyecto',
            errores,
            proyectos
        })
    }else{
        const usuarioId = res.locals.usuario.id;
        await db.Proyectos.create({ name, usuarioId });
        res.redirect('/')
           
    };
}    

exports.proyectoPorUrl = async (req, res, next) => {
    const usuarioId = res.locals.usuario.id;
    const proyectosPromise = db.Proyectos.findAll({where: { usuarioId : usuarioId}});

    const proyectoPromise = db.Proyectos.findOne({
        where: {
            url: req.params.url,
            usuarioId
        }
    });

    const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise]);

        //Consulto tareas del proyecto actual
        const tareas = await db.Tareas.findAll({
            where: {
                proyectoId: proyecto.id
            }
        });

        if(!proyecto) return next();
        res.render('tareas', {
            title: 'Tareas del Proyecto',
            proyecto,
            proyectos,
            tareas


        });
}

exports.formularioEditar = async (req, res) => {
    const usuarioId = res.locals.usuario.id;
    const proyectosPromise = db.Proyectos.findAll({where: { usuarioId : usuarioId}});

    const proyectoPromise = db.Proyectos.findOne({
        where: {
            id: req.params.id,
            usuarioId
        }
    });

    const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise]);

    res.render('nuevoProyecto', {
         title: 'Editar Proyecto',
         proyectos,
         proyecto
     })
    
}

exports.actualizarProyecto = async (req,res) => {
    //se envia a la consola lo que el user ingrese
    const usuarioId = res.locals.usuario.id;
    const proyectos = await db.Proyectos.findAll({where: { usuarioId : usuarioId}});
    
    const name = req.body.name;

    let errores = [];

    if(!name) {
        errores.push({'texto': 'Agrega un Nombre al Proyecto'})
    }

    //si hay errores
    if(errores.length > 0 ){
        res.render('nuevoProyecto', {
            title: 'Nuevo Proyecto',
            errores,
            proyectos
        })
    }else{
        
        await db.Proyectos.update(
            { 
                name: name 
            },
            {
                where: {id: req.params.id}
            });
        res.redirect('/')
           
    };
}

exports.eliminarProyecto = async (req, res, next) => {
    const {urlProyecto} = req.query;

    const resultado = await Proyectos.destroy({where: { url : urlProyecto}});

    if(!resultado){
        return next();
    }

    res.status(200).send('Proyecto Eliminado Correctamente');
} 


