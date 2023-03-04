const express = require('express');
const router = express.Router();
const { getGameById } = require('../controllers/getGameById');
const { getAllGames } = require('../controllers/getAllGames');
const { getAllGenres } = require('../controllers/getAllGenres');
const { postGame } = require('../controllers/postGame');


router.get('/videogames', async (req, res) => {
    try {
        const allVideogames = await getAllGames();
        res.status(200).json(allVideogames)
    } 
    catch (error) {
        res.status(400).send({error: "getAllGames " + error.message})
    }
});

router.get('/videogames/:idVideogame', getGameById);

router.post('/videogames', postGame);

router.get('/genres', getAllGenres);




// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
