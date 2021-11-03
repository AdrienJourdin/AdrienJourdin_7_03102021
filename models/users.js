const sql = require("./db.js");

const User=(user)=>{
    this.firstName=user.firstName;
    this.lastName=user.lastName;
    this.email=user.email;
    this.password=user.password;
    
};


module.exports = User;