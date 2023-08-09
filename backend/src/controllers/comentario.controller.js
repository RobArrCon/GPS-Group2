const pool = require('../db')

const createComentario = async (req, res, next) => {
  try {
    const { nombreUsuario, codigoPost, detalleComentario } = req.body
    const fecha = new Date()
    const fechaFinal = fecha.toLocaleDateString()
    const query = await pool.query('INSERT INTO comentario (nombre_usuario, codigo_post, detalle_comentario, fecha_comentario) VALUES($1,$2,$3,$4) RETURNING *',
      [nombreUsuario, codigoPost, detalleComentario, fechaFinal])
    res.status(200).json(query.rows[0])
  } catch (error) {
    next(error)
    res.status(400).json({ message: 'No es posible crear el comentario' })
  }
}

const getAllComentarioPost = async (req, res, next) => {
  try {
    const { codigoPost } = req.params
    const query = await pool.query('SELECT * FROM post WHERE codigo_post = $1', [codigoPost])
    if (query.rowCount === 0) {
      res.status(404).json({ message: 'Publicación no existe' })
    } else {
      const query = await pool.query('SELECT * FROM comentario WHERE codigo_post = $1', [codigoPost])
      res.status(200).json(query.rows)
    }
  } catch (error) {
    next(error)
    res.status(400).json({ message: 'Error al obtener el contenido' })
  }
}

const getAllComentarios = async (req, res, next) => {
  try {
    const query = await pool.query('SELECT * FROM comentario ')
    res.status(200).json(query.rows)
  } catch (error) {
    next(error)
    res.status(400).json({ message: 'Error al obtener el contenido' })
  }
}

const getAllComentarioUsuario = async (req, res, next) => {
  try {
    const { nombreUsuario } = req.params
    const query = await pool.query('SELECT * FROM comentario WHERE nombre_usuario = $1', [nombreUsuario])
    if (query.rowCount === 0) {
      res.status(404).json({ message: 'Usuario no ha redactado comentarios' })
    } else {
      res.status(200).json(query.rows)
    }
  } catch (error) {
    next(error)
    res.status(400).json({ message: 'Error al obtener el contenido' })
  }
}

const deleteComentario = async (req, res, next) => {
  try {
    const { codigoComentario } = req.params
    const query = await pool.query('DELETE FROM comentario WHERE codigo_comentario=$1', [codigoComentario])
    if (query.rowCount === 0) {
      return res.status(404).json({ message: 'Comentario no encontrado' })
    }
    return res.status(200).json({ message: 'Comentario eliminado exitosamente' })
  } catch (error) {}
}

module.exports = {
  createComentario,
  getAllComentarioPost,
  getAllComentarios,
  getAllComentarioUsuario,
  deleteComentario
}
