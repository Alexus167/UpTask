const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//Ref al modelo a autenticar
const Usuarios = require('../models/usuarios');

//local strategy - login con credenciales propias
passport.use(
    new LocalStrategy(
        //por default passport espera un user y password
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {
            try {
                const usuario = await Usuario.findOne({
                    where: { email:email}
                });
                //El usuario existe pero el password es incorrecto
                if(!usuario.verificarPassword(password)) {
                    return done(null, false, {
                        message: 'Password incorrecto'
                    })
                }
                //email existe pero el password es correcto
                return done(null, usuario);
            } catch (error) {
                return done(null, false, {
                    message: 'Esa cuenta no existe'
                })
            }
        }
    )
);

//serializa el usuario
passport.serializeUser((usuario, callback) => {
    callback(null, usuario);
});
//deserializa el usuario
passport.deserializeUser((usuario, callback) => {
    callback(null, usuario);
});

module.exports = passport;