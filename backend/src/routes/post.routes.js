const { Router } = require('express')
const { createPost, createComentario, getAllPost, getAllPostUsuario, getOnePost, updatePost, deletePost } = require('../controllers/post.controller')

const router = Router()

router.post('/post', createPost)
router.post('/post/comentario', createComentario)
router.get('/posts', getAllPost)
router.get('/posts/:correoUsuario', getAllPostUsuario)
router.get('/post/:codigoPost', getOnePost)
router.put('/post/update', updatePost)
router.delete('/post/delete/:codigoPost', deletePost)

module.exports = router
