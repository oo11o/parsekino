const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../sequilize')

const Year = sequelize.define('years', {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },

    count_movies: {
      type: DataTypes.INTEGER,
      defaultValue: null
    },

    count_scan_movies: {
      type: DataTypes.INTEGER,
      defaultValue: null
    },

    status: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },

    createdAt: { type: Sequelize.DATE, field: 'created_at', defaultValue: DataTypes.NOW },
    updatedAt: { type: Sequelize.DATE, field: 'updated_at' },
  }, {
    // Other model options go here
  });

  // (async () => {
  //   await sequelize.sync({ force: true });
  // })();

  module.exports = Year
