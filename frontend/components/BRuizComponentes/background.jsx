import React from 'react'
import { Box, Container } from '@mui/material'

const MyBackground = ({ children }) => {
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
    <Box
    sx={{
      background: 'linear-gradient(to right bottom,  #C7E9B0 ,  #90ad7a )',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '16px',
      boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
      width: '94vw',
      minHeight: '90vh',
      mt: 2
    }}
    > { children }</Box>
    </Container>
  )
}

export default MyBackground
