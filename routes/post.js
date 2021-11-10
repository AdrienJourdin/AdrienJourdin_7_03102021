const express = require('express');
const auth = require('../middleware/auth');

//Creation de la route
const router = express.Router();

//import des controllers
const postCtrl = require('../controllers/post');
const likeCtrl = require('../controllers/like');
const commentCtrl = require('../controllers/comment');


//Definition des routes pour les posts
router.post('/', postCtrl.create);
router.get('/getLatest',postCtrl.getLatest);
router.get('/', postCtrl.getAll);
router.get('/:postId', postCtrl.getOne);
router.delete('/:postId', postCtrl.delete);
router.put('/:postId', postCtrl.update);
router.post('/:postId/like',likeCtrl.like);
router.post('/:postId/comment',commentCtrl.create);
router.delete('/:postId/comment/:commentId', commentCtrl.delete);
router.get('/:postId/comment/', commentCtrl.getAllforOnePost);
router.get('/:postId/comment/:commentId', commentCtrl.getOne);
router.put('/:postId/comment/:commentId', commentCtrl.update);

//Export des routes
module.exports = router;