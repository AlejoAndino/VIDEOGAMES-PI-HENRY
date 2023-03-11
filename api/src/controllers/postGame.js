const { Videogame, Genre } = require('../DB_connection');


const postGame = async (req, res) => {
    const { name, description, platforms, image, released, rating, genres } = req.body;

    try {
        const videogame = await Videogame.create({
            name,
            description,
            platforms,
            image,
            released,
            rating,
            genres
        });

        // Asociar los géneros indicados con el nuevo videojuego
        const genresDb = await Genre.findAll({ where: { name: genres } });
        await videogame.addGenre(genresDb);
        res.status(200).send('Personaje creado con Exito.');
    }
    catch (error) {
        res.status(400).send({ error: 'PostGame ' + error.message });
    }
};

module.exports = {
    postGame
}