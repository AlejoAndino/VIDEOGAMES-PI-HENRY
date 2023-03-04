require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios');
const { Genre } = require('../DB_connection');

const getAllGenres = async (req, res) => {
    try {
        const genresApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
        const dataGenre = genresApi.data.results.map(el => el.name);
        dataGenre.forEach(el => {
            Genre.findOrCreate({
                where: { name: el }
            })
        })
        const allGenres = await Genre.findAll();
        res.status(200).json(allGenres);
    }
    catch (error) {
        res.status(400).send({ error: "GetAllGenres " + error.message });
    }
}

module.exports = {
    getAllGenres
}