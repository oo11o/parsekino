const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../sequilize')

const Genres = sequelize.define('genres', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    name_ru: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    name_en: {
        type: DataTypes.STRING,
        allowNull: true,
    },


    createdAt: { type: Sequelize.DATE, field: 'created_at', defaultValue: DataTypes.NOW },
    updatedAt: { type: Sequelize.DATE, field: 'updated_at', defaultValue: sequelize.literal('CURRENT_TIMESTAMP')},
}, {
    // Other model options go here
});

module.exports = Genres;