const sql = require("./db.js");

const Post=function(post){
    this.title=post.title;
    this.content=post.content;
    this.link=post.link;
    this.likes=post.likes;
    this.dislikes=post.dislikes;
}

//Methode pour créer un post dans la BDD SQL
Post.create = (newPost, result) => {
    sql.query("INSERT INTO posts SET ?", newPost, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created post: ", { id: res.insertId, ...newPost });
      result(null, { id: res.insertId, ...newPost });
    });
  };





module.exports = Post;

