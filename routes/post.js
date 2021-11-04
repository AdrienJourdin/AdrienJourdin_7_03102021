const express = require('express');
const auth = require('../middleware/auth');

//Creation de la route
const router = express.Router();

//import des controllers
const postCtrl = require('../controllers/post');

//Definition des routes
router.post('/', postCtrl.create);

//Export des routes
module.exports = router;