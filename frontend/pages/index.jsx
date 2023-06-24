import * as React from 'react'
import { Box } from '@mui/material'
import { Button } from '@mui/material'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Index () {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
      <div>
      <Button onClick={handleOpen}>VER</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Queque de nuez
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            como se prepara
          </Typography>
        </Box>
      </Modal>
    </div>
      </CardActions>
    </Card>
    </Box>
    )
   
}
