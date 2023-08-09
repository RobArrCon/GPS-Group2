const { Router } = require('express')
const { createPost, getAllPost, getOnePost, deletePost, getPostsAndComments } = require('../controllers/post.controller')
const { validatePost } = require('../validators/postValidator')

const router = Router()

router.post('/post', validatePost, createPost)
router.get('/posts', getAllPost)
router.get('/post/:codigoPost', getOnePost)
router.get('/postComments', getPostsAndComments)
router.delete('/post/delete/:codigoPost', deletePost)

module.exports = router
