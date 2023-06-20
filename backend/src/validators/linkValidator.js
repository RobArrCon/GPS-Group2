const { check } = require('express-validator')
const { validateResult } = require('../helpers/validateHelper')

const validateLink = [
  check('url').exists().not().isEmpty().matches(/^(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateLink }
