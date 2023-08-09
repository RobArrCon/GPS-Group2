import React from 'react'
import { Card, CardMedia } from '@mui/material'

const MyImage = ({ ruta }) => {
  return (
    <Card sx={{
      boxShadow: 'none',
      backgroundColor: '#cee9ba',
      width: { xs: '90%', md: '27%' },
      height: { xs: 'auto', md: '100%' }
    }}>
      <CardMedia
        component="img"
        src={ruta}
        sx={{
          backgroundColor: '#cee9ba',
          width: { xs: 'auto%', md: '90%' },
          height: { xs: 'auto', md: '90%' }
        }}

      />
    </Card>
  )
}

export default MyImage
