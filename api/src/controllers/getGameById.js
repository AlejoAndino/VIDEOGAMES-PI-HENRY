require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios');
const { Videogame, Genre } = require('../DB_connection');

const getGameById = async (req, res) => {
    try {
        const { idVideogame } = req.params;

        if (idVideogame.includes('-')) {
            const videogameDb = await Videogame.findByPk(idVideogame, { include: Genre});
            res.status(200).json(videogameDb);
        } else {
            const response = await axios(`https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`);
            const data = response.data;
            const videogame = {
                id: data.id,
                name: data.name,
                description: data.description,
                platforms: data.platforms.map(plat => plat.platform.name),
                image: data.background_image,
                released: data.released,
                rating: data.rating,
                genres: data.genres.map(e => e.name)
            }
            res.status(200).json(videogame);
        }

    } 
    catch (error) {
        res.status(400).send("Videojuego no encontrado.");
    }
}

module.exports = {
    getGameById
}