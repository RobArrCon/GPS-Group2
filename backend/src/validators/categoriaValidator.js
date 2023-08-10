const { check } = require('express-validator')
const { validateResult } = require('../helpers/validateHelper')

const validateCategoria = [
  check('nombreCategoria').exists().not().isEmpty().matches(/^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$/),

  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateCategoria }
