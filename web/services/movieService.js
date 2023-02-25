const repositoryYear = require('../storage/repositories/repositoryYear');
const repositoryMovie = require('../storage/repositories/repositoryMovie');
const GenreRepository = require('../storage/repositories/GenreRepository');
const CountryRepository = require('../storage/repositories/CountryRepository');
const GenreMovieRepository = require('../storage/repositories/GenreMovieRepository');
const CountryMovieRepository = require('../storage/repositories/CountryMovieRepository');

const Kinopoisk = require('../utils/Kinopoisk');
const ApiKinopoisk = require('../utils/ApiKinopoiskUnofficial');

const kinopoisk = new Kinopoisk();

class MovieService {
    constructor() {
        this.isNeedYearScan = true;
        this.countOnPage = 50;
    }
    async addMoviesList() {
        const yearForScan =  await this.getYearForScan();
        const url = this.generateUrl(yearForScan);
        let countScanMovies = yearForScan.count_scan_movies ?? 0;

        const movies = await kinopoisk.getListMovies(url);

        if (movies.status != 'ok' ) {
            throw new Error("don't have a result of parse");
        }

        if (movies.data.length === 0) { this.isNeedYearScan = false; }

        let countWithoutRating = 0;
        for (const item of movies.data) {
            const rating = item.rating || 0;
            countWithoutRating = rating === 0 ? countWithoutRating += 1 : countWithoutRating;


            const insertValues = {
                kinopoisk_id: item.kinopoisk_id,
                kinopoisk_url: item.kinopoisk_url,
                kinopoisk_image: item.image,
                rating_kinopoisk: rating,
                year: yearForScan.year,
                status: 0
            }
            const result = await repositoryMovie.add(insertValues);
            console.log(result);

            if (result.status === 'ok') {
                countScanMovies += 1;
            }
        }

        console.log('=========CountWithoutRating');
        console.log(countWithoutRating);
        this.isNeedYearScan = countWithoutRating >(this.countOnPage-40)
            ? false
            : true

        const page_scan = yearForScan.page_scan += 1;
        if (!this.isNeedYearScan || countScanMovies === movies.countMovie) {
            return await repositoryYear.updateYear(yearForScan.id,
                {
                    status: 2,
                    count_movies: movies.countMovie,
                    count_scan_movies: countScanMovies,
                    page_scan: page_scan,
                })
        }
        console.log(url);
        console.log(' ');
        console.log('films count');
        console.log(movies.data.length);
        if (countScanMovies) {
            return await repositoryYear.updateYear(yearForScan.id,
                {
                    count_movies: movies.countMovie,
                    count_scan_movies: countScanMovies,
                    page_scan: page_scan,
                })
        }
    }

    async updateMovieFromApi (API = ApiKinopoisk) {
        const countries = [];
        const genres = [];
        const { id: movieId, kinopoisk_id: kinopoiskId } =  await repositoryMovie.getMovieForScan();
        const movieFromApi = await API.getMovie(kinopoiskId);
        if (movieFromApi?.status === 404) {
            return repositoryMovie.updateMovie(movieId, {status:2});
        }
        console.log(movieFromApi);
        for (const item of movieFromApi.countries) {
            const [ {id: countryId} ]= await CountryRepository.findOrCreate(item.country);
            CountryMovieRepository.create({
                country_id: countryId,
                movie_id: movieId
            })
        }
        for (const item of movieFromApi.genres) {
            const [ {id: genreId} ]= await GenreRepository.findOrCreate(item.genre);
            GenreMovieRepository.create({
                genre_id: genreId,
                movie_id: movieId
            })
        }

        const data = {
            imdb_id: movieFromApi.ratingImdb,
            name_ru: movieFromApi.nameRu,
            name_en: movieFromApi.nameEn,
            name_original: movieFromApi.nameOriginal,
            slogan: movieFromApi.slogan,
            description: movieFromApi.description,
            short_description: movieFromApi.shortDescription,
            poster_url: movieFromApi.posterUrl,
            poster_url_preview: movieFromApi.posterUrlPreview,
            cover_url: movieFromApi.coverUrl,
            logo_url: movieFromApi.logoUrl,
            reviews_count: movieFromApi.reviewsCount,
            rating_good_review: movieFromApi.ratingGoodReview,
            rating_good_review_vote_count: movieFromApi.ratingGoodReviewVoteCount,
            rating_kinopoisk: movieFromApi.ratingKinopoisk ?? 0,
            rating_kinopoisk_vote_count: movieFromApi.ratingKinopoiskVoteCount,
            rating_imdb: movieFromApi.ratingImdb,
            rating_imdb_vote_count: movieFromApi.ratingImdbVoteCount,
            rating_film_critics: movieFromApi.ratingFilmCritics,
            rating_film_critics_vote_count: movieFromApi.ratingFilmCriticsVoteCount,
            rating_await: movieFromApi.ratingAwait,
            rating_await_count: movieFromApi.ratingAwaitCount,
            rating_rf_critics: movieFromApi.ratingRfCritics,
            rating_rf_critics_vote_count: movieFromApi.ratingRfCriticsVoteCount,
            film_length: movieFromApi.filmLength,
            production_status: movieFromApi.productionStatus,
            type: movieFromApi.type,
            rating_mpaa: movieFromApi.ratingMpaa,
            rating_age_limits: movieFromApi.ratingAgeLimits,
            has_imax: movieFromApi.hasImax,
            has_3D: movieFromApi.has3D,
            start_year: movieFromApi.startYear,
            end_year: movieFromApi.endYear,
            is_serial: movieFromApi.serial,
            is_short_film: movieFromApi.shortFilm,
            is_completed: movieFromApi.completed,
            status: '1',
            last_sync: movieFromApi.lastSync,
            web_url: movieFromApi.webUrl
        }

        await repositoryMovie.updateMovie(movieId, data);
    }

    generateUrl(yearForScan) {
        return `https://www.kinopoisk.ru/lists/movies/year--${yearForScan.year}/?sort=rating&page=${yearForScan.page_scan}`;
    }

    async getYearForScan() {
        const yearForScan = await repositoryYear.findYearForScan();
        if (!yearForScan) {
             throw new Error("don't find year for scan")
        }
        return yearForScan;
    }
}

// const movieService = new MovieService();
// ( async () => {
//     await movieService.checkMovie();
// })()

module.exports = MovieService;

