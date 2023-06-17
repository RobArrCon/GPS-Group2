const pool = require('../db')

const createPost = async (req, res, next) => {
  try {
    const { tituloPost, detallePost, nombreUsuario } = req.body
    const fecha = new Date()
    const dia = fecha.getDate()
    const mes = fecha.getMonth() + 1
    const year = fecha.getFullYear()
    const fechaFinal = year + '-' + mes + '-' + dia
    const query = await pool.query('INSERT INTO post (titulo_post, detalle_post, fecha_publicacion, nombre_usuario) VALUES($1,$2,$3,$4) RETURNING *',
      [tituloPost, detallePost, fechaFinal, nombreUsuario])
    res.status(200).json(query.rows[0])
  } catch (error) {
    next(error)
    res.status(400).json({ message: 'No es posible crear la publicación' })
  }
}

const getAllPost = async (req, res, next) => {
  try {
    const query = await pool.query('SELECT * FROM post')
    res.status(200).json(query.rows)
  } catch (error) {
    next(error)
    res.status(400).json({ message: 'Error al obtener el contenido' })
  }
}

const getAllPostUsuario = async (req, res, next) => {
  try {
    const { nombreUsuario } = req.params
    const query = await pool.query('SELECT * FROM post WHERE nombre_usuario = $1', [nombreUsuario])
    res.status(200).json(query.rows)
  } catch (error) {
    next(error)
    res.status(400).json({ message: 'Error al obtener el contenido' })
  }
}

const getOnePost = async (req, res, next) => {
  try {
    const { codigoPost } = req.params
    const query = await pool.query('SELECT * FROM post WHERE codigo_post = $1', [codigoPost])
    res.status(200).json(query.rows[0])
  } catch (error) {
    next(error)
    res.status(400).json({ message: 'Publicación no encontrada' })
  }
}

const updatePost = async (req, res, next) => {
  try {
    const { codigoPost, tituloPost, detallePost } = req.body
    const query = await pool.query(
      'UPDATE post SET titulo_post = $2, detalle_post = $3 WHERE codigo_post = $1 RETURNING *',
      [codigoPost, tituloPost, detallePost]
    )
    if (query.rowCount === 0) {
      return res.status(404).json({ message: 'Publicación no encontrada' })
    }
    res.status(200).json(query.rows[0])
  } catch (error) {
    next(error)
    res.status(400).json({ message: 'Error al actualizar la publicación' })
  }
}

const deletePost = async (req, res, next) => {
  try {
    const { codigoPost } = req.params
    const query = await pool.query('DELETE FROM post WHERE codigo_post = $1', [codigoPost])
    if (query.rowCount === 0) {
      return res.status(404).json({ message: 'Publicación no encontrada' })
    }
    return res.status(200).json({ message: 'Publicación eliminada exitosamente' })
  } catch (error) {}
}

module.exports = {
  createPost,
  getAllPost,
  getAllPostUsuario,
  getOnePost,
  updatePost,
  deletePost
}
