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

const style = {
  box: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: 700,
    width: 700,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
  },
  text: {
    width: '100%'
  }

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

  return (
    <BackGround>
      <div>
        <Typography align='center' id="titulo-pag-receta" variant="h4">
          RECETAS
        </Typography>
        <div align='right'>
          <Button onClick={handleOpen2} color="success" variant="contained">Agregar</Button><br /><br />
        </div>
      </div>
      <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
      >
        <Box sx={style.box}>
          <div align="center">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              AGREGAR
            </Typography>
          </div>
          <TextField sx={style.text} id="standard-basic" label="Nombre receta" variant="standard" /><br /><br />
          <TextField
            sx={style.text}
            id="filled-multiline-flexible"
            label="Preparacion"
            multiline
            minRows={10}
            maxRows={20}
            variant="filled"
          /><br /><br />
          <div align="center">
            <Button color="success" variant="contained">Agregar</Button>
            <Button color="error" onClick={handleClose2} variant="contained">Cancelar</Button>
          </div>
        </Box>
      </Modal>
      <Card sx={{ maxWidth: 235 }}>
        <CardContent>
          <div align='center'>
            <Typography gutterBottom variant="h5" component="div">
              Queque de nuez
            </Typography>
          </div>
        </CardContent>
        <CardActions>
          <div>
            <div align='center'>
              <Button variant='contained' onClick={handleOpen}>VER</Button>
            </div>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style.box}>
                <div align='right'>
                  <Button color="error" onClick={handleClose} variant="contained">X</Button>
                </div>
                <div align="center">
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                    Queque de nuez
                  </Typography><br></br>
                  <TextField
                    sx={style.text}
                    id="filled-read-only-input"
                    label="Preparacion"
                    defaultValue="asi se prepara esto"
                    InputProps={{
                      readOnly: true
                    }}
                    variant="filled"
                  />
                </div>
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
              >
                <Box sx={style.box}>
                  <div align="center">
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                      MODIFICAR
                    </Typography>
                  </div>
                  <TextField sx={style.text} id="standard-basic" label="Nombre receta" variant="standard" /><br /><br />
                  <TextField
                    sx={style.text}
                    id="filled-multiline-flexible"
                    label="Preparacion"
                    multiline
                    minRows={10}
                    maxRows={20}
                    variant="filled"
                  /><br /><br />
                  <div align="center">
                    <Button color="success" variant="contained">Guardar</Button>
                    <Button color="error" onClick={handleClose3} variant="contained">Cancelar</Button>
                  </div>
                </Box>
              </Modal>
              <Button onClick={() => { handleOpen4(); ConfirmDelete() }} color="error" variant='contained' >ELIMINAR</Button>
            </Stack>
          </div>
        </CardActions>
      </Card>
    </BackGround >
  )
}
