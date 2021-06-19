const passport = require('passport');
const crypto = require('crypto');
const Usuarios = require('../database/models/usuarios');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const bcrypt = require('bcrypt');



exports.autenticarUsuario = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/iniciarSesion',
    failureFlash: true,
    badRequestMessage: 'Los campos son obligatorios'
});

//revisa si el usuario esta logueado
exports.usuarioAutenticado = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/iniciarSesion');
}

//logout
exports.cerrarSesion = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/iniciarSesion');
    })
}

//genera token con usuario valido
exports.enviarToken = async (req,res) => {
    //verifica que el user exista
    const {email} = req.body
    const usuario = await Usuarios.findOne({where: { email }});

    //si no existe
    if(!usuario) {
        req.flash('error', 'No existe esa cuenta')
        res.redirect('/reestablecer');
    }

    //si existe
    usuario.token = crypto.randomBytes(20).toString('hex');
    usuario.expiracion = Date.now() + 3600000;

    //guardo en la bd
    await usuario.save();

    //url de reset
    const resetUrl = `http://${req.headers.host}/reestablecer/${ususario.token}`;
}

exports.resetPassword = async (req, res) => {
    const usuario = await Usuarios.findOne({
        where: {
            token: req.params.token
        }
    });

    //sino encuentra el usuario
    if(!usuario) {
        req.flash('error', 'No es válido');
        res.redirect('/reestablecer');
    }

    //formulario para generar el password
    res.render('resetPassword', {
        title: 'Reestablecer Contraseña'
    })
}

//cambio password
exports.actualizarPassword = async (req,res) =>  {

    //verifica token valido y expiración
    const usuario = await Usuarios.findOne&({
        where: {
            token: req.params.token,
            expiracion: {
                [Op.gte] : Date.now()
            }
        }
    });
    if(!ususario) {
        req.flash('error', 'No valido');
        res.redirect('/reestablecer');
    }

    //hash en nuevo password
    usuario.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    usuario.token = null;
    usuario.expiracion = null;

    //guarda nuevo password
    await usuario.save();

    req.flash('correcto', 'Password modificado correctamente');
    res.redirect('/iniciarSesion');

}