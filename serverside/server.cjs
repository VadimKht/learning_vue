const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { networkInterfaces } = require('os')

const DbInfo = require("./db.config.cjs")

const app = express();
// temporary solution to finding only MY, creator's ipv4 for cors
const my_ipv4_addr = networkInterfaces().wlp4s0[0].address;

var corsOptions = {
  // the :4173 port is temporary solution for that one time i wanted my phone to be able to connect 
  origin: ["http://" + my_ipv4_addr + ":5173", 
  "http://" + my_ipv4_addr + ":4173", 
  "http://localhost:5173",
  "http://localhost:4173"]
};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
const db = require("./models/index.cjs");

require("./routes/tutorial.routes.cjs")(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;

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