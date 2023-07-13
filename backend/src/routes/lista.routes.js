const { Router } = require('express')
const { createLista, createListaFav, addToLista, getListaFavUsuario, getProductosLista, deleteFromLista, getAllListasUsuario, getAllListas, getOneLista, deleteLista, getCodigoLista } = require('../controllers/lista.controller')
const { validateLista, validateListaFav } = require('../validators/listaValidator')

const router = Router()

router.post('/lista', validateLista, createLista)
router.post('/lista/fav', validateListaFav, createListaFav)
router.post('/lista/item', addToLista)
router.get('/lista/fav/:nombreUsuario', getListaFavUsuario)
router.get('/lista/productos/:codigoLista', getProductosLista)
router.get('/listas/:nombreUsuario', getAllListasUsuario)
router.get('/listas', getAllListas)
router.get('/lista/:codigoLista', getOneLista)
router.get('/lista/codigo/:nombreLista', getCodigoLista)
router.delete('/lista/delete/:codigoLista', deleteLista)
router.delete('/lista/deleteProducto', deleteFromLista)

module.exports = router
