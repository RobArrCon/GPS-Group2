/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { TextField, MenuList, MenuItem, Typography } from '@mui/material'

const DisplayBox = (props) => {
  const keys = ['nombre_producto', 'nombre_categoria', 'descripcion_producto']
  return (<div>
    <table>
        <th>Producto</th>
        <th>Categorias</th>
        <th>Descripcion</th>
        {
            props.items.filter((items) => {
              return keys.some(key => items[key].toLowerCase().includes(props.filterTerm))
            }).map(producto => {
              console.log(producto.codigo_producto)
              return (<tr key={producto.codigo_producto}>
                    <td>{producto.nombre_producto}</td>
                    <td>{producto.nombre_categoria}</td>
                    <td>{producto.descripcion_producto}</td>
                </tr>)
            })
        }
    </table>
    </div>)
}

export default DisplayBox
