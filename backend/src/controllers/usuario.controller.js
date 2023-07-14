const pool = require('../db')
const bcrypt = require('bcryptjs')

const createUsuario = async (req, res, next) => {
  try {
    const { usuario, correo, contrasena, rol } = req.body

    const query = await pool.query('SELECT * FROM usuario WHERE nombre_usuario= $1', [usuario])

    if (query.rowCount === 0) {
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(contrasena, salt)
      const query1 = await pool.query('INSERT INTO usuario (nombre_usuario,correo,clave_user,rol_user) VALUES($1,$2,$3,$4) RETURNING *',
        [usuario, correo, hash, rol])

      res.status(200).json(query1.rows[0])
    } else {
      res.status(302).json({ message: 'El nombre de ususario ya se encuentra en uso' })
    }
  } catch (error) {
    next(error)
    res.status(400).json({ message: 'No se pudo ingresar el usuario en la base de datos' })
  }
}

const getAllUsuario = async (req, res, next) => {
  try {
    const query = await pool.query('SELECT * FROM usuario')
    res.status(200).json(query.rows)
  } catch (error) {
    next(error)
    res.status(400).json({ message: 'error al acceder a la tabla' })
  }
}

const getOneUsuario = async (req, res, next) => {
  try {
    const { usuario } = req.params
    const query = await pool.query('SELECT * FROM usuario WHERE nombre_usuario= $1', [usuario])
    if (query.rows.length === 0) { return res.status(404).json({ message: 'Usuario no encontrado' }) }
    res.json(query.rows[0])
  } catch (error) {
    next(error)
    res.status(400).json({ message: 'no se se encontro el usuario' })
  }
}

const DeleteUsuario = async (req, res, next) => {
  try {
    const { usuario } = req.params
    const query = await pool.query('DELETE FROM usuario WHERE nombre_usuario = $1', [usuario])
    if (query.rowCount === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }
    return res.status(200).json({ message: 'Usuario eliminado exitosamente' })
  } catch (error) {
    res.status(400).json({ message: 'no se pudo realizar la eliminacion' })
  }
}

const LoginUsuario = async (req, res, next) => {
  try {
    const { usuario, contrasena } = req.body
    const query = await pool.query('SELECT * FROM usuario WHERE nombre_usuario =$1', [usuario])

    const user = query.rows[0]

    if (!user) {
      return res.status(401).json({ message: 'Rut inconrrecto' })
    }
    const contrasenaValida = await bcrypt.compare(contrasena, user.clave_user)

    if (!contrasenaValida) {
      return res.status(401).json({ message: 'Contrasena inconrrecta' })
    }

    return res.status(200).json({ message: 'Inicio de sesion exitoso', user })
  } catch (error) {
    next(error)
    res.status(401).json({ message: 'Usuario no valido' })
  }
}

const ChangeContrasena = async (req, res, next) => {
  try {
    const { usuario } = req.params
    const { contrasenaActual, contrasenaNueva } = req.body

    const query = await pool.query('SELECT * FROM usuario WHERE nombre_usuario = $1', [
      usuario
    ])
    if (query.rows.length === 0) {
      return res.status(401).json({ message: 'Usuario no encontrados' })
    }

    const user = query.rows[0]
    const contrasenaValida = await bcrypt.compare(contrasenaActual, user.clave_user)

    if (!contrasenaValida) {
      return res.status(400).json({ message: 'contrasena incorrecta' })
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(contrasenaNueva, salt)

    await pool.query('UPDATE usuario SET clave_user = $1 WHERE nombre_usuario = $2', [
      hash,
      usuario
    ])

    return res.status(201).json({ message: 'Contraseña cambiada con exito' })
  } catch (error) {
    next(error)
    res.status(401).json({ message: 'Las contrasenas no coinciden' })
  }
}

module.exports = {
  createUsuario,
  getAllUsuario,
  getOneUsuario,
  DeleteUsuario,
  LoginUsuario,
  ChangeContrasena
}
