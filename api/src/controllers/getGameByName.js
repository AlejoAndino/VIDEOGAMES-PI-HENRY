require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios');
const { Op } = require('sequelize');
const { Videogame, Genre } = require('../DB_connection');

const getGameByName = async (req, res) => {
    try {
        const { name } = req.query;
        const searchName = name.toLowerCase();

        // BUSCA EN LA BASE DE DATOS
        const videogamesDB = await Videogame.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${searchName}%`
                }
            },
            include: Genre
        });
        // BUSCA EN LA API
        const apiUrl = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&search=${searchName}&page_size=15`);
        const videogamesApi = apiUrl.data.results.map(el => {
            return {
                id: el.id,
                name: el.name,
                platforms: el.platforms.map(el => el.platform.name),
                image: el.background_image,
                released: el.released,
                rating: el.rating,
                genres: el.genres.map(el => el.name)
            }
        });
        // COMBINO LOS RESULTADOS
        const allVideogames = [...videogamesDB, ...videogamesApi];

        if (allVideogames.length === 0) {
            res.status(400).send(`No se encontro el juego ${name}`);
        } else {
            res.status(200).json(allVideogames);
        }

    }
    catch (error) {
        res.status(400).send({ error: "GET /videogames/name? " + error.message });
    }
};

module.exports = {
    getGameByName
}