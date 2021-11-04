const sql = require("./db.js");

const Post=function(post){
    this.title=post.title;
    this.content=post.content;
    this.link=post.link;
    this.likes=post.likes;
    this.dislikes=post.dislikes;
}





module.exports = Post;

