const { check } = require('express-validator')
const { validateResult } = require('../helpers/validateHelper')

const validateUsuario = [

  check('usuario').exists().not().isEmpty().matches(/^[A-ZÑa-zñáéíóúÁÉÍÓÚ'°]+$/),
  check('correo').exists().not().isEmpty().isEmail(),
  check('contrasena').exists().not().isEmpty().isLength({ min: 8 }),
  check('rol').exists().not().isEmpty().isIn(['usuario', 'administrador']),

  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateUsuario }
