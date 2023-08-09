/* eslint-disable no-unused-vars */
import * as React from 'react'
import ProductoSearchDisplay from '../components/GonzaloComponente/BuscarProducto.jsx'
import { useRouter } from 'next/router'

export default function BuscarProductoDisplay () {
  const router = useRouter()
  const { nombreCategoria } = router.query
  return (
    <ProductoSearchDisplay
      label="Buscar Productos"
      default=''
      categoria={ nombreCategoria }
    >
    </ProductoSearchDisplay>)
}
