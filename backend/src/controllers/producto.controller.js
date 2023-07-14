const pool = require('../db')

const createProducto = async (req, res, next) => {
  try {
    const { nombreProducto, descripcionProducto, informacionNutricionalProducto } = req.body
    const query = await pool.query('INSERT INTO producto ( nombre_producto, descripcion_producto, informacion_nutricional) VALUES($1,$2,$3,$4) RETURNING *',
      [ nombreProducto, descripcionProducto, informacionNutricionalProducto])
    res.status(200).json(query.rows[0])
  } catch (error) {
    next(error)
    res.status(400).json({ message: 'No se pudo ingresar este producto en la base de datos' })
  }
}

const getAllProducto = async (req, res, next) => {
  try {
    const query = await pool.query('SELECT * FROM producto')
    res.status(200).json(query.rows)
  } catch (error) {
    next(error)
    res.status(400).json({ message: 'error al acceder a la tabla de producto' })
  }
}

const getOneProducto = async (req, res, next) => {
  try {
    const { nombreProducto } = req.params
    const query = await pool.query('SELECT * FROM producto WHERE nombre_producto = $1', [nombreProducto])
    if (query.rowCount === 0) {
      return res.status(404).json({ message: 'Producto no encontrado por nombre' })
    }
    res.json(query.rows[0])
  } catch (error) {
    next(error)
    res.status(400).json({ message: 'no se se encontró el producto por nombre' })
  }
}

const getOneProductoCod = async (req, res, next) => {
  try {
    const { codigoProducto } = req.params
    const query = await pool.query('SELECT * FROM producto WHERE codigo_producto = $1', [codigoProducto])
    if (query.rowCount === 0) {
      return res.status(404).json({ message: 'Producto no encontrado por codigo' })
    }
    res.json(query.rows[0])
  } catch (error) {
    next(error)
    res.status(400).json({ message: 'no se se encontró el producto por codigo' })
  }
}
// SELECT * FROM producto WHERE nombre_producto LIKE '%nombre_producto%'
const searchProducto = async (req, res, next) => {
  try {
    const { nombreProducto } = req.params
    const query = await pool.query('SELECT * FROM producto WHERE nombre_producto LIKE $1', ['%' + nombreProducto + '%'])
    if (query.rowCount === 0) {
      return res.status(404).json({ message: 'no se encontraron productos con ese nombre' })
    }
    res.json(query.rows)
  } catch (error) {
    next(error)
    res.status(400).json({ message: 'ups!, ocurrio un error' })
  }
}

const deleteProducto = async (req, res, next) => {
  try {
    const { codigoProducto } = req.params
    const query = await pool.query('DELETE FROM producto WHERE codigo_producto = $1', [codigoProducto])
    if (query.rowCount === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' })
    }
    return res.status(200).json({ message: 'Producto eliminado exitosamente' })
  } catch (error) {
    next(error)
    res.status(400).json({ message: 'ups!, ocurrio un error' })
  }
}

const petitionProducto = async (req, res, next) => {
  try {
    const { codigoProducto, nombreProducto, descripcionProducto, informacionNutricionalProducto } = req.body
    const query = await pool.query('INSERT INTO producto (codigo_producto, nombre_producto, descripcion_producto, informacion_nutricional) VALUES($1,$2,$3,$4) RETURNING *',
      [codigoProducto, nombreProducto, descripcionProducto, informacionNutricionalProducto])
    res.status(200).json(query.rows[0])
  } catch (error) {
    next(error)
    res.status(400).json({ message: 'No se pudo ingresar este producto en la base de datos' })
  }
}

const classifyProducto = async (req, res, next) => {
  try {
    const { codigoProducto, nombreCategoria } = req.body

    const query = await pool.query('UPDATE producto SET nombre_categoria = $1 WHERE codigo_producto = $2 RETURNING *',
      [nombreCategoria, codigoProducto])
    res.status(200).json(query.rows[0])
  } catch (error) {
    next(error)
    res.status(400).json({ message: 'No se pudo ingresar este producto en la base de datos' })
  }
}

/*
const classifyProducto = async (req, res, next) => {
  try {
    const { codigoProducto, } = req.body
    const query = await pool.query(
      'UPDATE producto SET  = $1, nombre_producto = $2, descripcion_producto = $3, informacion_nutricional = $4,  WHERE codigo_producto = $1 RETURNING *',
      [codigoProducto]
    )
    if (query.rowCount === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' })
    }
    res.status(200).json(query.rows[0])
  } catch (error) {
    next(error)
    res.status(400).json({ message: 'ups!, ocurrio un error' })
  }
} */

const updateProducto = async (req, res, next) => {
  try {
    const { codigoProducto, nombreProducto, descripcionProducto, informacionNutricionalProducto } = req.body
    const query = await pool.query(
      'UPDATE producto SET  nombre_producto = $2, descripcion_producto = $3, informacion_nutricional = $4  WHERE codigo_producto = $1 RETURNING *',
      [codigoProducto, nombreProducto, descripcionProducto, informacionNutricionalProducto]
    )
    if (query.rowCount === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' })
    }
    res.status(200).json(query.rows[0])
  } catch (error) {
    next(error)
    res.status(400).json({ message: 'ups!, ocurrio un error' })
  }
}

module.exports = {
  createProducto,
  getAllProducto,
  getOneProducto,
  getOneProductoCod,
  searchProducto,
  deleteProducto,
  petitionProducto,
  classifyProducto,
  updateProducto
}
