const { Router } = require('express')
const { createIngrediente, getAllIngrediente, getOneIngrediente, deleteIngrediente, updateIngrediente } = require('../controller/ingrediente.controller')

const router = Router()

router.post('/ingrediente', createIngrediente)
router.get('/ingrediente', getAllIngrediente)
router.get('/ingrediente/:nombre', getOneIngrediente)
router.delete('/ingrediente/:nombre', deleteIngrediente)
router.put('/ingrediente/:nombre', updateIngrediente)

module.exports = router
