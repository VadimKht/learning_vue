const db = require("../models/index.cjs");
const Usertype = db.users;
const Posttype = db.posts;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.username) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    let token = Math.random().toString(); // for now
    // Create a user
    const user = {
      username: req.body.username,
      password: req.body.password,
      verified: false,
      token: token
    };

    Usertype.findOne({where: {username: user.username}}).then(data=>{
      if(data != null){
        res.status(409).send({message: "such username is already registered =/"});
        return;
      }
      if(data == null){
        // Save user in the database
        Usertype.create(user)
        .then(data => {
          res.status(201).send({message: "successful register!", token: token});
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the user"
          });
        });
      }})
  };

  exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    Usertype.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };
  exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Usertype.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Tutorial with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Tutorial with id=" + id
        });
      });
  };


  exports.delete = (req, res) => {
    const id = req.params.id;
  
    Usertype.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Tutorial was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Tutorial with id=" + id
        });
      });
  };

exports.testCredentials = (req,res) =>{
  const usern = req.body.username;
  const passw = req.body.password;
  const usr = Usertype.findOne({ where: { username: usern } }).then( user => {
    if(user == null)
    {
      res.status(400).send({message: "no such user!"});
      return;
    }
    if(passw == user.password){
      res.status(201).send({message: "successful log in!", token: user.token});
      return;
    }
    res.status(401).send({message: "incorrect password"});
  });
}

exports.postMSG = (req,res) =>{
  if(req.body.token == null){
    res.status(400).send({message:"incorrect request. please have a token in request"});
    return;
  }
  // check if anyone exists with such token
  Usertype.findOne({ where: { token: req.body.token } }).then(usertoken=>{
    if(usertoken == null)
    {
      res.status(401).send({message:"no such token registered"});
      return;
    }

    const postpost = {
      creator: usertoken.username,
      content: req.body.data
    };

    Posttype.create(postpost).catch(err=>res.status(500).send({message: err}));
    res.status(201).send({message:"successful post!"});
  });
}
exports.getPosts = (req,res) => {
  const page = req.params.page;
  if(isNaN(Number(page))){
    res.status(400).send({message: "you are supposed to request page, not a letter"});
    return;
  }
  Posttype.findAll({
    where: {
      id: {
        [Op.between]: [page*10-10, page*10]
      }
    }
  }).then(a=>res.send(a));
}
exports.getPostsNoId = (req,res)=>{

  Posttype.count({ 
    where: {
      content:{
        [Op.like]: '%'
      }
    }
  }).then(count => {
    if(count >= 100){
      res.status(400).send({message: "too much posts, please use /GetMsg_page1 (add number!) instead"});
      return;
    }
    Posttype.findAll({
      where:{
        content:{
          [Op.like]: '%'
        }
      }
    }).then(a=>res.status(200).send(a));
  })
}

exports.getMsgPages = (req,res)=>{
  Posttype.count({ 
    where: {
      content:{
        [Op.like]: '%'
      }
    }
  }).then(count=>{
    const pages = Math.ceil(count/10);
    res.status(200).send(pages.toString());
  });
}

exports.ping = (req,res) =>{
  res.status(200).send({message: "pong"});
}

exports.GetPostN = (req,res) =>{
  const id = req.params.id;
  if(isNaN(Number(id))){
    res.status(400).send({message: "the query is not a number"})
  }

  Posttype.findByPk(id)
  .then(data=>{
    if(data) {
      res.status(200).send(data);
    }
    else{
      res.status(404).send({message: "post with this id doesn't exist"});
    }
  }).catch(err=>{
    res.status(500).send({message: "serverside error", error: err})
  });

}