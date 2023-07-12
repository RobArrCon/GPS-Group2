/* eslint-disable no-unused-vars */
import * as React from 'react'
import { Typography, Box } from '@mui/material'
import MyBackground from '../components/Background.jsx'
import SearchBarProp from '../components/SearchProp.jsx'
import DisplayBox from '../components/DisplayResults.jsx'
import products from '../productos.json'

export default function SearchProducto () {
  const productos = products.map(producto => {
    return producto.nombre_producto
  })
  const [filterString, setFilterTerm] = React.useState('')
  console.log(productos)

  return (
    <MyBackground>
      <SearchBarProp label="Buscar Productos" items={productos} setFilterTerm={setFilterTerm}></SearchBarProp>
      <DisplayBox items={products} filterTerm={filterString}></DisplayBox>
    </MyBackground>
  )
}
