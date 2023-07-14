const { check } = require('express-validator')
const { validateResult } = require('../helpers/validateHelper')

const validateIngrediente = [

  check('nombre').exists().not().isEmpty().matches(/^[A-ZÑa-zñáéíóúÁÉÍÓÚ'°]+$/),
  check('descripcion').exists().not().isEmpty(),

  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateIngrediente }
