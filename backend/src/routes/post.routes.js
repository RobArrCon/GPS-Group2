const { Router } = require('express')
const { createPost, getAllPost, getAllPostUsuario, getOnePost, updatePost, deletePost, getPostsAndComments } = require('../controllers/post.controller')
const { validatePost } = require('../validators/postValidator')

const router = Router()

router.post('/post', validatePost, createPost)
router.get('/posts', getAllPost)
router.get('/posts/:nombreUsuario', getAllPostUsuario)
router.get('/post/:codigoPost', getOnePost)
router.get('/postComments', getPostsAndComments)
router.put('/post/update', updatePost)
router.delete('/post/delete/:codigoPost', deletePost)

module.exports = router
