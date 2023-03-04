require('dotenv').config();
const { Sequelize } = require('sequelize');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
const videogameModel  = require('./models/Videogame');
const genreModel = require('./models/Genre');


const sequelize = new Sequelize(
   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
   { 
      logging: false , native: false
   }
   );
   
   //console.log("soy nueva instancia", sequelize);
   
   videogameModel(sequelize);
   genreModel(sequelize)
   //console.log("soy el modelo char", characterModel(sequelize));

   const { Videogame, Genre } = sequelize.models;

   Genre.belongsToMany(Videogame, { through: "Videogame_Genres"});
   Videogame.belongsToMany(Genre, { through: "Videogame_Genres"})

module.exports = {
   sequelize,
   ...sequelize.models,
};