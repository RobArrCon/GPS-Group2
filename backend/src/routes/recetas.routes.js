const { Router } = require('express')
const { createReceta, getAllRecetas, getOneRecetaByName, getOneRecetaByCode, deleteReceta, updateReceta } = require('../controllers/recetas.controller')

const router = Router()

router.post('/receta', createReceta)
router.get('/recetas', getAllRecetas)
router.get('/receta/:nombreReceta', getOneRecetaByName)
router.get('/receta/:codigoReceta', getOneRecetaByCode)
router.delete('/receta/:nombreReceta', deleteReceta)
router.put('/receta/:codigoReceta', updateReceta)

module.exports = router
