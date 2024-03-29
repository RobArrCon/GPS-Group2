import { Roboto } from 'next/font/google'
import { createTheme } from '@mui/material/styles'

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif']
})

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
      b: '#eeffdc',
      c: '#DAF7A6'
    },
    secondary: {
      main: '#19857b'
    },
    error: {
      main: '#19857b'

    }
  },
  typography: {
    fontFamily: roboto.style.fontFamily
  }
})

export default theme
