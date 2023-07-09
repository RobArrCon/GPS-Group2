import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import BackGround from '../components/GeneralBackground'
import Swal from 'sweetalert2'
import TextareaAutosize from '@mui/base/TextareaAutosize'
import { styled } from '@mui/system'

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

export default function Index() {
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
  const ConfirmDelete = () => {
    if (open4) {
      Swal.fire({
        title: 'Desea eliminar esta receta?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'ELIMINADO!',
            'RECETA ELIMINADA EXITOSAMENTE',
            'success'
          )
        }
      })
    }
  }

  const blue = {
    100: '#DAECFF',
    200: '#b6daff',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75'
  }

  const grey = {
    50: '#f6f8fa',
    100: '#eaeef2',
    200: '#d0d7de',
    300: '#afb8c1',
    400: '#8c959f',
    500: '#6e7781',
    600: '#57606a',
    700: '#424a53',
    800: '#32383f',
    900: '#24292f'
  }

  const StyledTextarea = styled(TextareaAutosize)(
    ({ theme }) => `
    width: 320px;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 12px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  
    &:hover {
      border-color: ${blue[400]};
    }
  
    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
  )

  return (
    <BackGround>
      <Box>RECETAS<br /><br />
        <Button onClick={handleOpen2} color="success" variant="contained">Agregar</Button><br /><br />
        <Modal
          size="xl"
          open={open2}
          onClose={handleClose2}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              AGREGAR
            </Typography>
            <TextField id="standard-basic" label="Nombre de la receta" variant="standard" /><br /><br />
            <StyledTextarea aria-label="empty textarea" placeholder="Preparacion..." /><br /><br />
            <Stack direction="row" spacing={2}>
              <Button color="success" variant="contained">Agregar</Button>
              <Button color="success" onClick={handleClose2} variant="contained">Cancelar</Button><br /><br />
            </Stack>
          </Box>
        </Modal>
        <Card sx={{ maxWidth: 235 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Queque de nuez
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
                    <TextField id="standard-basic" label="Nombre de la receta" variant="standard" /><br /><br />
                    <StyledTextarea aria-label="empty textarea" placeholder="Preparacion..." /><br /><br />
                    <Stack direction="row" spacing={2}>
                      <Button color="success" variant="contained">Guardar</Button>
                      <Button color="success" onClick={handleClose3} variant="contained">Cancelar</Button><br /><br />
                    </Stack>
                  </Box>
                </Modal>
                <Button onClick={() => { handleOpen4(); ConfirmDelete() }} color="error" variant='contained' >ELIMINAR</Button>
              </Stack>
            </div>
          </CardActions>
        </Card>
      </Box>
    </BackGround>
  )
}
