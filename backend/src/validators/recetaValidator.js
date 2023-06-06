const { check } = require('express-validator')
const { validateResult } = require('../helpers/validateHelpers.js')

const validateReceta = [

  check('nombreReceta')
    .exists().notEmpty(),
  check('preparacion')
    .exists().notEmpty(),

  (req, res, next) => {
    validateResult(req, res, next)
  }]

module.exports = { validateReceta }
