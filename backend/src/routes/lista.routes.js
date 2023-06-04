const { Router } = require('express')
const { createLista, createListaFav, addToLista, getAllListasUsuario, getAllListas, getOneLista, deleteLista } = require('../controllers/lista.controller')

const router = Router()

router.post('/lista', createLista)
router.post('/lista/fav', createListaFav)
router.post('/lista/item', addToLista)
router.get('/listas/:correoUsuario', getAllListasUsuario)
router.get('/listas', getAllListas)
router.get('/lista/:codigoLista', getOneLista)
router.delete('/lista/delete/:codigoLista', deleteLista)

module.exports = router
