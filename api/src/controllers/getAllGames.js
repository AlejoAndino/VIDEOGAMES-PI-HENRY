require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios');
const { sequelize } = require('../DB_connection');
const { Videogame, Genre } = require('../DB_connection'); 

const getApiData = async () => {
    let games = [];
    let page = 1;

    while (games.length < 100) {
        const apiUrl = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${page}`);
        const apiInfo = await apiUrl.data.results.map( el => {
            return {
                id: el.id,
                name: el.name,
                platforms: el.platforms.map( el => el.platform.name),
                image: el.background_image,
                released: el.released,
                rating: el.rating
            }
        });
        games = games.concat(apiInfo);
        page++;
    }
    return games;
};

const getDbInfo = async () => {
    return await Videogame.findAll({
        include: {
            model: Genre,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    })
};

const getAllGames = async () => {
    const apiInfo = await getApiData();
    const dbInfo = await getDbInfo();
    const totalData = apiInfo.concat(dbInfo);
    return totalData;
};

module.exports = {
    getAllGames
}