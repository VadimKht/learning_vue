const db = require("../models/index.cjs");
const Usertype = db.users;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {
    // Validate request
    if (!req.body.username) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      console.log("empty");
      return;
    }
  
    // Create a user
    const user = {
      username: req.body.username,
      password: req.body.password,
      verified: false
    };
    
  
    // Save user in the database
    Usertype.create(user)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial."
        });
      });
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
  console.log(findOne({params:{id:1}},{}));
  const usern = req.body.username;
  const passw = req.body.password;
  const usr = Usertype.findOne({ where: { username: usern } }).then( user => {
    if(user == null)
    {
      res.status(400).send({message: "no such user!"});
      return;
    }
    if(passw == user.password){
      res.status(201).send({message: "successful log in!"});
      return;
    }
    res.status(401).send({message: "incorrect password"});
  });
}