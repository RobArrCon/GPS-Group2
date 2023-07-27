const { check } = require('express-validator')
const { validateResult } = require('../helpers/validateHelper')

const validateProducto = [

  check('nombreProducto').exists().not().isEmpty().matches(/^[A-ZÑa-zñáéíóúÁÉÍÓÚ'°]+$/),
  check('descripcionProducto').exists().not().isEmpty().isLength({ min: 10, max: 500 }).withMessage('fallo el contenido'),

  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateProducto }
