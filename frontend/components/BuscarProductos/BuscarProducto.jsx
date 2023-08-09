/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { TextField, Typography, Card, CardMedia, CardActionArea, CardContent, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import DrawerAppBar from '../GeneralAppBar'
const ProductoSearchDisplay = (props) => {
  const API_URL = process.env.NEXT_PUBLIC_SERVIDOR
  const router = useRouter()
  const [productos, setProductos] = useState(require('../../productos.json'))
  const [categorias, setCategorias] = useState([''])
  const [searchValue, setSearchValue] = useState('')
  const [categoriaValue, setCategoriaValue] = useState('')
  const keys = ['nombre_producto', 'nombre_categoria', 'descripcion_producto']

  const changeTerm = (event) => {
    setSearchValue(event.target.value)
    console.log(productos)
  }
  const loadProductos = async () => {
    try {
      axios.get(`${API_URL}/productos`)
        .then(res => {
          setProductos(res.data)
        })
    } catch (err) {
      console.log(err)
    }
  }

  const loadCategorias = async () => {
    try {
      axios.get(`${API_URL}/categorias`)
        .then(res => {
          setCategorias(res.data.map((elemento) => {
            return elemento.nombre_categoria
          }))
        })
    } catch (err) {
      console.log(err)
    }
  }

  const mostrarProducto = (productName) => {
    router.push({
      pathname: '/Producto',
      query: { nombreProducto: productName }
    })
  }

  useEffect(() => {
    loadProductos()
    loadCategorias()
    if (props.default) {
      setSearchValue(props.default && props.default)
    }
    if (props.categoria) {
      setCategoriaValue(props.categoria && props.categoria)
    }
  }, [])

  const filtrarCategorias = (event) => {
    setCategoriaValue(event.target.value)
  }

  return (
    <>
      <DrawerAppBar>
      </DrawerAppBar>
      <br></br>
      <br></br>
      <Grid
        container
        justifyContent='space-around'
        spacing={2}
        sx={{
          marginLeft: '10px',
          marginRight: '25px'
        }}
      >
        <Grid
          item
          xs={6}
        >
          <TextField
            fullWidth
            autoComplete="off"
            label={(props.label !== undefined) ? props.label : 'Buscar'}
            type="search"
            value={searchValue}
            onChange={changeTerm}
            sx={{ backgroundColor: 'white' }}
          />
        </Grid>
        <Grid
          item
          xs={3}
        >
          <FormControl
            fullWidth>
            <InputLabel id="filtroCategoria">Categoría</InputLabel>
            <Select
              labelId="filtroCategoria"
              id="demo-simple-select-helper"
              value={categoriaValue}
              label="Categoría"
              onChange={filtrarCategorias}
            >
              <MenuItem value="">Todas</MenuItem>
              {categorias.map(cat => {
                return <MenuItem key={cat} value={cat}>{cat}</MenuItem>
              })}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid
        container
        alignItems='stretch'
        direction='row'
        spacing={4}
        sx={{
          marginLeft: '10px',
          paddingTop: '25px'
        }}
      >
        {productos.filter((items) => {
          return keys.some(vars => items[vars].toString().toLowerCase().includes(searchValue.toString().toLowerCase()))
        }).filter((items) => {
          return items.nombre_categoria.toString().toLowerCase().includes(categoriaValue.toString().toLowerCase())
        }).map(producto => {
          // eslint-disable-next-line react/jsx-key
          return (<Grid
            item key={producto.codigo_producto}
            sx={{ display: 'flex' }}
          >
            <Card
              sx={{
                maxWidth: 240,
                minWidth: 200,
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'column'
              }}
            >
              <CardActionArea onClick={() => { mostrarProducto(producto.nombre_producto) }}>
                <CardMedia
                  component='img'
                  height={140}
                  src={'./' + producto.ruta_imagen}
                  onError={(event) => {
                    event.target.onError = null
                    event.target.src = './vegateca.png'
                  }}
                  alt='vegateca logo'
                />
                <CardContent>
                  <Typography
                    variant='h5'
                  >
                    {producto.nombre_producto}
                  </Typography>
                  <Typography
                    variant='body2'
                  >
                    {producto.descripcion_producto}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          )
        })
        }
      </Grid>
    </>
  )
}

export default ProductoSearchDisplay
