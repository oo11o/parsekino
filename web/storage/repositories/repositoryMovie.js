const Movie = require('../models/movie');
const { Op, sequelize } = require("sequelize");
class RepositoryMovie {
    static async add(movie) {
        let result;
        try {
            result = await Movie.create(movie);
        } catch (e) {
            if( (e?.parent?.message).includes('duplicate key value')) {
                return {
                    status: 'error',
                    message: 'duplicate key value'
                }
                throw new Error(`Can't insert movie \n ${e.message}`);
            }
        }
        return {
            status: 'ok',
            id: result.id,
        }

    }

    static async updateMovie(id, updateData) {
        return await Movie.update(updateData, {
            where: {
                id: id
            }
        });
    }
}

module.exports = RepositoryMovie;

