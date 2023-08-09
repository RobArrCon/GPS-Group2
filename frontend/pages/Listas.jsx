import * as React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import MyBackground from '../components/CTiznadoComponentes/GeneralBackground'
import SideList from '../components/CTiznadoComponentes/SideList'
import { Stack, Typography } from '@mui/material'

export default function ListasUsuario () {
  const [listas, setListas] = useState([])
  const nombresListas = []

  const getListas = async () => {
    const response = await axios.get(`${process.env.API_URL}/listas/${localStorage.getItem('nombreUsuario')}`)
    setListas(response.data)
  }

  const setNombres = () => {
    return (
      listas.map(nombres => (
        nombresListas.push(
          nombres.nombre_lista
        )
      ))
    )
  }

  useEffect(() => {
    getListas()
  }, [])

  const showListas = () => {
    setNombres()
    return (
      <SideList datos = {listas} nombresListas = {nombresListas}></SideList>
    )
  }

  return (
    <MyBackground>
      <Stack sx={{ justifyContent: 'center', alignItems: 'center' }} >
        <Typography variant='h2' >Listas</Typography>
      </Stack>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4} >
        {showListas()}
      </Stack>
    </MyBackground>
  )
}
