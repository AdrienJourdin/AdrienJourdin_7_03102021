module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("post", {
      title: {
        type: Sequelize.STRING,
        isAlphanumeric: true
      },
      content: {
        type: Sequelize.STRING(1023),
        isAlphanumeric: true
      },
      likes: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      dislikes: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      usersLiked: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
        defaultValue: "[]"
      },
      usersDisliked: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
        defaultValue: "[]"
      },
      userId: {
        type: Sequelize.INTEGER
      },
    });
  
    return Post;
  };