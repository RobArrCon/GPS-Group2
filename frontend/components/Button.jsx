import React from 'react'
import { Button } from '@mui/material'

const MyButton = (props) => {
  return (
    <Button
    sx={{
      color: 'white',
      backgroundColor: '#4a732b',
      width: {
        xs: '100', md: '180'
      },
      height: 50,
      borderRadius: 8,
      fontSize: {
        xs: 12, md: 18
      },
      padding: '8px 8px',
      fontFamily: 'Roboto',
      fontWeight: 'bold',
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
      transition: 'background-color 0.3s',
      '&:hover': {
        backgroundColor: '#398623'
      }
    }}>{props.text}</Button>
  )
}

export default MyButton
