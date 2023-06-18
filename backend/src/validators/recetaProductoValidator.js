const { check } = require('express-validator')
const { validateResult } = require('../helpers/validateHelper.js')

const validateProductoReceta = [

  check('codigoReceta')
    .exists().notEmpty()
    .isInt(),
  check('codigoProducto')
    .exists().notEmpty()
    .isInt(),

  (req, res, next) => {
    validateResult(req, res, next)
  }]

module.exports = { validateProductoReceta }
