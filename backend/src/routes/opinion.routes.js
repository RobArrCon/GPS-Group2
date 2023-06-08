const { Router } = require('express')
const { createOpinion, getAllOpinion, getOneOpinion, DeleteOpinion, updateOpinion } = require('../controllers/opinion.controller')
const { validateOpinion } = require('../validators/opinionValidator')
const router = Router()

router.post('/opinion', validateOpinion, createOpinion)
router.get('/opiniones', getAllOpinion)
router.get('/opinion/:codigoproducto', getOneOpinion)
router.delete('/opinion/:codigoproducto', DeleteOpinion)
router.put('/opinion/update', updateOpinion)

module.exports = router
