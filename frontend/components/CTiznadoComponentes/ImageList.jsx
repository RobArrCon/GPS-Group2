/* eslint-disable no-lone-blocks */
import * as React from 'react'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import ImageListItemBar from '@mui/material/ImageListItemBar'
import IconButton from '@mui/material/IconButton'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { Box, Button } from '@mui/material'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Swal from 'sweetalert2'

export default function TitlebarImageList ({ datos, lista }) {
  const [columns, setColumns] = useState(2) // Número de columnas inicial
  const router = useRouter()

  useEffect(() => {
    const updateColumns = () => {
      const screenWidth = window.innerWidth
      if (screenWidth >= 1280) {
        setColumns(4)
      } else {
        setColumns(2)
      }
    }

    window.addEventListener('resize', updateColumns)
    updateColumns() // Llama a la función inicialmente

    return () => {
      window.removeEventListener('resize', updateColumns)
    }
  }, [])

  const arrayImages = []

  const [values] = useState({
    codigoLista: lista,
    codigoProducto: ''
  })

  const setImages = async () => {
    return (
      datos.map(datos => (
        arrayImages.push(
          {
            img: datos.ruta_imagen,
            title: datos.nombre_producto,
            codigo: datos.codigo_producto
          }
        )
      ))
    )
  }

  const deleteItem = async (codigo) => {
    values.codigoProducto = codigo
    console.log()
    try {
      const response = await axios.delete(`${process.env.API_URL}/deleteProducto/${values.codigoLista}/${values.codigoProducto}`)
      if (response.status === 200) {
        Swal.fire({ title: 'Producto eliminado correctamente' }).then(() => { window.location.reload() })
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const pushPage = (title) => {
    router.push({ pathname: 'Producto', query: { nombreProducto: title } })
  }

  const showImages = () => {
    setImages()
    return (
      arrayImages.map((item) => (
        <Box key={item.codigo} maxWidth='200'>
          <ImageListItem >
            <Button onClick={() => pushPage(item.title)}>
            <img
                src={`${item.img}`}
                alt={item.title}
                loading="lazy"
                width={'150'}
                height={'180'}
              />
            </Button>

          <ImageListItemBar
        sx={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
            'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
        }}
          title={item.title}
          position="top"
          actionIcon={
            <IconButton
              sx={{ color: 'secondary.main' }}
              onClick={() => deleteItem(item.codigo)}
            >
              <FavoriteIcon />
            </IconButton>
          }
        />
      </ImageListItem>
        </Box>
      ))
    )
  }
  return (
    <ImageList
      sx={{ height: 450 }} cols={columns} rowHeight={164}
      >
      {showImages()}
    </ImageList>
  )
}
