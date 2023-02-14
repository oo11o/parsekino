const Year = require('../models/year');
const { Op, sequelize } = require("sequelize");

class RepositoryYear {
    static async addYear(year) {
        return await Year.create({
            year
        });
    }
    static async findYearForScan() {
       return await Year.findOne(
           {
               raw: true,
               where:
              {
                 status:  0
              },
               order: ['year']
           }
       )
    }

    static async updateYear(id, updateData) {
        return await Year.update(updateData, {
            where: {
                id: id
            }
        });
    }
}

module.exports = RepositoryYear;

