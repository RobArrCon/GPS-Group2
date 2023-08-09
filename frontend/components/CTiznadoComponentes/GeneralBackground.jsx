import React from 'react'
import { Box, Container } from '@mui/material'
import Copyright from './Copyright'
import GeneralAppBar from '../CTiznadoComponentes/GeneralAppBar'

const MyGeneralBackground = ({ children }) => {
  return (
    <Container
      component="main"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        minWidth: '100vw',
        backgroundColor: 'primary.b',
        flexDirection: 'column'
      }}
    >
    <GeneralAppBar></GeneralAppBar>
    <Box
    sx={{
      display: 'table-column-group',
      minHeight: '85vh',
      minWidth: '100vw',
      p: 5,
      mt: 4
    }}
    > { children }</Box>
    <Copyright></Copyright>
    </Container>
  )
}

export default MyGeneralBackground
