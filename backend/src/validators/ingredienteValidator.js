const { check } = require('express-validator')
const { validateResult } = require('../helpers/validateHelper')

const validateIngrediente = [

  (req, res, next) => {
    check('nombre').exists().not().isEmpty().matches(/^[A-ZÑa-zñáéíóúÁÉÍÓÚ'°]+$/)
    check('descripcion').exists().not().isEmpty()
    check('categoria').exists().not().isEmpty()
    validateResult(req, res, next)
  }
]

module.exports = { validateIngrediente }
