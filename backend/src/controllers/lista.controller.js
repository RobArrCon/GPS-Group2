const pool = require('../db')

const createLista = async (req, res, next) => {
  try {
    const { nombreLista, nombreUsuario } = req.body
    const query = await pool.query('INSERT INTO listaCompra (nombre_lista, nombre_usuario) VALUES($1,$2,$3) RETURNING *',
      [nombreLista, nombreUsuario])
    res.status(200).json(query.rows[0])
  } catch (error) {
    next(error)
    res.status(400).json({ message: 'No es posible crear la lista' })
  }
}

const addToLista = async (req, res, next) => {
  try {
    const { codigoProducto, codigoLista } = req.body
    const query = await pool.query('INSERT INTO Producto_IN_ListaCompra (codigo_producto, codigo_lista) VALUES($1,$2) RETURNING *',
      [codigoProducto, codigoLista])
    res.status(200).json(query.rows[0])
  } catch (error) {
    next(error)
    res.status(400).json({ message: 'No es posible añadir producto' })
  }
}

const createListaFav = async (req, res, next) => {
  try {
    const { nombreUsuario } = req.body
    const query = await pool.query('INSERT INTO listaCompra (nombre_lista, nombre_usuario) VALUES($1,$2,$3) RETURNING *',
      ['Favoritos', nombreUsuario])
    res.status(200).json(query.rows[0])
  } catch (error) {
    next(error)
    res.status(400).json({ message: 'No es posible crear la lista' })
  }
}

const getAllListasUsuario = async (req, res, next) => {
  try {
    const { nombreUsuario } = req.params
    const query = await pool.query('SELECT * FROM listaCompra WHERE nombre_usuario=$1', [nombreUsuario])
    res.status(200).json(query.rows)
  } catch (error) {
    next(error)
    res.status(400).json({ message: 'Error al obtener el contenido' })
  }
}

const getAllListas = async (req, res, next) => {
  try {
    const query = await pool.query('SELECT * FROM listaCompra')
    res.status(200).json(query.rows)
  } catch (error) {
    next(error)
    res.status(400).json({ message: 'Error al obtener el contenido' })
  }
}

const getOneLista = async (req, res, next) => {
  try {
    const { codigoLista } = req.params
    const query = await pool.query('SELECT * FROM listaCompra WHERE codigo_lista=$1', [codigoLista])
    res.status(200).json(query.rows[0])
  } catch (error) {
    next(error)
    res.status(400).json({ message: 'Lista no encontrada' })
  }
}

const deleteLista = async (req, res, next) => {
  try {
    const { codigoLista } = req.params
    const query = await pool.query('DELETE FROM listaCompra WHERE codigo_lista = $1', [codigoLista])
    if (query.rowCount === 0) {
      return res.status(404).json({ message: 'Lista no encontrada' })
    }
    return res.status(200).json({ message: 'Lista eliminada exitosamente' })
  } catch (error) {}
}

module.exports = {
  createLista,
  createListaFav,
  addToLista,
  getAllListasUsuario,
  getAllListas,
  getOneLista,
  deleteLista
}
