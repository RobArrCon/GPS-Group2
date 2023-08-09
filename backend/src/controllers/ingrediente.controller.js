const pool = require('../db')

const createIngrediente = async (req, res, next) => {
  try {
    const { nombre, categoriaIngrediente } = req.body

    const query = await pool.query('INSERT INTO ingrediente (nombre_ingrediente,categoria_ingrediente) VALUES($1,$2) RETURNING *',

      [nombre, categoriaIngrediente])
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
    const { codigo, nombre, categoriaIngrediente } = req.body
    const query = await pool.query(

      'UPDATE ingrediente SET nombre_ingrediente = $2, categoria_ingrediente = $3 WHERE codigo_ingrediente = $1 RETURNING *',

      [codigo, nombre, categoriaIngrediente])
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

const createIngredienteInProduct = async (req, res, next) => {
  try {
    const { codigoProducto, codigo } = req.body
    console.log(req.body)

    const query1 = await pool.query('SELECT * FROM producto WHERE codigo_producto = $1', [codigoProducto])
    const query2 = await pool.query('SELECT * FROM ingrediente WHERE codigo_ingrediente = $1', [codigo])

    if (query1.rowCount > 0 && query2.rowCount > 0) {
      const query = await pool.query('INSERT INTO ingrediente_in_producto (codigo_producto, codigo_ingrediente) VALUES($1, $2) RETURNING *',
        [codigoProducto, codigo])
      res.status(200).json(query.rows[0])
    } else {
      res.status(404).json({ message: 'Este ingrediente no fue encontrado en la base de datos' })
    }
  } catch (error) {
    console.error(error)
    res.status(400).json({ message: 'No es posible realizar la asignación' })
  }
}

const getIngredientesInProducto = async (req, res, next) => {
  try {
    const { codigoProducto } = req.params
    console.log('codigo del producto en backend', codigoProducto)
    const query = await pool.query(
      'SELECT i.nombre_ingrediente FROM ingrediente_in_producto ip JOIN ingrediente i ON ip.codigo_ingrediente = i.codigo_ingrediente WHERE ip.codigo_producto = $1',
      [codigoProducto]
    )

    const nombresIngredientes = query.rows.map((row) => row.nombre_ingrediente)

    res.status(200).json(nombresIngredientes)
  } catch (error) {
    next(error)
    res.status(400).json({ message: 'No se pudieron obtener los ingredientes del producto' })
  }
}

const getNombresIngredientes = async (req, res, next) => {
  try {
    const { codigoIngredientes } = req.query
    console.log('códigos de ingredientes en backend', codigoIngredientes)

    const ingredientesPromises = codigoIngredientes.map(async (codigo) => {
      const query = await pool.query('SELECT nombre_ingrediente FROM ingrediente WHERE codigo_ingrediente = $1', [codigo])
      return query.rows[0].nombre_ingrediente
    })

    const nombresIngredientes = await Promise.all(ingredientesPromises)

    res.status(200).json(nombresIngredientes)
  } catch (error) {
    next(error)
    res.status(400).json({ message: 'No se pudieron obtener los nombres de los ingredientes' })
  }
}

module.exports = {
  createIngrediente,
  getAllIngrediente,
  getOneIngrediente,
  deleteIngrediente,
  updateIngrediente,
  addToIngrediente,
  deleteFromIngrediente,
  createIngredienteInProduct,
  getIngredientesInProducto,
  getNombresIngredientes
}
