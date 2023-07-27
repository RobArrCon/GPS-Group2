/* eslint-disable no-unused-vars */
import * as React from 'react'
import { Typography, Box, Grid } from '@mui/material'
import MyBackground from '../components/Background.jsx'
import SearchBarProp from '../components/SearchProp.jsx'
import DisplayBox from '../components/DisplayResults.jsx'
import products from '../productos.json'
import DrawerAppBar from '../components/GeneralAppBar.jsx'

export default function SearchProducto (props) {
  const productos = products.map(producto => {
    return producto.nombre_producto
  })
  const [filterString, setFilterTerm] = React.useState(props.search)

  return (
    <>
      <DrawerAppBar>
      </DrawerAppBar>
      <Grid container>
        <Grid item>
          <SearchBarProp
            label="Buscar Productos"
            default={filterString}
            items={productos}
            setFilterTerm={setFilterTerm}
        />
        </Grid>
        <Grid item>
          <DisplayBox
            style={{
              paddingTop: '25px'
            }}
            items={products}
            filterTerm={filterString}
            />
        </Grid>
      </Grid>
      </>

  )
}
