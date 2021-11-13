const express = require('express');
const auth = require('../middleware/auth');
const verifInfosUser=require('../middleware/informationsUserValidation');
const verifBeforeUpdateDelete=require('../middleware/verifBeforeUpdateDeleteUser')

//Creation de la route
const router = express.Router();

//import des controllers
const userCtrl = require('../controllers/user');

//Definition des routes
router.post('/signup',verifInfosUser, userCtrl.signup);
router.get('/login',userCtrl.login);
router.delete('/:userId',verifBeforeUpdateDelete,userCtrl.delete);
router.put('/:userId',verifBeforeUpdateDelete,verifInfosUser,userCtrl.update);
router.get('/:userId',userCtrl.getOne);
router.get('/',userCtrl.getAll);

//Export des routes
module.exports = router;