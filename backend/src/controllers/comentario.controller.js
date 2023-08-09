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

module.exports = {
  createComentario,
  getAllComentarioPost
}
