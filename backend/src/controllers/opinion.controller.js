const pool = require('../db')

const createOpinion = async (req, res, next) => {
  try {
    const { nombreusuarioopinion, codigoproducto, detalleopinion, numvaloracion, fechaopinion } = req.body
    const query = await pool.query('INSERT INTO Opinion (nombre_usuario, codigo_producto, detalle_opinion, num_valoracion, fecha_opinion ) VALUES($1,$2,$3,$4,$5) RETURNING *',
      [nombreusuarioopinion, codigoproducto, detalleopinion, numvaloracion, fechaopinion])
    res.status(200).json(query.rows[0])
  } catch (error) {
    next(error)
    res.status(400).json({ message: 'No se pudo crear tu opinion en la base de datos' })
  }
}

const getAllOpinion = async (req, res, next) => {
  try {
    const query = await pool.query('SELECT * FROM Opinion')
    res.status(200).json(query.rows)
  } catch (error) {
    next(error)
    res.status(400).json({ message: 'error al acceder a la tabla de opiniones' })
  }
}

const getOneOpinion = async (req, res, next) => {
  try {
    const { codigoproducto } = req.params
    const query = await pool.query('SELECT * FROM Opinion WHERE codigo_producto=$1', [codigoproducto])
    res.status(200).json(query.rows[0])
  } catch (error) {
    next(error)
    res.status(400).json({ message: 'no se se encontro la opinion' })
  }
}

const DeleteOpinion = async (req, res, next) => {
  try {
    const { codigoproducto } = req.params
    const query = await pool.query('DELETE FROM Opinion WHERE codigo_producto=$1', [codigoproducto])
    if (query.rowCount === 0) {
      return res.status(404).json({ message: 'Opinion no encontrado' })
    }
    return res.status(200).json({ message: 'Opinion eliminada exitosamente' })
  } catch (error) {}
}

const updateOpinion = async (req, res, next) => {
  try {
    const { codigoproducto, detalleopinion, fechaopinion, numvaloracion } = req.body
    const query = await pool.query('UPDATE Opinion SET detalle_opinion= $2 , fecha_opinion=$3, num_valoracion= $4 WHERE codigo_producto= $1 RETURNING *',
      [codigoproducto, detalleopinion, fechaopinion, numvaloracion])
    if (query.rowCount === 0) {
      return res.status(404).json({ message: 'Opinion no encontrada' })
    }
    return res.status(200).json({ message: 'Opinion modificada exitosamente' })
  } catch (error) {
    next(error)
    res.status(400).json({ message: 'no se modifico la opinion' })
  }
}

module.exports = {
  createOpinion,
  getAllOpinion,
  getOneOpinion,
  DeleteOpinion,
  updateOpinion
}
