import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Box, Typography } from '@mui/material'

const IngredientesRecuadro = ({ codigoProducto }) => {
  const [ingredientes, setIngredientes] = useState([])

  useEffect(() => {
    const getIngredientes = async () => {
      try {
        const response = await axios.post(`${process.env.API_URL}/nombres`, {
          codigoProducto
        })
        setIngredientes(response.data)
      } catch (error) {
        console.error(error)
      }
    }
    getIngredientes()
  }, [codigoProducto])

  return (
    <Box>
      <Typography variant="body1" sx={{ color: 'text.secondary', marginBottom: '8px' }}>
        Ingredientes:
      </Typography>
      {ingredientes.map((nombreIngrediente, index) => (
        <Typography key={index} variant="body1" sx={{ color: 'text.secondary' }}>
          {console.log('NOMBRE DEL INGREDIENTE:', nombreIngrediente)}
          {nombreIngrediente}
        </Typography>
      ))}
    </Box>
  )
}

export default IngredientesRecuadro
