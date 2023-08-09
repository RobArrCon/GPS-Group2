const pool = require('../db.js')

const createReceta = async (req, res, next) => {
  try {
    const { nombreReceta, nombreUsuario, preparacion } = req.body
    const query = await pool.query('INSERT INTO receta (nombre_receta, nombre_usuario, preparacion) VALUES($1, $2, $3) RETURNING *',
      [nombreReceta, nombreUsuario, preparacion])
    res.status(200).json(query.rows[0])
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
    console.error(error)
    res.status(400).json({ message: 'error al acceder a la tabla de recetas' })
  }
}

const getOneRecetaByName = async (req, res, next) => {
  try {
    const { nombreReceta } = req.params
    const query = await pool.query('SELECT * FROM receta WHERE nombre_receta = $1', [nombreReceta])
    res.status(200).json(query.rows[0])
  } catch (error) {
    next(error)
    res.status(400).json({ message: 'no se se encontró la receta' })
  }
}

const getOneRecetaByCode = async (req, res, next) => {
  try {
    const { nombreReceta } = req.params
    const query = await pool.query('SELECT * FROM receta WHERE codigo_receta = $1', [nombreReceta])
    res.status(200).json(query.rows[0])
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
    const { codigoReceta, nombreReceta, nombreUsuario, preparacion } = req.body
    const query = await pool.query(
      'UPDATE receta SET nombre_receta = $2, nombre_usuario = $3, preparacion = $4 WHERE codigo_receta = $1 RETURNING *',
      [codigoReceta, nombreReceta, nombreUsuario, preparacion]
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
  getOneRecetaByName,
  getOneRecetaByCode,
  deleteReceta,
  updateReceta
}
