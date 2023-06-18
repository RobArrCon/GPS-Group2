const pool = require('../db.js')

const addProductoReceta = async (req, res, next) => {
  try {
    const { codigoReceta, codigoProducto } = req.body
    const query = await pool.query('INSERT INTO Producto_IN_Receta (codigo_receta, codigo_producto) VALUES($1, $2) RETURNING *',
      [codigoReceta, codigoProducto])
    res.status(200).json(query.rows[0])
  } catch (error) {
    next(error)
    res.status(400).json({ message: 'No se pudo ingresar este producto a la receta' })
  }
}

const getAllProductosInReceta = async (req, res, next) => {
  try {
    const { codigoReceta } = req.params
    const query = await pool.query('SELECT p.codigo_producto, p.nombre_producto, p.descripcion_producto, p.informacion_nutricional, p.nombre_categoria FROM productos p, productos_in_receta pir WHERE $1 = pir.codigo_receta AND pir.codigo_producto = p.codigo_producto', [codigoReceta])
    res.status(200).json(query.rows)
  } catch (error) {
    next(error)
    res.status(400).json({ message: 'error al acceder a la tabla de recetas' })
  }
}

const getAllRecetasWithProducto = async (req, res, next) => {
  try {
    const { codigoProducto } = req.params
    const query = await pool.query('SELECT r.codigo_receta, r.nombre_receta, r.preparacion, r.nombre_usuario FROM receta r, producto_in_receta pir WHERE pir.codigo_producto=$1 AND pir.codigo_receta = r.codigo_receta', [codigoProducto])
    res.status(200).json(query.rows[0])
  } catch (error) {
    next(error)
    res.status(400).json({ message: 'no se se encontró la receta' })
  }
}

const deleteProductoReceta = async (req, res, next) => {
  try {
    const { codigoReceta, codigoProducto } = req.params
    const query = await pool.query('DELETE FROM Producto_IN_Receta WHERE codigo_receta = $1 AND codigo_producto = $2', [codigoReceta, codigoProducto])
    if (query.rowCount === 0) {
      return res.status(404).json({ message: 'producto no encontrado en receta' })
    }
    return res.status(200).json({ message: 'producto removido de la receta' })
  } catch (error) {}
}

module.exports = {
  addProductoReceta,
  getAllProductosInReceta,
  getAllRecetasWithProducto,
  deleteProductoReceta
}
