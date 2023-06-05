const { check } = require('express-validator')
const { validateResult } = require('../helpers/validateHelpers.js')

const validatedReceta = [
  (req, res, next) => {
    check('codigoReceta')
      .exists().notEmpty()
      .isInt()
    check('nombreReceta')
      .exists().notEmpty()
    check('preparacion')
      .exists().notEmpty()
    validateResult(req, res, next)
  }]

export default validatedReceta
