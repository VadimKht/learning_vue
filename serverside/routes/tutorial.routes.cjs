module.exports = app => {
    const tutorials = require("../controllers/tutorial.controller.cjs");
  
    var router = require("express").Router();
  
    // register
    router.post("/Register", tutorials.create);
    router.post("/PostMsg", tutorials.postMSG);
    router.get("/GetMsg_page:page", tutorials.getPosts);
    router.get("/GetMsg_page", tutorials.getPostsNoId);
    router.get("/GetMsg", tutorials.getPostsNoId);
    router.get("/GetMsgPages", tutorials.getMsgPages);
    router.get("/ping",tutorials.ping);
  
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
  