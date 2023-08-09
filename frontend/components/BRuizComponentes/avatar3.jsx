import React, { useState } from 'react'
import { Avatar, Menu, MenuItem } from '@mui/material'
import { useRouter } from 'next/router'

const MyAvatar = (props) => {
  const [anchorEl, setAnchorEl] = useState(null)

  const router = useRouter()

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  function stringToColor (string) {
    let hash = 0
    let i

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash)
    }

    let color = '#'

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff
      color += `00${value.toString(16)}`.slice(-2)
    }
    return color
  }

  function stringAvatar (name) {
    if (!name) {
      return null
    }

    const nameParts = name.split(' ')
    let initials = ''

    if (nameParts.length === 1) {
      initials = nameParts[0][0]
    } else if (nameParts.length >= 2) {
      initials = nameParts[0][0] + nameParts[1][0]
    }

    return {
      sx: {
        bgcolor: stringToColor(name),
        marginLeft: 'auto'
      },
      children: initials
    }
  }

  const avatarProps = stringAvatar(props.nombre)

  if (!avatarProps) {
    return null
  }

  const handleLogout = () => {
    localStorage.clear()
    router.replace('/')
  }

  return (
    <>
      <Avatar {...avatarProps} onClick={handleMenuOpen} />

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        {/* Agrega aquí los items del menú */}
        <MenuItem onClick={handleMenuClose}>Perfil</MenuItem>
        <MenuItem onClick={handleMenuClose}>configuracion</MenuItem>
        <MenuItem onClick={handleLogout}>Cerrar Sesión</MenuItem>
      </Menu>
    </>
  )
}

export default MyAvatar
