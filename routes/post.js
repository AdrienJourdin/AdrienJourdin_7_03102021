const express = require('express');
const auth = require('../middleware/auth');
const verifAuthor=require('../middleware/verifAuthorBeforeUpdateDeletePost');
const verifContent=require('../middleware/informationsPostValidation');
//Creation de la route
const router = express.Router();

//import des controllers
const postCtrl = require('../controllers/post');
const likeCtrl = require('../controllers/like');
const commentCtrl = require('../controllers/comment');



//Definition des routes pour les posts
router.post('/',verifContent.verifPost, postCtrl.create);
router.get('/getLatest',postCtrl.getLatest);
router.get('/', postCtrl.getAll);
router.get('/:postId', postCtrl.getOne);
router.delete('/:postId',verifAuthor,postCtrl.delete);
router.put('/:postId',verifAuthor,verifContent.verifPost, postCtrl.update);
router.post('/:postId/like',likeCtrl.like);
router.post('/:postId/comment',verifContent.verifComment,commentCtrl.create);
router.delete('/comment/:commentId',verifAuthor, commentCtrl.delete);
router.get('/:postId/comment/', commentCtrl.getAllforOnePost);
router.get('/:postId/comment/:commentId', commentCtrl.getOne);
router.put('/comment/:commentId',verifAuthor,verifContent.verifComment, commentCtrl.update);

//Export des routes
module.exports = router;