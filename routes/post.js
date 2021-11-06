const express = require('express');
const auth = require('../middleware/auth');

//Creation de la route
const router = express.Router();

//import des controllers
const postCtrl = require('../controllers/post');

//Definition des routes
router.post('/', postCtrl.create);
router.get('/getLatest',postCtrl.getLatest);
router.get('/', postCtrl.getAll);
router.get('/:postId', postCtrl.getOne);
router.delete('/:postId', postCtrl.delete);
router.put('/:postId', postCtrl.update);
router.put('/like/:postId',postCtrl.like);


//Export des routes
module.exports = router;