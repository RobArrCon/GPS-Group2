const { Router } = require('express')
const { createReceta, getAllRecetas, getOneReceta, deleteReceta, updateReceta } = require('../controllers/recetas.controller')

const router = Router()

router.post('/receta', createReceta)
router.get('/recetas', getAllRecetas)
router.get('/receta/:receta_id', getOneReceta)
router.delete('/receta/:receta_id', deleteReceta)
router.post('/receta/update', updateReceta)

module.exports = router
