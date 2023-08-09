import React from 'react'
import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'

function stringToColor (string) {
  let hash = 0
  let i

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash)
  }

  let color = '#'

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff
    color += `00${value.toString(16)}`.slice(-2)
  }
  /* eslint-enable no-bitwise */

  return color
}

function stringAvatar (name) {
  return {
    sx: {
      bgcolor: stringToColor(name)
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
  }
}

// PENDIENTE el nombre automatico en base a un get de la base de datos.

function BackgroundLetterAvatars () {
  return (

    <Stack direction="row" spacing={2} sx={{ justifyContent: 'flex-end' }}>
    <a href="https://google.com">
      <Avatar onClick={{}} sx={{ alignSelf: 'flex-end' }} {...stringAvatar('Bryan Ruiz')} />
    </a>
    </Stack>
  )
}

export default BackgroundLetterAvatars
