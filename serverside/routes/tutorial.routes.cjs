module.exports = app => {
    const tutorials = require("../controllers/tutorial.controller.cjs");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/Register", tutorials.create);
  
    // Retrieve all Tutorials
    router.get("/", tutorials.findAll);
  
    // Retrieve all published Tutorials
    router.post("/Login", tutorials.testCredentials);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", tutorials.findOne);
  
    // Delete a Tutorial with id
    router.delete("/:id", tutorials.delete);
  
    app.use('/api', router);
  };
  