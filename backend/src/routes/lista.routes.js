const { Router } = require('express')
const { createLista, createListaFav, addToLista, getAllListasUsuario, getAllListas, getOneLista, deleteLista } = require('../controllers/lista.controller')
const { validateLista, validateListaFav } = require('../validators/listaValidator')

const router = Router()

router.post('/lista', validateLista, createLista)
router.post('/lista/fav', validateListaFav, createListaFav)
router.post('/lista/item', addToLista)
router.get('/listas/:nombreUsuario', getAllListasUsuario)
router.get('/listas', getAllListas)
router.get('/lista/:codigoLista', getOneLista)
router.delete('/lista/delete/:codigoLista', deleteLista)

module.exports = router
