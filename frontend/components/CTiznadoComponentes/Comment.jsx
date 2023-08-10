import React, { useEffect, useState } from 'react'
import axios from 'axios'
import sweet from 'sweetalert2'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

const Comment = (props) => {
  const [open, setOpen] = useState(false)
  const [error, setError] = useState('')
  const [values, setValues] = useState({
    nombreusuario: props.usuario,
    codigoproducto: props.codigo,
    detalleopinion: '',
    numvaloracion: null,
    fechaopinion: new Date().toISOString()
  })

  useEffect(() => {
    const date = new Date()
    const formattedDate = date.toISOString().split('T')[0]

    setValues((prevValues) => ({
      ...prevValues,
      codigoproducto: props.codigo,
      fechaopinion: formattedDate
    }))
  }, [props.codigo])

  const openPopup = () => {
    setOpen(true)
  }

  const closePopup = () => {
    setValues((prevValues) => ({ ...prevValues, numvaloracion: null, detalleopinion: '' }))
    setError('')
    setOpen(false)
  }

  const handleStarChange = (value) => {
    setValues((prevValues) => ({ ...prevValues, numvaloracion: value }))
  }

  const handleCommentChange = (event) => {
    setValues((prevValues) => ({ ...prevValues, detalleopinion: event.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (values.numvaloracion === null || values.detalleopinion.trim() === '') {
      setError('Por favor, selecciona una cantidad de estrellas y escribe una opinión antes de enviar.')
      return
    }
    try {
      const response = await axios.post(`${process.env.API_URL}/opinion`, values)
      console.log(response.data)
      setError('')
      setValues((prevValues) => ({ ...prevValues, numvaloracion: null, detalleopinion: '' }))
      setOpen(false)
      props.getOpiniones(props.codigo)
      sweet.fire({
        icon: 'success',
        title: 'Comentario realizado',
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 2500,
        toast: true
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <Button
        type="button"
        onClick={openPopup}
        sx={{
          color: 'white',
          backgroundColor: '#4a732b',
          width: 120,
          height: 50,
          borderRadius: 8,
          fontSize: { xs: 12, md: 16, lg: 18 },
          padding: '8px 8px',
          fontFamily: 'Roboto',
          fontWeight: 'bold',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
          transition: 'background-color 0.3s',
          '&:hover': {
            backgroundColor: '#398623'
          }
        }}
      >
        Comentar
      </Button>
      <Dialog open={open} onClose={closePopup} fullWidth maxWidth="sm">
        <DialogTitle>
          Comentario
          <IconButton onClick={closePopup} style={{ float: 'right' }}>
            <CloseIcon color="primary" />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} margin={2}>
            <div>
              <p>Elige la cantidad de estrellas:</p>
              {[1, 2, 3, 4, 5].map((value) => (
                <IconButton
                  key={value}
                  onClick={() => handleStarChange(value)}
                  color={value <= values.numvaloracion ? 'primary' : 'default'}
                  sx={{ fontSize: 'inherit', padding: '0' }}
                >
                  ⭐
                </IconButton>
              ))}
            </div>
            <TextField
              variant="outlined"
              label="Opinión (obligatorio)"
              multiline
              rows={4}
              value={values.detalleopinion}
              onChange={handleCommentChange}
            />
          </Stack>
          {error && (
            <Typography variant="body2" color="error" sx={{ marginTop: 1 }}>
              {error}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={closePopup}
            sx={{
              color: 'white',
              backgroundColor: '#4a732b',
              width: 120,
              height: 50,
              borderRadius: 8,
              fontSize: { xs: 12, md: 16, lg: 18 },
              padding: '8px 8px',
              fontFamily: 'Roboto',
              fontWeight: 'bold',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
              transition: 'background-color 0.3s',
              '&:hover': {
                backgroundColor: '#398623'
              }
            }}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            sx={{
              color: 'white',
              backgroundColor: '#4a732b',
              width: 120,
              height: 50,
              borderRadius: 8,
              fontSize: { xs: 12, md: 16, lg: 18 },
              padding: '8px 8px',
              fontFamily: 'Roboto',
              fontWeight: 'bold',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
              transition: 'background-color 0.3s',
              '&:hover': {
                backgroundColor: '#398623'
              }
            }}
          >
            Enviar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Comment
