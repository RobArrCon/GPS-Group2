const { Router } = require('express')
const { createReceta, getAllRecetas, getOneReceta, deleteReceta, updateReceta } = require('../controllers/recetas.controller')

const router = Router()

router.post('/receta', createReceta)
router.get('/recetas', getAllRecetas)
router.get('/receta/:nombreReceta', getOneReceta)
router.delete('/receta/:nombreReceta', deleteReceta)
router.put('/receta/update', updateReceta)

module.exports = router
