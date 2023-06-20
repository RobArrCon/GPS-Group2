const { Router } = require('express')
const { createComentario, getAllComentarioPost, getAllComentarioUsuario } = require('../controllers/comentario.controller')
const { validateComentario } = require('../validators/comentarioValidator')

const router = Router()

router.post('/comentario', validateComentario, createComentario)
router.get('/comentario/post/:codigoPost', getAllComentarioPost)
router.get('/comentario/usuario/:nombreUsuario', getAllComentarioUsuario)

module.exports = router
