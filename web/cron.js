const MovieService  = require('./services/movieService');

const parseMovie = async () => {
    const movieService = new MovieService();
    return await movieService.addMoviesList();
    console.log('--------parse');
    console.log(result)
    process.exit(0);

}

parseMovie();

