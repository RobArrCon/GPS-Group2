const pool = require('../db')

const createReceta = async (req, res, next) => {
  try {
    const { codigoReceta, nombreReceta, descripcionReceta } = req.body
    const query = await pool.query('INSERT INTO receta (codigo_receta, nombre_receta, descripcion_receta) VALUES($1,$2,$3) RETURNING *',
      [codigoReceta, nombreReceta, descripcionReceta])
    res.status(200).json(query.row[0])
  } catch (error) {
    next(error)
    res.status(400).json({ message: 'No se pudo ingresar esta receta en la base de datos' })
  }
}

const getAllRecetas = async (req, res, next) => {
  try {
    const query = await pool.query('SELECT * FROM receta')
    res.status(200).json(query.rows)
  } catch (error) {
    next(error)
    res.status(400).json({ message: 'error al acceder a la tabla de recetas' })
  }
}

const getOneReceta = async (req, res, next) => {
  try {
    const { nombreReceta } = req.params
    const query = await pool.query('SELECT * FROM receta WHERE nombre_receta=$1', [nombreReceta])
    res.status(200).json(query.row[0])
  } catch (error) {
    next(error)
    res.status(400).json({ message: 'no se se encontró la receta' })
  }
}

const deleteReceta = async (req, res, next) => {
  try {
    const { nombreReceta } = req.params
    const query = await pool.query('DELETE FROM receta WHERE nombre_receta = $1', [nombreReceta])
    if (query.rowCount === 0) {
      return res.status(404).json({ message: 'receta no encontrada' })
    }
    return res.status(200).json({ message: 'receta eliminada exitosamente' })
  } catch (error) {}
}

const updateReceta = async (req, res, next) => {
  try {
    const { codigoReceta, nombreReceta, descripcionReceta } = req.body
    const query = await pool.query(
      'UPDATE receta SET nombre_receta = $2, descripcion_receta = $3 WHERE codigo_receta = $1 RETURNING *',
      [codigoReceta, nombreReceta, descripcionReceta]
    )
    if (query.rowCount === 0) {
      return res.status(404).json({ message: 'receta no encontrada' })
    }
    res.status(200).json(query.rows[0])
  } catch (error) {
    next(error)
    res.status(400).json({ message: 'Error en actualizar esta receta en la base de datos' })
  }
}

module.exports = {
  createReceta,
  getAllRecetas,
  getOneReceta,
  deleteReceta,
  updateReceta
}