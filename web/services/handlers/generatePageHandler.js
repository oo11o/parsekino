const minYear = 1790;
const maxYear = 2025

const generate = (year, page = 1) => {
    if (year < minYear || year > maxYear) {
        throw new Error(`year must be greater than ${minYear} and less than ${maxYear}`);
    }
    return `https://www.kinopoisk.ru/lists/movies/year--${year}/?sort=rating&page=${page}`;
}

module.exports = generate;