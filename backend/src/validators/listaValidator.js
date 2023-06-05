const { check } = require('express-validator')
const { validateResult } = require('../helpers/validateHelper')

const validateLista = [

  check('codigoLista').exists().not().isEmpty(),
  check('nombreLista').exists().not().isEmpty(),
  check('nombreUsuario').exists().not().isEmpty(),

  (req, res, next) => {
    validateResult(req, res, next)
  }
]

const validateListaFav = [

  check('codigoLista').exists().not().isEmpty(),
  check('nombreUsuario').exists().not().isEmpty(),

  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateLista, validateListaFav }
