const express = require('express');
const auth = require('../middleware/auth');
const verifInfosUser=require('../middleware/informationsUserValidation');
const verifRoleBeforeUpdateDelete=require('../middleware/verifRoleBeforeDeleteUpdateUser');
const verifRoleSignup=require('../middleware/verifRoleBeforeSignUp');
const VerifInfosBeforeUpdateUser=require('../middleware/VerifInfosBeforeUpdateUser')
const multer=require('../middleware/multer-config');
//Creation de la route
const router = express.Router();

//import des controllers
const userCtrl = require('../controllers/user');

//Definition des routes
router.post('/signup',multer,verifRoleSignup,verifInfosUser, userCtrl.signup);
router.post('/login',userCtrl.login);
router.delete('/:userId',auth,verifRoleBeforeUpdateDelete,userCtrl.delete);
router.put('/:userId',multer,auth,verifRoleBeforeUpdateDelete,VerifInfosBeforeUpdateUser,userCtrl.update);
router.get('/:userId',auth,userCtrl.getOne);
router.get('/',userCtrl.getAll);

//Export des routes
module.exports = router;