'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    

     await queryInterface.bulkInsert('users', [{
       id:1,
        lastName: 'Admin',
        firstName: 'Admin',
        email: 'admin@admin.com',
        password:'$2b$10$MfANXCEwoQL.Bvmy0BLuaefF5c5AF46iM6nFqEPwy7oXp9rKCvA22', 
        role:"admin",
        imageUrl:"",
        createdAt:"2021-12-02 15:49:47",
        updatedAt:"2021-12-02 15:49:47"
     }], {});
    
  },

  down: async (queryInterface, Sequelize) => {

    return queryInterface.dropTable('users')
  }
};