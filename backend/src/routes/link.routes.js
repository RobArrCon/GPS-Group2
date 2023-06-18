const { Router } = require('express')
const { createLink, getLinks, deleteLink, deleteLinksProducto } = require('../controllers/link.controller')
const { validateLink } = require('../validators/linkValidator')

const router = Router()

router.post('/link', validateLink, createLink)
router.get('/links', getLinks)
router.delete('/link/delete/:link', deleteLink)
router.delete('/link/delete/:producto', deleteLinksProducto)

module.exports = router
