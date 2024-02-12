module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("post", {
      creator: {
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.STRING
      }
    });
  
    return Post;
  };
  