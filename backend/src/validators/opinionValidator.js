const { check } = require('express-validator')
const { validateResult } = require('../helpers/validateHelper')

const validateOpinion = [
  check('nombreusuario').exists().not().isEmpty().withMessage('Debe ingresar un nombre'),
  check('codigoproducto').exists().not().isEmpty(), //  .isNumeric(), //matches(/^[A-ZÑa-zñáéíóúÁÉÍÓÚ'°]+$/)
  check('detalleopinion').exists().not().isEmpty().withMessage('Debe ingresar detalle de opinion'),
  check('fechaopinion').exists().not().isEmpty().isDate(),
  check('numvaloracion').exists().not().isEmpty().isNumeric().withMessage('La valoracion debe ser un numero.'),

  (req, res, next) => {
    validateResult(req, res, next)
  }
]
module.exports = { validateOpinion }
