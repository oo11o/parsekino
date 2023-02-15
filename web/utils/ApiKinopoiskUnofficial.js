const axios = require('axios');

class ApiKinopoiskUnofficial {
    static async films(id) {
        const url = `https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}`;
        const result = await axios.get(url, {
                headers: {
                    'X-API-KEY': '9dac6e68-86fb-4f14-93d7-b49e209cb365',
                    'Content-Type': 'application/json',
                }
        });

        if( result.status !== 200 ) {
            throw new Error(`Error API. Status: ${result.status} `);
        }

        return result.data;
    }
}

module.exports = ApiKinopoiskUnofficial;