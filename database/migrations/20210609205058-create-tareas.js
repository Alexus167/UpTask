'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Tareas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tarea: {
        type: Sequelize.STRING
      },
      estado: {
        type: Sequelize.INTEGER(1)
      },
      proyectoId: {
          type: Sequelize.INTEGER,
          references : {
            model: {
              tableName : 'Proyectos'
            },
            key :'id'
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
    await queryInterface.dropTable('Tareas');
  }
};