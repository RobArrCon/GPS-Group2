const { Router } = require('express')
const { createIngrediente, getAllIngrediente, getOneIngrediente, deleteIngrediente, updateIngrediente, addToIngrediente, deleteFromIngrediente, createIngredienteInProduct, getIngredientesInProducto, getNombresIngredientes } = require('../controllers/ingrediente.controller')
const { validateIngrediente } = require('../validators/ingredienteValidator')
const router = Router()

router.post('/ingrediente', validateIngrediente, createIngrediente)
router.get('/ingrediente', getAllIngrediente)
router.get('/ingrediente/:nombre', getOneIngrediente)
router.delete('/ingrediente/:nombre', deleteIngrediente)
router.put('/ingrediente/:codigo', updateIngrediente)
router.post('/ingrediente/item', addToIngrediente)
router.delete('/lista/delete/producto', deleteFromIngrediente)

// Agregados por bryan para pagina de productos
router.post('/conectar', createIngredienteInProduct)
router.get('/enproductos/:codigoProducto', getIngredientesInProducto)
router.get('/nombres', getNombresIngredientes)

module.exports = router
