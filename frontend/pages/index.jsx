import * as React from 'react'
import { Typography, Box } from '@mui/material'
import MyBackground from '../components/Background.jsx'
import MyImage from '../components/Image.jsx'
import MyButton from '../components/Button.jsx'

export default function Index () {
  return (
     <MyBackground>
        <Typography
          variant='body1'
          sx={{
            fontSize: {
              xs: '18px',
              sm: '26px',
              md: '40px'
            },
            fontFamily: 'Roboto',
            fontWeight: '700',
            mt: 10,
            ml: {
              xs: '5%',
              sm: '10%',
              md: '20%'
            },
            color: 'white'
          }}
        >
        Bienvenido a la
        </Typography>
        <Typography
        sx={{
          fontSize: {
            xs: '40px',
            sm: '48px',
            md: '50px',
            lg: '90px'
          },
          fontFamily: 'Roboto',
          fontWeight: '800',
          mb: 4,
          color: 'white',
          textAlign: 'center'
        }}>
        Vegateca
        </Typography>
        <Box
          sx={{
            backgroundColor: '#cee9ba',
            width: '80%',
            margin: 'auto',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            textAlign: 'center',
            justifyContent: 'center',
            '@media (max-width: 768px)': {
              flexDirection: 'column'
            }
          }}
        >
           <MyImage ruta={'vegateca.png'} />
           <Box >
            <Typography
              variant="body1"
              sx={{
                fontSize: {
                  xs: '16px',
                  sm: '24px',
                  md: '32px'
                },
                fontFamily: 'Roboto',
                fontWeight: '600',
                mt: {
                  xs: 2,
                  sm: 4,
                  md: 10
                },
                mb: 3,
                color: 'white'
              }}
            >
              Tú biblioteca de productos veganos para <br/>
              que puedas encontrar todos tus productos <br/>
              en un solo lugar.
            </Typography>
          </Box>
    </Box>
    <Box
  sx={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    mt: 4,
    mb: 4,
    flexDirection: 'column'
  }}
>
  <Typography
    variant='body1'
    sx={{
      fontSize: {
        xs: '12px',
        sm: '16px',
        md: '20px'
      },
      fontFamily: 'Roboto',
      fontWeight: '700',
      color: 'white',
      mb: 4
    }}
  >
    ¡Te invitamos a ser parte de nuestra comunidad!
  </Typography>
  <Box sx={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
    <MyButton text="INICIAR SESIÓN" />
    <MyButton text="REGISTRATE" />
  </Box>
</Box>

    </MyBackground>
  )
}
