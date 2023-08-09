import React from 'react'
import { Button } from '@mui/material'

const MyButton = ({ text, imageSource }) => {
  const buttonStyle = {
    width: '180px',
    height: '180px',
    // backgroundColor: '#4a732b',
    // color: 'black',
    fontSize: {
      xs: 16,
      md: 22
    },
    fontFamily: 'Helvetica, Arial, sans-serif',
    padding: '8px',
    // fontFamily: 'Roboto',
    fontWeight: 'bold',
    boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.25)',
    transition: 'background-color 0.3s',
    backgroundImage: `url(${imageSource})`,
    backgroundSize: 'cover',
    backgroundPosition: 'top',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    textShadow: '1px 1px 2px white',
    color: 'black',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex',
    alignItems: 'center',
    borderRadius: '8px',
    boxSizing: 'border-box'
  }

  const containerStyle = {
    width: '200px',
    height: '250px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '16px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.25)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }

  return (
    <div style={containerStyle}>
      <Button style={buttonStyle}>{text}</Button>
    </div>
  )
}

export default MyButton
