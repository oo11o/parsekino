const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../sequilize')

const Movie = sequelize.define('movies', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    kinopoisk_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },

    kinopoisk_url: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    kinopoisk_image: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    imdb_id: {
        type: DataTypes.STRING(40),
        allowNull: true,
    },

    name_ru: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    name_en: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    name_original: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    slogan: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },

    shortDescription: {
        type: DataTypes.TEXT,
        allowNull: true,
    },

    poster_url: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    poster_url_preview: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    cover_url: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    logo_url: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    reviews_count: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },

    rating_good_review: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },

    rating_good_review_vote_count: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },

    rating_kinopoisk: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },

    rating_kinopoisk_vote_count: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },

    rating_imdb: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },

    rating_imdb_vote_count: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },

    rating_film_critics: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },

    rating_film_critics_vote_count: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },

    rating_await: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },

    rating_await_count: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },

    rating_rf_critics: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },

    rating_rf_critics_vote_count: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },

    year: {
        type: DataTypes.SMALLINT,
        allowNull: true,
    },

    film_length: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },

    production_status: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    type: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },

    rating_mpaa: {
        type: DataTypes.STRING(30),
        allowNull: true,
    },

    rating_age_limits: {
        type: DataTypes.STRING(30),
        allowNull: true,
    },

    has_imax: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },

    has_3D: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },

    start_year: {
        type: DataTypes.SMALLINT,
        allowNull: true,
    },

    end_year: {
        type: DataTypes.SMALLINT,
        allowNull: true,
    },

    is_serial: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },

    is_short_film: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },

    is_completed: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },

    status: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    createdAt: { type: Sequelize.DATE, field: 'created_at', defaultValue: DataTypes.NOW },
    updatedAt: { type: Sequelize.DATE, field: 'updated_at', defaultValue: sequelize.literal('CURRENT_TIMESTAMP')},
}, {
    // Other model options go here
});

// (async () => {
//     await sequelize.sync({alter:true});
// })();

module.exports = Movie;