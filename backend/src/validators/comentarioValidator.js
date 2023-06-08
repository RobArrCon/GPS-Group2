const { check } = require('express-validator')
const { validateResult } = require('../helpers/validateHelper')

const validateComentario = [

  check('nombreUsuario').exists().not().isEmpty(),
  check('codigoPost').exists().not().isEmpty(),
  check('detalleComentario').exists().not().isEmpty(),

  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateComentario }
