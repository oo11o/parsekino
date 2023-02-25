const GenreMovie = require('../models/genre_movie');

class GenreMovieRepository {
    static async create(data) {
        try {
           await GenreMovie.create(data);
        } catch (e) {
            if ((e?.parent?.message).includes('duplicate key value')) {
                return {
                    status: 'ок'
                }
            } else {
                throw new Error('genre-movie repository didn"t work');
            }
        }
    }
}

module.exports = GenreMovieRepository;