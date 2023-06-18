const { check } = require('express-validator')
const { validateResult } = require('../helpers/validateHelper.js')

const validateProductoReceta = [

  check('codigoReceta')
    .exists().notEmpty(),
  check('codigoProducto')
    .exists().notEmpty(),

  (req, res, next) => {
    validateResult(req, res, next)
  }]

module.exports = { validateProductoReceta }
