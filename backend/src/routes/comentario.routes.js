const { Router } = require('express')
const { createComentario, getAllComentarioPost } = require('../controllers/comentario.controller')
const { validateComentario } = require('../validators/comentarioValidator')

const router = Router()

router.post('/comentario', validateComentario, createComentario)
router.get('/comentario/post/:codigoPost', getAllComentarioPost)

module.exports = router
