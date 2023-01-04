
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../connect')

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
    count: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    scan: {
      type: DataTypes.INTEGER,
      defaultValue: 0
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
