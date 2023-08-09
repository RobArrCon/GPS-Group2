const { check } = require('express-validator')
const { validateResult } = require('../helpers/validateHelper')

const validateLink = [
  check('url').exists().not().isEmpty(),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateLink }
