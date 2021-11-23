module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define("post",
    {
      content: {
        type: Sequelize.STRING(1023),
        isAlphanumeric: true,
      },
      imageUrl:{
        type: Sequelize.STRING,
      }
    }
  );
  
  return Post;
};
