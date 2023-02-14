const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../sequilize')

const CountryMovie = sequelize.define('country_movie', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    country_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    movie_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },


    createdAt: { type: Sequelize.DATE, field: 'created_at', defaultValue: DataTypes.NOW },
    updatedAt: { type: Sequelize.DATE, field: 'updated_at', defaultValue: sequelize.literal('CURRENT_TIMESTAMP')},
}, {
    // Other model options go here
    freezeTableName: true
});


(async () => {
    await sequelize.sync({ force: true });
})();

module.exports = CountryMovie;