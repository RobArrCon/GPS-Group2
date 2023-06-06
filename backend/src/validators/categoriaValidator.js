const { check } = require('express-validator')
const { validateResult } = require('../helpers/validateHelpers')

const validateCategoria = [
  check('nombreCategoria').exists().not().isEmpty().matches(/^[A-ZÑa-zñáéíóúÁÉÍÓÚ'°]+$/),
  check('descripcionCategoria').exists().not().isEmpty().isLength({ min: 10, max: 45 }).withMessage('fallo el contenido'),

  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateCategoria }
