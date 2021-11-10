module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define("post",
    {
      title: {
        type: Sequelize.STRING,
        isAlphanumeric: true,
      },
      content: {
        type: Sequelize.STRING(1023),
        isAlphanumeric: true,
      },
    }
  );
  
  return Post;
};
