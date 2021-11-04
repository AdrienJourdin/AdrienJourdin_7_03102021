const express = require('express');

//Creation de la route
const router = express.Router();

//import des controllers
const userCtrl = require('../controllers/user');

//Definition des routes
router.post('/signup', userCtrl.signup);
router.get('/login',userCtrl.login);
router.delete('/delete/:id',userCtrl.delete);

//Export des routes
module.exports = router;