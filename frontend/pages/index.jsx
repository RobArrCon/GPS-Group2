import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Stack from '@mui/material/Stack'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
}

export default function Index () {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [open2, setOpen2] = React.useState(false)
  const handleOpen2 = () => setOpen2(true)
  const handleClose2 = () => setOpen2(false)

  const [open3, setOpen3] = React.useState(false)
  const handleOpen3 = () => setOpen3(true)
  const handleClose3 = () => setOpen3(false)

  const [open4, setOpen4] = React.useState(false)
  const handleOpen4 = () => setOpen4(true)
  const handleClose4 = () => setOpen4(false)

  return (
    <Box>RECETAS<br /><br />
    <Button onClick={handleOpen2} color="success" variant="contained">Agregar</Button><br /><br />
    <Modal
  open={open2}
  onClose={handleClose2}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
    <Typography id="modal-modal-title" variant="h6" component="h2">
      AGREGAR
    </Typography>
    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
      AQUI SE AGREGA
    </Typography>
  </Box>
</Modal>
    <Card sx={{ maxWidth: 345 }}>
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
      <Button variant='contained' onClick={handleOpen}>VER</Button>
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
      <br></br>
      <br></br>
      <Stack direction="row" spacing={2}>
      <Button onClick={handleOpen3} color='secondary' variant='contained'>MODIFICAR</Button>
      <Modal
  open={open3}
  onClose={handleClose3}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
    <Typography id="modal-modal-title" variant="h6" component="h2">
      MODIFICAR
    </Typography>
    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
      AQUI SE MODIFICA
    </Typography>
  </Box>
</Modal>
      <Button onClick={handleOpen4} color="error" variant='contained' >ELIMINAR</Button>
      <Modal
  open={open4}
  onClose={handleClose4}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
    <Typography id="modal-modal-title" variant="h6" component="h2">
      ELIMINAR
    </Typography>
    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
      AQUI SE ELIMINA
    </Typography>
  </Box>
</Modal>
    </Stack>
    </div>
      </CardActions>
    </Card>
    </Box>
  )
}
