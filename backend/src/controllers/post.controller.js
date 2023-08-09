const pool = require('../db')

const createPost = async (req, res, next) => {
  try {
    const { tituloPost, detallePost, nombreUsuario } = req.body
    const query0 = await pool.query('SELECT * FROM post WHERE titulo_post = $1 AND detalle_post = $2', [tituloPost, detallePost])
    if (query0.rowCount > 0) {
      res.status(302).json({ message: 'Publicación ya existe' })
    }
    const fecha = new Date()
    const fechaFinal = fecha.toLocaleDateString()
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
    if (query.rowCount === 0) {
      res.status(404).json({ message: 'No existen publicaciones' })
    } else {
      res.status(200).json(query.rows)
    }
  } catch (error) {
    next(error)
    res.status(400).json({ message: 'Error al obtener el contenido' })
  }
}

const getAllPostUsuario = async (req, res, next) => {
  try {
    const { nombreUsuario } = req.params
    const query = await pool.query('SELECT * FROM post WHERE nombre_usuario = $1', [nombreUsuario])
    if (query.rowCount === 0) {
      res.status(404).json({ message: 'Usuario no cuenta con publicaciones' })
    } else {
      res.status(200).json(query.rows)
    }
  } catch (error) {
    next(error)
    res.status(400).json({ message: 'Error al obtener el contenido' })
  }
}

const getOnePost = async (req, res, next) => {
  try {
    const { codigoPost } = req.params
    const query = await pool.query('SELECT * FROM post WHERE codigo_post = $1', [codigoPost])
    if (query.rowCount === 0) {
      res.status(404).json({ message: 'Publicación no encontrada' })
    } else {
      res.status(200).json(query.rows[0])
    }
  } catch (error) {
    next(error)
    res.status(400).json({ message: 'Publicación no encontrada' })
  }
}

const updatePost = async (req, res, next) => {
  try {
    const { codigoPost, tituloPost, detallePost } = req.body
    const query0 = await pool.query('SELECT * FROM post WHERE codigo_post = $1', [codigoPost])
    if (query0.rowCount === 0) {
      res.status(404).json({ message: 'Publicación no existe' })
    }
    const query = await pool.query(
      'UPDATE post SET titulo_post = $2, detalle_post = $3 WHERE codigo_post = $1 RETURNING *',
      [codigoPost, tituloPost, detallePost]
    )
    if (query.rowCount === 0) {
      return res.status(403).json({ message: 'No es posible modificar la publicación' })
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
    const query0 = await pool.query('SELECT * FROM post WHERE codigo_post = $1', [codigoPost])
    if (query0.rowCount === 0) {
      res.status(404).json({ message: 'Publicación no encontrada' })
    }
    const query = await pool.query('DELETE FROM post WHERE codigo_post = $1', [codigoPost])
    if (query.rowCount === 0) {
      return res.status(403).json({ message: 'No es posible eliminar la publicación' })
    }
    return res.status(200).json({ message: 'Publicación eliminada exitosamente' })
  } catch (error) {}
}

const getPostsAndComments = async (req, res, next) => {
  try {
    const query = await pool.query('SELECT p.codigo_post, p.titulo_post, p.fecha_publicacion, p.detalle_post, COUNT(c.codigo_comentario) AS cantidad_comentarios FROM Post p LEFT JOIN Comentario c ON p.codigo_post = c.codigo_post GROUP BY p.codigo_post, p.titulo_post, p.fecha_publicacion')
    if (query.rowCount === 0) {
      res.status(404).json({ message: 'No existen publicaciones' })
    } else {
      res.status(200).json(query.rows)
    }
  } catch (error) {
    next(error)
    res.status(400).json({ message: 'Error en obtención de publicaciones' })
  }
}

module.exports = {
  createPost,
  getAllPost,
  getAllPostUsuario,
  getOnePost,
  getPostsAndComments,
  updatePost,
  deletePost
}
