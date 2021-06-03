exports.proyectosHome = (req, res) =>{
    res.render('index', {
        title: 'Proyectos'
    });
}

exports.formularioProyecto = (req, res) => {
    res.render('nuevoProyecto', {
        title: 'Nuevo Proyecto'
    });
}

exports.nuevoProyecto = (req,res) => {
    //se envia a la consola lo que el user ingrese
    
    const { nombre } = req.body;

    let errores = [];

    if(!nombre) {
        errores.push({'texto': 'Agrega un Nombre al Proyecto'})
    }

    //si hay errores
    if(errores.length > 0 ){
        res.render('nuevoProyecto', {
            title: 'Nuevo Proyecto',
            errores
        })
    }else{
        
    }
}
