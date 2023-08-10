import * as React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import FavoriteIcon from '@mui/icons-material/Favorite'
import HeartBrokenIcon from '@mui/icons-material/HeartBroken'
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined'
import { Divider, Stack, Typography } from '@mui/material'
import ImageList from './ImageList'
import axios from 'axios'
import { useState } from 'react'
import TinyMenu from './TinyMenu'

export default function SideList ({ datos, nombresListas }) {
  const [selectedIndex, setSelectedIndex] = useState([])
  const [productos, setProductos] = useState([])

  const getProductos = async (index) => {
    const response = await axios.get(`${process.env.API_URL}/lista/productos/${index}`)
    setProductos(response.data)
  }

  const handleListItemClick = (index) => {
    setSelectedIndex(index)
    getProductos(index)
  }

  const showImages = () => {
    if (selectedIndex.length === 0) {
      return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100%', width: '90%' }}>
          <Typography textAlign={'center'} variant='overline'>Seleccione una lista!</Typography>
        </div>
      )
    } else
    if (productos.length === 0) {
      return (
        <Stack sx={{ width: '90%', alignItems: 'center', justifyContent: 'center', minHeight: '100%' }}>
          <div style={{ display: 'flex' }}>
            <Typography textAlign={'center'} variant='overline' >Lista sin productos</Typography>
          </div>
          <div style={{ display: 'flex' }}>
            <HeartBrokenIcon/>
          </div>
        </Stack>
      )
    } else {
      return (
        <ImageList datos = {productos} lista = {selectedIndex}/>
      )
    }
  }

  const showListas = () => {
    return datos.map(datos => {
      const nombre = datos.nombre_lista === 'Favoritos'
      return (
            <ListItem disablePadding key={datos.nombre_lista} >
                <ListItemButton
                  selected={selectedIndex === datos.codigo_lista}
                  onClick={(event) => handleListItemClick(datos.codigo_lista)}
                >
                    <ListItemIcon >
                        <FavoriteIcon sx = {{ display: nombre ? 'block' : 'none', fontSize: '100' }}/>
                        <LabelOutlinedIcon sx = {{ display: nombre ? 'none' : 'block', fontSize: '100' }} />
                    </ListItemIcon>
                    <ListItemText primary={datos.nombre_lista} />
                </ListItemButton>
            </ListItem>
      )
    })
  }
  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4} pt={6} width={'90%'} maxHeight="70vh">
  <List
    sx={{ minWidth: 250, bgcolor: 'background.paper', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)', borderRadius: '16px', overflowY: 'auto' }}
    aria-label="contacts" width={{ xs: '100%' }}
  >
    <ListItem sx={{ display: 'flex', justifyContent: 'center' }}>
      <TinyMenu listas={nombresListas} />
    </ListItem>
    <Divider />
    {showListas()}
  </List>
  <>
    {showImages()}
  </>
</Stack>

  )
}
