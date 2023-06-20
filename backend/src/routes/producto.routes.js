const { Router } = require('express')

const { createProducto, getAllProducto, getOneProducto, getOneProductoCod, searchProducto, deleteProducto, petitionProducto, classifyProducto, updateProducto} = require('../controllers/producto.controller')

const { validateProducto } = require('../validators/productoValidator')

const router = Router()

router.post('/producto', createProducto)
router.get('/productos', getAllProducto)
router.get('/producto/:nombreProducto', getOneProducto)
router.get('/productocod/:codigoProducto', getOneProductoCod)
router.get('/buscarproducto/:nombreProducto', searchProducto)
router.delete('/producto/:codigoProducto', deleteProducto)
router.post('/producto/petition', petitionProducto)
router.put('/producto/categoria',classifyProducto)
router.put('/producto', updateProducto)


module.exports = router

