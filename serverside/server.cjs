const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { networkInterfaces } = require('os');
var path = require ('path');

const DbInfo = require("./db.config.cjs");

const app = express();

var corsOptions = {
  // the :4173 port is temporary solution for that one time i wanted my phone to be able to connect 
  origin: [
  "http://localhost:5173",
  "http://localhost:4173",
  "http://localhost:8080",
  "http://127.0.0.1:8080",
  "http://127.0.0.1:5173"]
};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
const db = require("./models/index.cjs");

require("./routes/tutorial.routes.cjs")(app);

// set port, listen for requests
// if you change it, also go ahead and change it in frontend src/http-common.js 
const PORT = 8080;

var router = require("express").Router();
app.use(express.static(path.join(__dirname, 'views')),);
app.set('view engine', 'ejs');

router.get("/", (req,res)=>{
  res.render('index');
});
app.use(router);


// remove force or change to false to stop dropping all tables
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
}).catch(err => {
  if(err.name == "SequelizeConnectionRefusedError"){ 
    console.log("Please turn on your local database server first!");
    return;
  } 
  if(err.name == "SequelizeConnectionError"){
    console.log("It seems you don't have a database called " + DbInfo.DB + ". Please either create one by manually adding it, or if you prefer to connect to existing one, change db.config.cjs DB field. \nP.S. the chosen database will have all tables dropped for debugging purposes.\nP.S.S. later i might find a way to make database automatically")
    return;
  }
  console.log("Unexpected error! \n" + err);
  return;
});

