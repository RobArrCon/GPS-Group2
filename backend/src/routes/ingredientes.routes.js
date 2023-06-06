const { Router } = require('express')
const { createIngrediente, getAllIngrediente, getOneIngrediente, deleteIngrediente, updateIngrediente } = require('../controllers/ingrediente.controller')
const { validateIngrediente } = require('../validators/ingredienteValidator')
const router = Router()

router.post('/ingrediente', validateIngrediente, createIngrediente)
router.get('/ingrediente', getAllIngrediente)
router.get('/ingrediente/:nombre', getOneIngrediente)
router.delete('/ingrediente/:nombre', deleteIngrediente)
router.put('/ingrediente/:codigo', updateIngrediente)

module.exports = router
