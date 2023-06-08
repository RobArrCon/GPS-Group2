const { Router } = require('express')
const { createPost, createComentario, getAllPost, getAllPostUsuario, getOnePost, updatePost, deletePost } = require('../controllers/post.controller')
const { validatePost } = require('../validators/postValidator')
const { validateComentario } = require('../validators/comentarioValidator')

const router = Router()

router.post('/post', validatePost, createPost)
router.post('/post/comentario', validateComentario, createComentario)
router.get('/posts', getAllPost)
router.get('/posts/:nombreUsuario', getAllPostUsuario)
router.get('/post/:codigoPost', getOnePost)
router.put('/post/update', updatePost)
router.delete('/post/delete/:codigoPost', deletePost)

module.exports = router
