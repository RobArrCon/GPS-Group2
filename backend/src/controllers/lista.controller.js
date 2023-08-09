const pool = require('../db')

const createLista = async (req, res, next) => {
  try {
    const { nombreLista, nombreUsuario } = req.body
    const query0 = await pool.query('SELECT * FROM usuario WHERE nombre_usuario = $1', [nombreUsuario])
    if (query0.rowCount === 0) {
      res.status(404).json({ message: 'Usuario no existe' })
    }
    const query1 = await pool.query('SELECT * FROM listaCompra WHERE nombre_lista = $1 AND nombre_usuario = $2', [nombreLista, nombreUsuario])
    if (query1.rowCount === 0) {
      const query = await pool.query('INSERT INTO listaCompra (nombre_lista, nombre_usuario) VALUES($1,$2) RETURNING *',
        [nombreLista, nombreUsuario])
      res.status(200).json(query.rows[0])
    } else {
      res.status(302).json({ message: 'Lista ya existe' })
    }
  } catch (error) {
    next(error)
    res.status(400).json({ message: 'No es posible crear la lista' })
  }
}

const addToLista = async (req, res, next) => {
  try {
    const { codigoProducto, codigoLista } = req.body
    console.log(codigoProducto, codigoLista)
    const query0 = await pool.query('SELECT * FROM producto WHERE codigo_producto = $1', [codigoProducto])
    if (query0.rowCount === 0) {
      res.status(404).json({ message: 'Producto no existe' })
    }
    const query1 = await pool.query('SELECT * FROM listaCompra WHERE codigo_lista = $1', [codigoLista])
    if (query1.rowCount === 0) {
      res.status(404).json({ message: 'Lista no existe' })
    }
    const query2 = await pool.query('SELECT * FROM Producto_IN_ListaCompra WHERE codigo_producto = $1 AND codigo_lista = $2', [codigoProducto, codigoLista])
    if (query2.rowCount === 0) {
      const query = await pool.query('INSERT INTO Producto_IN_ListaCompra (codigo_producto, codigo_lista) VALUES($1,$2) RETURNING *',
        [codigoProducto, codigoLista])
      res.status(200).json(query.rows[0])
    } else {
      res.status(302).json({ message: 'Producto ya existe en la lista' })
    }
  } catch (error) {
    next(error)
    res.status(400).json({ message: 'No es posible añadir producto' })
  }
}

const deleteFromLista = async (req, res, next) => {
  try {
    const { codigoLista, codigoProducto } = req.body
    const query0 = await pool.query('SELECT * FROM Producto_IN_ListaCompra WHERE codigo_lista = $1 AND codigo_producto = $2', [codigoLista, codigoProducto])
    if (query0.rowCount === 0) {
      res.status(404).json({ message: 'Producto no existe en la lista' })
    }
    const query = await pool.query('DELETE FROM Producto_IN_ListaCompra WHERE codigo_lista = $1 AND codigo_producto = $2',
      [codigoLista, codigoProducto])
    if (query.rowCount === 0) {
      res.status(403).json({ message: 'No es posible eliminar producto' })
    } else {
      res.status(200).json({ message: 'Producto eliminada exitosamente de la lista' })
    }
  } catch (error) {
    next(error)
    res.status(400).json({ message: 'No es posible eliminar producto' })
  }
}

const createListaFav = async (req, res, next) => {
  try {
    const { nombreUsuario } = req.body
    const query0 = await pool.query('SELECT * FROM usuario WHERE nombre_usuario = $1', [nombreUsuario])
    if (query0.rowCount === 0) {
      res.status(404).json({ message: 'Usuario no existe' })
    } else {
      const query1 = await pool.query('SELECT * FROM listaCompra WHERE nombre_usuario = $1 AND nombre_lista = $2', [nombreUsuario, 'Favoritos'])
      if (query1.rowCount > 0) {
        res.status(302).json({ message: 'Lista ya existe' })
      } else {
        const query = await pool.query('INSERT INTO listaCompra (nombre_lista, nombre_usuario) VALUES($1,$2) RETURNING *',
          ['Favoritos', nombreUsuario])
        res.status(200).json(query.rows[0])
      }
    }
  } catch (error) {
    console.error(error)
    next(error)
    res.status(400).json({ message: 'No es posible crear la lista' })
  }
}

const getAllListasUsuario = async (req, res, next) => {
  try {
    const { nombreUsuario } = req.params
    const query = await pool.query('SELECT * FROM listaCompra WHERE nombre_usuario=$1', [nombreUsuario])
    if (query.rowCount === 0) {
      res.status(404).json({ message: 'No existe un registro de listas' })
    } else {
      res.status(200).json(query.rows)
    }
  } catch (error) {
    next(error)
    res.status(400).json({ message: 'Error al obtener el contenido' })
  }
}

const getAllListas = async (req, res, next) => {
  try {
    const query = await pool.query('SELECT * FROM listaCompra')
    if (query.rowCount === 0) {
      res.status(404).json({ message: 'No existen listas' })
    } else {
      res.status(200).json(query.rows)
    }
  } catch (error) {
    next(error)
    res.status(400).json({ message: 'Error al obtener el contenido' })
  }
}

const getListaFavUsuario = async (req, res, next) => {
  try {
    const { nombreUsuario } = req.params
    const query = await pool.query('SELECT codigo_producto FROM listaCompra L JOIN Producto_IN_ListaCompra P ON L.codigo_lista = P.codigo_lista WHERE nombre_usuario = $1 AND nombre_lista = $2  ',
      [nombreUsuario, 'Favoritos'])
    if (query.rowCount === 0) {
      req.status(404).json({ message: 'Lista no existe' })
    } else {
      res.status(200).json(query.rows)
    }
  } catch (error) {
    next(error)
    res.status(400).json({ message: 'Error al obtener el contenido' })
  }
}

const getProductosLista = async (req, res, next) => {
  try {
    const { codigoLista } = req.params
    const query = await pool.query('SELECT * FROM Producto_IN_ListaCompra WHERE codigo_lista = $1', [codigoLista])
    if (query.rowCount === 0) {
      res.status(404).json({ message: 'No existen productos en lista' })
    } else {
      res.status(200).json(query.rows)
    }
  } catch (error) {
    next(error)
    res.status(400).json({ message: 'Error al obtener el contenido' })
  }
}

const getOneLista = async (req, res, next) => {
  try {
    const { codigoLista } = req.params
    const query = await pool.query('SELECT * FROM listaCompra WHERE codigo_lista = $1', [codigoLista])
    if (query.rowCount === 0) {
      res.status(404).json({ message: 'Lista no encontrada' })
    } else {
      res.status(200).json(query.rows[0])
    }
  } catch (error) {
    next(error)
    res.status(400).json({ message: 'Lista no encontrada' })
  }
}

const deleteLista = async (req, res, next) => {
  try {
    const { codigoLista } = req.params
    const query0 = await pool.query('SELECT * FROM listaCompra WHERE codigo_lista = $1', [codigoLista])
    if (query0.rowCount === 0) {
      res.status(404).json({ message: 'Lista no encontrada' })
    }
    const query = await pool.query('DELETE FROM listacompra WHERE codigo_lista = $1', [codigoLista])
    if (query.rowCount === 0) {
      return res.status(404).json({ message: 'No es posible eliminar la lista' })
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
  getListaFavUsuario,
  getProductosLista,
  deleteLista,
  deleteFromLista
}
