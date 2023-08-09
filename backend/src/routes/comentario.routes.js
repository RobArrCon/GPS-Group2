const { Router } = require('express')
const { createComentario, getAllComentarioPost, getAllComentarioUsuario, getAllComentarios, deleteComentario } = require('../controllers/comentario.controller')
const { validateComentario } = require('../validators/comentarioValidator')

const router = Router()

router.post('/comentario', validateComentario, createComentario)
router.get('/comentario/post/:codigoPost', getAllComentarioPost)
router.delete('/comentario/post/:codigoComentario', deleteComentario)
router.get('/comentario/post', getAllComentarios)
router.get('/comentario/usuario/:nombreUsuario', getAllComentarioUsuario)

module.exports = router
