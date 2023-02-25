const CountryMovie = require('../models/country_movie');

class CountryMovieRepository {
    static async create(data) {
        try {
            await CountryMovie.create(data);
        } catch (e) {
            if ((e?.parent?.message).includes('duplicate key value')) {
                return {
                    status: 'ок'
                }
            } else {
                throw new Error('country-movie repository didn"t work');
            }
        }
    }
}

module.exports = CountryMovieRepository;