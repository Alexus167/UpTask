const passport = require('passport');

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
exportss.cerrarSesion = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/iniciarSesion');
    })
}