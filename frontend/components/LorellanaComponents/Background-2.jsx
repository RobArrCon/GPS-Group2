import React from 'react'
import { Container } from '@mui/material'
import Copyright from './Copyright'

const MyBackground2 = ({ children }) => {
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
    {children}
    <Copyright></Copyright>
    </Container>
  )
}

export default MyBackground2
