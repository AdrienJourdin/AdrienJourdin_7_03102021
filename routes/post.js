const express = require('express');
const auth = require('../middleware/auth');
const verifAuthor=require('../middleware/verifAuthor');
const verifContent=require('../middleware/informationsPostValidation');
//Creation de la route
const router = express.Router();

//import des controllers
const postCtrl = require('../controllers/post');
const likeCtrl = require('../controllers/like');
const commentCtrl = require('../controllers/comment');



//Definition des routes pour les posts
router.post('/',auth,verifContent.verifPost, postCtrl.create);
router.get('/getLatest',auth,postCtrl.getLatest);
router.get('/',auth, postCtrl.getAll);
router.get('/:postId',auth, postCtrl.getOne);
router.delete('/:postId', auth,verifAuthor,postCtrl.delete);
router.put('/:postId',auth,verifAuthor,verifContent.verifPost, postCtrl.update);
router.post('/:postId/like',auth,likeCtrl.like);
router.post('/:postId/comment',auth,verifContent.verifComment,commentCtrl.create);
router.delete('/comment/:commentId',auth,verifAuthor, commentCtrl.delete);
router.get('/:postId/comment/',auth, commentCtrl.getAllforOnePost);
router.get('/:postId/comment/:commentId',auth, commentCtrl.getOne);
router.put('/comment/:commentId',auth,verifAuthor,verifContent.verifComment, commentCtrl.update);

//Export des routes
module.exports = router;