const { check } = require('express-validator')
const { validateResult } = require('../helpers/validateHelper')

const validatePost = [

  check('codigoPost').exists().not().isEmpty(),
  check('tituloPost').exists().not().isEmpty(),
  check('detallePost').exists().not().isEmpty(),
  check('nombreUsuario').exists().not().isEmpty(),

  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validatePost }
