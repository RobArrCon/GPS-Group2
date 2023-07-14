import React from 'react'
import { Card, CardMedia } from '@mui/material'

const MyImage = ({ ruta }) => {
  return (
    <Card sx={{
      boxShadow: 'none',
      width: { xs: '90%', md: '27%' },
      height: { xs: 'auto', md: '100%' }
    }}>
      <CardMedia
        component="img"
        src={ruta}

      />
    </Card>
  )
}

export default MyImage
