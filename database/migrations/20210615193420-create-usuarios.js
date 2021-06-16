'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('usuarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
          isEmail: {
            msg : 'Agrega un Correo Válido'
          },
          notEmpty: {
            msg: 'El e-mail no puede ir vacio' 
          },
          unique: {
            args: true,
            msg: 'Usuario Ya Registrado'
          }
        }
      },
      password: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'El password no puede ir vacio' 
          }
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('usuarios');
  }
};