const Usuarios = require('../database/models/usuarios');

exports.formCrearCuenta = (req,res) => {
    res.render('crearCuenta', {
        title: 'Crear cuenta en Uptask'  
    })
}

exports.crearCuenta = async (req,res) => {
    const { email, password} = req.body;

    try {
        await Usuarios.create({
            email,
            password
        });
        res.redirect('/iniciarSesion');
    } catch (error) {
        req.flash('error', error.errors.map(error => error.message));
        res.render('crearCuenta', {
            mensajes: req.flash(),
            title: 'Crear cuenta en Uptask',
            email,
            password
        })
    }

}