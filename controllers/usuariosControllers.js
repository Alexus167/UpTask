const Usuarios = require('../database/models/usuarios');
const enviarEmail = require('../handlers/email');

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

        //URL de confirmacion
        const confirmarUrl = `http://${req.headers.host}/confirmar/${email}`;

        //objeto de usuario
        const usuario = {
            email
        }

        //enviar email
        await enviarEmail.enviar({
            usuario,
            subject: 'Bienvenido a UpTask',
            confirmarUrl,
            archivo: 'confirmarCuenta'
        });
        req.flash('correcto', 'Se envió un mail a tu correo, confirma tu cuenta');
        res.redirect('/iniciarSesion')
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

exports.formIniciarSesion = (req,res) => {
    const {error} = res.locals.mensajes
    res.render('iniciarSesion', {
        title: 'Iniciar sesión en Uptask',
        error
    })
}

exports.formRestablecerPassword = (req,res) => {
    res.render('reestablecer', {
        title: 'Reestablece tu contraseña'
    })
}

//cambia el estado de una cuenta
exports.confirmarCuenta = async (req,res) => {
    const usuario = await Usuarios.findOne({
        where: {
            email: req.params.correo
        }
    })

    if(!usuario) {
        req.flash('error', 'No valido');
        res.redirect('crearCuenta');
    }

    usuario.activo = 1
    await usuario.save();

    req.flash('correcto', 'Cuenta activada correctamente');
    res.redirect('iniciarSesion');
}