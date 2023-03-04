const app = require('./routes/server');
const { sequelize } = require('./DB_connection');
const { getAllGenres } = require('./controllers/getAllGenres');


sequelize.sync({force: true}).then( async () =>{
    console.log('DB successfully connected');
    // console.log("Soy index.js", await saveApiData());
    // await saveApiData()
    app.listen(3001, () => {
        console.log("Server on port 3001");
    })
}).catch((error)=> {
    console.log(error);
})
