const { Router } = require('express')
const { addProductoReceta, getAllProductosInReceta, getAllRecetasWithProducto, deleteProductoReceta } = require('../controllers/recetas_productos.controller')
const { validateProductoReceta } = require('../validators/recetaProductoValidator')

const router = Router()

router.post('/receta/add', validateProductoReceta, addProductoReceta)
router.get('/receta/search/:codigoReceta', getAllProductosInReceta)
router.get('/receta/search/:codigoProducto', getAllRecetasWithProducto)
router.delete('/receta/:codigoReceta/:codigoProducto', deleteProductoReceta)

module.exports = router
