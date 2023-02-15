const Genre = require('../models/genre');
const { Op, sequelize } = require("sequelize");

class GenreRepository {
    static async create($data) {
        return await Genre.create({
            $data
        });
    }
    static async find() {

    }
}

module.exports = GenreRepository;