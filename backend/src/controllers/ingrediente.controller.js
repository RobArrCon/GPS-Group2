const pool = require('../db')

const createIngrediente = async (req, res, next) => {
  try {
    const { nombre, descripcion, categoria } = req.body
    const query = await pool.query('INSERT INTO ingrediente (nombre_ingrediente,descripcion_ingrediente,categoria_ingrediente) VALUES($1,$2,$3) RETURNING *',
      [nombre, descripcion, categoria])
    const query2 = await pool.query('SELECT * FROM ingrediente WHERE nombre_ingrediente = $1')
    if (query2 > 0) {
      res.status(400302).json({ message: 'Este ingrediente ya existe' })
    } else {
      res.status(200).json(query.rows[0])
    }
  } catch (error) {
    next(error)
    res.status(400).json({ message: 'No se pudo ingresar ingrediente en la base de datos' })
  }
}

async function getAllIngrediente (req, res, next) {
  try {
    const query = await pool.query('SELECT * FROM ingrediente')
    res.status(200).json(query.rows)
  } catch (error) {
    next(error)
    res.status(400).json({ message: 'error al acceder a la tabla' })
  }
}

const getOneIngrediente = async (req, res, next) => {
  try {
    const { nombre } = req.params
    const query = await pool.query('SELECT * FROM ingrediente WHERE nombre_ingrediente=$1', [nombre])
    res.status(200).json(query.rows[0])
  } catch (error) {
    next(error)
    res.status(400).json({ message: 'no se se encontro el ingrediente' })
  }
}

const deleteIngrediente = async (req, res, next) => {
  try {
    const { nombre } = req.params
    const query = await pool.query('DELETE FROM ingrediente WHERE nombre_ingrediente = $1', [nombre])
    if (query.rowCount === 0) {
      return res.status(404).json({ message: 'Ingrediente no encontrado' })
    }
    return res.status(200).json({ message: 'ingrediente eliminado exitosamente' })
  } catch (error) {
    next(error)
    res.status(400).json({ message: 'no se se elimino el ingrediente' })
  }
}

const updateIngrediente = async (req, res, next) => {
  try {
    const { codigo, nombre, descripcion, categoria } = req.body
    const query = await pool.query(
      'UPDATE ingrediente SET nombre_ingrediente = $2, descripcion_ingrediente = $3, categoria_ingrediente = $4 WHERE codigo_ingrediente = $1 RETURNING *',
      [codigo, nombre, descripcion, categoria])
    if (query.rowCount === 0) {
      return res.status(404).json({ message: 'Ingrediente no encontrado' })
    }
    return res.status(200).json({ message: 'ingrediente modificado exitosamente' })
  } catch (error) {
    next(error)
    res.status(400).json({ message: 'no se modifico el ingrediente' })
  }
}

const addToIngrediente = async (req, res, next) => {
  try {
    const { codigoProducto, codigo } = req.body

    const query1 = await pool.query('SELECT * FROM ingrediente WHERE codigo_producto = $1', [codigoProducto])
    const query2 = await pool.query('SELECT * FROM ingrediente WHERE codigo_ingrediente = $2', [codigo])

    if (query1.rowCount > 0 && query2.rowCount > 0) {
      const query = await pool.query('INSERT INTO ingrediente (codigo_producto, codigo_ingrediente) VALUES($1,$2) RETURNING *',
        [codigoProducto, codigo])
      res.status(200).json(query.rows[0])
    } else {
      res.status(404).json({ message: 'Este ingrediente no fue encontrado en la base de datos' })
    }
  } catch (error) {
    next(error)
    res.status(400).json({ message: 'No es posible añadir el ingrediente' })
  }
}

const deleteFromIngrediente = async (req, res, next) => {
  try {
    const { codigo, codigoProducto } = req.body
    const query = await pool.query('DELETE FROM ingrediente WHERE codigo = $1 AND codigo_producto = $2',
      [codigo, codigoProducto])
    if (query.rowCount === 0) {
      return res.status(404).json({ message: 'ingrediente no encontrado' })
    }
    return res.status(200).json({ message: 'ingrediente eliminado exitosamente' })
  } catch (error) {}
}

module.exports = {
  createIngrediente,
  getAllIngrediente,
  getOneIngrediente,
  deleteIngrediente,
  updateIngrediente,
  addToIngrediente,
  deleteFromIngrediente
}
