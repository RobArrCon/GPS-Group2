const { Router } = require('express')
const { createUsuario, getAllUsuario, getOneUsuario, DeleteUsuario, LoginUsuario, ChangeContrasena } = require('../controllers/usuario.controller')
const { validateUsuario } = require('../validators/usuario.validator')

const router = Router()

router.post('/usuario', validateUsuario, createUsuario)
router.get('/usuarios', getAllUsuario)
router.get('/usuario/:usuario', getOneUsuario)
router.delete('/usuario/:usuario', DeleteUsuario)
router.post('/usuario/login', LoginUsuario)
router.put('/usuario/:usuario', ChangeContrasena)

module.exports = router
