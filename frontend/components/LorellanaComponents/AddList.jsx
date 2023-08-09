import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography
} from '@mui/material'
import sweet from 'sweetalert2'

const AddList = (props) => {
  const [open, setOpen] = useState(false)
  const [listas, setListas] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [textFieldError, setTextFieldError] = useState('')
  const [listError, setListError] = useState('')

  const getListas = async () => {
    try {
      const response = await axios.get(`${process.env.API_URL}/listas/${props.usuario}`)
      setListas(response.data)
    } catch (error) {
      setListas([])
    }
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setInputValue('')
    setTextFieldError('')
    setListError('')
    setOpen(false)
  }

  const handleSave = async () => {
    if (inputValue.trim() !== '') {
      const nuevaLista = {
        nombreLista: inputValue,
        nombreUsuario: props.usuario
      }

      try {
        const response = await axios.post(`${process.env.API_URL}/lista`, nuevaLista)
        console.log('Lista creada:', response.data)

        setInputValue('')
        setTextFieldError('')
        setListError('')
        try {
          const responseProducto = await axios.post(`${process.env.API_URL}/lista/item`, {
            codigoProducto: props.codigoProducto,
            codigoLista: response.data.codigo_lista
          })
          console.log('Producto agregado a la lista:', responseProducto.data)
          setOpen(false)
          getListas()
          setListError('')

          sweet.fire({
            icon: 'success',
            title: 'Producto añadido a la lista',
            position: 'bottom-end',
            showConfirmButton: false,
            timer: 2500,
            toast: true
          })
        } catch (errorProducto) {
          console.error('Error al agregar el producto a la lista:', errorProducto)
          if (errorProducto.response && errorProducto.response.status === 302) {
            setListError('El producto ya existe en la lista')
          }
        }
      } catch (error) {
        if (error.response && error.response.status === 302) {
          console.error('La lista ya existe:', error.response.data.message)
          setTextFieldError('La lista ya existe')
        } else {
          console.error('Error al crear la lista:', error)
        }
      }
    } else {
      setTextFieldError('Por favor ingresa un nombre de lista')
    }
  }

  const handleInputChange = (event) => {
    setInputValue(event.target.value)
    setTextFieldError('')
  }
  const handleExistingListClick = async (list) => {
    console.log('Lista seleccionada:', list.nombre_lista)

    try {
      const responseProducto = await axios.post(`${process.env.API_URL}/lista/item`, {
        codigoProducto: props.codigoProducto,
        codigoLista: list.codigo_lista
      })
      console.log('Producto agregado a la lista:', responseProducto.data)
      setOpen(false)
      getListas()
      setListError('')
    } catch (errorProducto) {
      console.error('Error al agregar el producto a la lista:', errorProducto)
      if (errorProducto.response && errorProducto.response.status === 302) {
        setListError('El producto ya existe en la lista')
      }
    }
  }
  useEffect(() => {
    getListas()
  }, [props.usuario])

  return (
    <div>
      <Button
        type="button"
        onClick={handleOpen}
        sx={{
          color: 'white',
          backgroundColor: '#4a732b',
          width: 200,
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
        Añadir a Lista
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Seleccione la Lista</DialogTitle>
        <DialogContent>
        <TextField
                label="Nueva Lista"
                value={inputValue}
                onChange={handleInputChange}
                fullWidth
              />
         {textFieldError && (
            <Typography color="error" variant="body2" style={{ marginTop: '8px' }}>
              {textFieldError}
            </Typography>
         )}
        {listas.length === 0
          ? (
            <Typography>No existen listas</Typography>
            )
          : (
            <>

              <List>
                {listas.map((list) => (
                  <ListItem
                    button
                    key={list.codigo_lista}
                    onClick={() => handleExistingListClick(list)}
                  >
                    <ListItemText primary={list.nombre_lista} />
                  </ListItem>
                ))}
              </List>
            </>
            )}
             {listError && (
            <Typography color="error" variant="body2" style={{ marginTop: '8px' }}>
              {listError}
            </Typography>
             )}

        </DialogContent>
        <DialogActions>
          <Button
            type="button"
            onClick={handleClose}
            sx={{
              color: 'white',
              backgroundColor: '#4a732b',
              width: 140,
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
            type="button"
            onClick={handleSave}
            sx={{
              color: 'white',
              backgroundColor: '#4a732b',
              width: 140,
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
        Agregar
      </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default AddList
