const pool = require('../db')

const createLink = async (req, res, next) => {
  try {
    const { codigoProducto, url, supermercado } = req.body
    const query = await pool.query('SELECT * FROM producto WHERE codigo_producto = $1',
      [codigoProducto])

    if (query.rowCount > 0) {
      const query1 = await pool.query('INSERT INTO link (codigo_producto, url, supermercado) VALUES ($1, $2, $3) RETURNING *',
        [codigoProducto, url, supermercado])
      res.status(200).json(query1.rows[0])
    } else {
      res.status(400).json({ message: 'Este producto no existe en la base de datos' })
    }
  } catch (error) {
    console.error(error)
    next(error)
    res.status(400).json({ message: 'No se pudo ingresar este link en la base de datos' })
  }
}

const getLinks = async (req, res, next) => {
  try {
    const { codigoProducto } = req.params
    console.log(codigoProducto)
    const query = await pool.query('SELECT * FROM link WHERE codigo_producto = $1',
      [codigoProducto])
    res.status(200).json(query.rows)
  } catch (error) {
    next(error)
    res.status(400).json({ message: 'error al acceder al listado de links' })
  }
}

const deleteLink = async (req, res, next) => {
  try {
    const { codigoLink } = req.params
    const query = await pool.query('DELETE FROM link WHERE codigo_link = $1', [codigoLink])
    if (query.rowCount === 0) {
      return res.status(404).json({ message: 'link no encontrada' })
    }
  } catch (error) {
    next(error)
    res.status(400).json({ message: 'error al intetar eliminar el link' })
  }
}

const deleteLinksProducto = async (req, res, next) => {
  try {
    const { codigoProducto } = req.params
    const query = await pool.query('DELETE FROM link WHERE codigo_producto = $1', [codigoProducto])
    if (query.rowCount === 0) {
      return res.status(404).json({ message: 'no existen links de este producto' })
    }
  } catch (error) {
    next(error)
    res.status(400).json({ message: 'error al intetar eliminar los links' })
  }
}

module.exports = {
  createLink,
  getLinks,
  deleteLink,
  deleteLinksProducto

}
