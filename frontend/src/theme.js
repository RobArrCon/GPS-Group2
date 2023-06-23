<<<<<<< HEAD
import { Roboto } from 'next/font/google'
import { createTheme } from '@mui/material/styles'
=======
import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
>>>>>>> 5b000b1fdb9f54c51e1c244aa31141c1f8ac6487

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
<<<<<<< HEAD
  fallback: ['Helvetica', 'Arial', 'sans-serif']
})
=======
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});
>>>>>>> 5b000b1fdb9f54c51e1c244aa31141c1f8ac6487

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
      b: '#eeffdc',
<<<<<<< HEAD
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
=======
      c: '#DAF7A6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: 'red',
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

export default theme;
>>>>>>> 5b000b1fdb9f54c51e1c244aa31141c1f8ac6487
