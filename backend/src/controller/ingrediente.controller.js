const pool = require('../db')

const createIngrediente = async (req, res, next) => {
  try {
    const { codigo, nombre, descripcion, categoria } = req.body
    const query = await pool.query('INSERT INTO ingrediente (codigo_ingrediente,nombre_ingrediente,descripcion_ingrediente,categoria_ingrediente) VALUES($1,$2,$3,$4) RETURNING *',
      [codigo, nombre, descripcion, categoria])
    res.status(200).json(query.rows[0])
  } catch (error) {
    next(error)
    res.status(400).json({ message: 'No se pudo ingresar ingrediente en la base de datos' })
  }
}

const getAllIngrediente = async (req, res, next) => {
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

module.exports = {
  createIngrediente,
  getAllIngrediente,
  getOneIngrediente,
  deleteIngrediente,
  updateIngrediente
}
