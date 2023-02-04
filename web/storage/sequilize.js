const { Sequelize } = require('sequelize');
const path = require('path');
const envPath = path.join(__dirname, '..', '.env');

require('dotenv').config({ path: envPath });
console.log('The number of PORT is:', process.env.DB_PORT);

const DB_PORT = process.env.DB_PORT;
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const sequilize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'postgres'
});

console.log(sequilize.options)
module.exports = sequilize;