const Country = county('../models/year');
const { Op, sequelize } = require("sequelize");

class CountryRepository {
    static async create($data) {
        return await Country.create({
            $data
        });
    }

    static async findByName($country) {
        return await Country.find({ where: { name_ru: $country} });
    }

}

module.exports = CountryRepository;

