import * as React from 'react'
import Typography from '@mui/material/Typography'
import MuiLink from '@mui/material/Link'

export default function Copyright () {
  return (
    <Typography variant="body2" color="text.secondary" align="center" marginTop={2}>
      {'Copyright © '}
      <MuiLink color="inherit">
        Vegateca
      </MuiLink>{' '}
      {new Date().getFullYear()}
    </Typography>
  )
}
