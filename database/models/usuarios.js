'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  class usuarios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Usuarios.hasMany(models.Proyectos,{
        as : "proyectos"
      })
    }
  };
  usuarios.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'usuarios',
    hooks: {
      beforeCreate(usuario) {
        usuario.password = bcrypt.hashSync(usuario.password,bcrypt.genSaltSync(10));
      }
  },
  });
  //metodo personalizado
  Usuarios.prototype.verificarPassword = function(password){
    return bcrypt.compareSync(password, this.password);
  }
  return usuarios;
};