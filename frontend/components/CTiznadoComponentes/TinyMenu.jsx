/* eslint-disable no-case-declarations */
import * as React from 'react'
import { Button } from '@mui/material'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import PostAddRoundedIcon from '@mui/icons-material/PostAddRounded'
import DeleteSweepRoundedIcon from '@mui/icons-material/DeleteSweepRounded'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useState } from 'react'

const ITEM_HEIGHT = 48

export default function LongMenu ({ onOptionSelect, listas }) {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const [values] = useState({
    nombreLista: '',
    nombreUsuario: ''
  })

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleOptionClick = (option) => {
    if (onOptionSelect) {
      onOptionSelect(option)
    }
    handleClose()
  }

  const handleMenuOption = async (option) => {
    switch (option) {
      case 'Crear Lista':
        const result = await Swal.fire({
          title: 'Crear Lista',
          input: 'text',
          inputLabel: 'Ingresa el nombre de tu nueva lista',
          inputPlaceholder: 'Nombre',
          showCancelButton: true,
          cancelButtonText: 'Volver atras',
          inputValidator: (value) => {
            if (!value) {
              return 'Ingrese un nombre!'
            }
          }
        })
        if (listas.includes(result.value)) {
          Swal.fire('Lista ya existe!')
        } else
        if (result.isConfirmed) {
          values.nombreLista = result.value
          values.nombreUsuario = localStorage.getItem('nombreUsuario')
          createLista()
        }
        break
      case 'Eliminar Lista':
        const deletedList = await Swal.fire({
          title: 'Selecciona una lista a eliminar',
          input: 'select',
          inputOptions: listas,
          inputPlaceholder: 'Selecciona una lista',
          showCancelButton: true,
          cancelButtonText: 'Volver atras',
          inputValidator: (value) => {
            if (!value) {
              return 'Seleccione una lista!'
            }
          }
        })

        if (deletedList.isConfirmed) {
          values.nombreLista = listas[deletedList.value]
          deleteLista()
        }
        break
    }
  }

  const createLista = async () => {
    try {
      if (values.nombreLista) {
        const response = await axios.post(`${process.env.API_URL}/lista`, values)
        console.log(values.nombreLista)
        if (response.status === 200) {
          Swal.fire({ title: 'Lista creada correctamente' }).then(() => { window.location.reload() })
        }
      }
    } catch (error) {
      Swal.fire({ title: 'Error', text: 'Intente nuevamente' })
    }
  }

  const deleteLista = async () => {
    console.log(values)
    try {
      if (values.nombreLista) {
        console.log(values)
        const response = await axios.get(`${process.env.API_URL}/lista/codigo/${values.nombreLista}`)
        if (response.status === 200) {
          const response2 = await axios.delete(`${process.env.API_URL}/lista/delete/${response.data.codigo_lista}`)
          if (response2.status === 200) {
            Swal.fire({ title: 'Lista eliminada correctamente' }).then(() => { window.location.reload() })
          }
        }
      }
    } catch (error) {
      Swal.fire({ title: 'Error', text: 'Intente nuevamente' })
    }
  }

  return (
    <div style={{ width: '100%' }}>
      <Button
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        style={{ width: '100%', height: '100%' }}
        endIcon={<MoreVertIcon/>}
      >
        Opciones
      </Button>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button'
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5
          }
        }}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'left'
        }}
      >
          <MenuItem key={'Crear Lista'} selected={'Crear Lista' === 'Pyxis'} onClick={() => { handleOptionClick('Crear Lista'); handleMenuOption('Crear Lista') }}>
            <ListItemIcon>
              <PostAddRoundedIcon fontSize='small'/>
            </ListItemIcon>
            <ListItemText>Crear Lista</ListItemText>
          </MenuItem>
          <MenuItem key={'Eliminar Lista'} selected={'Eliminar Lista' === 'Pyxis'} onClick={() => { handleOptionClick('Eliminar Lista'); handleMenuOption('Eliminar Lista') }}>
          <ListItemIcon>
            <DeleteSweepRoundedIcon fontSize='small'/>
          </ListItemIcon>
          <ListItemText>Eliminar Lista</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  )
}
