const { Router } = require('express')
const { createIngrediente, getAllIngrediente, getOneIngrediente, deleteIngrediente, updateIngrediente } = require('../controller/ingrediente.controller')

const router = Router()

router.post('/ingrediente', createIngrediente)
router.get('/ingrediente', getAllIngrediente)
router.get('/ingrediente', getOneIngrediente)
router.delete('/ingrediente', deleteIngrediente)
router.put('/ingrediente', updateIngrediente)

module.exports = router
