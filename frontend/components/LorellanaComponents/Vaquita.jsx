import React from 'react'
import { Card, CardMedia } from '@mui/material'

const ImagenV = ({ ruta }) => {
  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: 'none',
        backgroundColor: 'transparent',
        width: 'auto',
        height: 'auto'
      }}
    >
      <CardMedia
        component="img"
        src={ruta}
        sx={{
          display: 'flex',
          backgroundColor: 'transparent',
          maxWidth: 'auto',
          height: 'auto'
        }}
      />
    </Card>
  )
}

export default ImagenV
