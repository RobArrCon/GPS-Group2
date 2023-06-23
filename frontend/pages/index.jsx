import * as React from 'react'
import { Box } from '@mui/material'
import { Button } from '@mui/material'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
export default function Index () {
  return (
    <Box>pagina de recetas<br />,
    <Button variant="contained">Agregar</Button>
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
       //imagen del producto de receta
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Queque de nuez
        </Typography>
        <Typography variant="body2" color="text.secondary">
          descripcio de un  queque de nuez
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Ver</Button>
      </CardActions>
    </Card>
    </Box>
    )
   
}
