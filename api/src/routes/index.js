const express = require('express');
const router = express.Router();
const { getGameById } = require('../controllers/getGameById');
const { getAllGames } = require('../controllers/getAllGames');
const { getAllGenres } = require('../controllers/getAllGenres');
const { postGame } = require('../controllers/postGame');
const { getGameByName } = require('../controllers/getGameByName');


router.get('/videogames', getAllGames);

router.get('/videogame/:idVideogame', getGameById);

router.get('/videogames/name', getGameByName);

router.post('/videogames', postGame);

router.get('/genres', getAllGenres);




// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
