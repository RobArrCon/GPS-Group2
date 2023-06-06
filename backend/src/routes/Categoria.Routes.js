const { Router } = require('express')
const { createCategoria, deleteCategoria, getOneCategoria, getAllCategorias, updateCategoria } = require('../controller/Categoria.Controller')
const { validateCategoria } = require('../validators/categoriaValidator')

const router = Router()

router.post('/categoria', validateCategoria, createCategoria)
router.delete('/categoria/:nombreCategoria', deleteCategoria)
router.get('/categoria/:nombreCategoria', getOneCategoria)
router.get('/categorias', getAllCategorias)
router.put('/categoria', updateCategoria)

module.exports = router
