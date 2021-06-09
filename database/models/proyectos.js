'use strict';
const {
  Model
} = require('sequelize');
const slug = require('slug');
const shortid = require('shortid');
module.exports = (sequelize, DataTypes) => {
  class Proyectos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Proyectos.init({
    name: DataTypes.STRING,
    url: DataTypes.STRING
  },{
    sequelize,
    modelName: 'Proyectos',
    hooks: {
      beforeCreate(proyecto) {
        const url = slug(proyecto.name).toLowerCase();

        proyecto.url = `${url}-${shortid.generate()}`;
      }
  }}
  );
  return Proyectos;
};