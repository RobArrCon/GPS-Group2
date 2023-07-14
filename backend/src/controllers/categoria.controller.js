const pool = require('../db')

const createCategoria = async (req, res, next) => {
  try {
    const { nombreCategoria, descripcionCategoria } = req.body

    const query1 = await pool.query('SELECT * FROM categoria WHERE nombre_categoria = $1', [nombreCategoria])

    if (query1.rowCount === 0) {
      const query = await pool.query('INSERT INTO categoria (nombre_categoria, descripcion_categoria) VALUES($1,$2) RETURNING *',
        [nombreCategoria, descripcionCategoria])
      res.status(200).json(query.rows[0])
    } else {
      res.status(302).json({ message: 'Esta categoria ya existe.' })
    }
  } catch (error) {
    next(error)
    res.status(400).json({ message: 'No se pudo ingresar esta categoría en la base de datos' })
  }
}

const getAllCategorias = async (req, res, next) => {
  try {
    const query = await pool.query('SELECT * FROM categoria')
    res.status(200).json(query.rows)
  } catch (error) {
    next(error)
    res.status(400).json({ message: 'error al acceder a la tabla de categorías' })
  }
}

const getOneCategoria = async (req, res, next) => {
  try {
    const { nombreCategoria } = req.params
    const query = await pool.query('SELECT * FROM categoria WHERE nombre_categoria = $1', [nombreCategoria])
    if (query.rowCount === 0) {
      return res.status(404).json({ message: 'Categoría no encontrada' })
    }
    res.json(query.rows[0])
  } catch (error) {
    next(error)
    res.status(400).json({ message: 'no se se encontró la categoría' })
  }
}

const deleteCategoria = async (req, res, next) => {
  try {
    const { nombreCategoria } = req.params
    const query = await pool.query('DELETE FROM categoria WHERE nombre_categoria = $1', [nombreCategoria])
    if (query.rowCount === 0) {
      return res.status(404).json({ message: 'Categoría no encontrada' })
    }
    return res.status(200).json({ message: 'Categoría eliminada exitosamente' })
  } catch (error) {
    next(error)
    res.status(400).json({ message: 'no se se encontro el usuario' })
  }
}

const updateCategoria = async (req, res, next) => {
  try {
    const { nombreCategoria, descripcionCategoria } = req.body
    const query = await pool.query(
      'UPDATE categoria SET nombre_categoria = $1, descripcion_categoria = $2 WHERE nombre_categoria = $1 RETURNING *',
      [nombreCategoria, descripcionCategoria]
    )
    if (query.rowCount === 0) {
      return res.status(404).json({ message: 'Categoría no encontrada' })
    }
    res.status(200).json(query.rows[0])
  } catch (error) {
    next(error)
    res.status(400).json({ message: 'Error en actualizar esta categoría en la base de datos' })
  }
}

module.exports = {
  createCategoria,
  getAllCategorias,
  getOneCategoria,
  deleteCategoria,
  updateCategoria
}
