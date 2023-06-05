const { check } = require('express-validator')
const { validateResult } = require('../helpers/validateHelpers.js')

const validatedReceta = [

  check('codigoReceta')
    .exists().notEmpty()
    .isInt(),
  check('nombreReceta')
    .exists().notEmpty(),
  check('preparacion')
    .exists().notEmpty(),

  (req, res, next) => {
    validateResult(req, res, next)
  }]

export default validatedReceta
