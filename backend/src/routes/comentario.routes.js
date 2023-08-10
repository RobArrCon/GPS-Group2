const { Router } = require('express')
const { createComentario, getAllComentarioPost, getAllComentarios } = require('../controllers/comentario.controller')
const { validateComentario } = require('../validators/comentarioValidator')

const router = Router()

router.post('/comentario', validateComentario, createComentario)
router.get('/comentario/post/:codigoPost', getAllComentarioPost)
router.get('/comentario/post', getAllComentarios)

module.exports = router
