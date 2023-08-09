import React from 'react'
import { Button } from '@mui/material'

const mButton = ({ children, onClick }) => {
  return (
    <Button onClick={onClick}>
      {children}
    </Button>
  )
}

export default mButton
