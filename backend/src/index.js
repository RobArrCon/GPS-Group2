const express = require('express')
const cors = require('cors')
const recetaRoute = require('./routes/recetas.routes')
const UsuarioRoutes = require('./routes/usuario.routes')
const ingredienteRoutes = require('./routes/ingredientes.routes')
const listaRoutes = require('../src/routes/lista.routes')
const postRoutes = require('../src/routes/post.routes')
const CategoriaRoutes = require('./routes/categoria.routes')
const opinionRoutes = require('./routes/opinion.routes')
const productoRoutes = require('./routes/producto.routes')
const comentarioRoutes = require('./routes/comentario.routes')
const app = express()
const dotenv = require('dotenv')
dotenv.config()

// MIDDLEWARES
app.use(cors())
app.use(express.json())

// RUTAS
app.use('/api', UsuarioRoutes)
app.use('/api', recetaRoute)
app.use('/api', ingredienteRoutes)
app.use('/api', listaRoutes)
app.use('/api', postRoutes)
app.use('/api', CategoriaRoutes)
app.use('/api', opinionRoutes)
app.use('/api', productoRoutes)
app.use('/api', comentarioRoutes)
// ERROR HANDLING
app.use((err, req, res, next) => {
  return res.status(500).json({
    status: 'error',
    message: err.message
  })
})

// SERVER
const port = process.env.PORT
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
