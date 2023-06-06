const { Router } = require('express')
const { createReceta, getAllRecetas, getOneReceta, deleteReceta, updateReceta } = require('../controllers/recetas.controller')
const { validateReceta } = require('../validators/recetaValidator')

const router = Router()

router.post('/receta', validateReceta, createReceta)
router.get('/recetas', getAllRecetas)
router.get('/receta/:nombreReceta', getOneReceta)
router.delete('/receta/:nombreReceta', deleteReceta)
router.put('/receta/update', updateReceta)

module.exports = router
