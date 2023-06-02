const express = require('express')
const cors = require('cors')
const recetaRoute = require('./routes/recetas.routes')

const app = express()
const dotenv = require('dotenv')
dotenv.config()

// MIDDLEWARES
app.use(cors())
app.use(express.json())
app.use('/api', recetaRoute)
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
