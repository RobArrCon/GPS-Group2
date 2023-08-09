import { React, useState, useEffect } from 'react'
import { Typography, Box, Grid } from '@mui/material'
import Head from 'next/head'
import { useRouter } from 'next/router'
import MyBackground from '../components/Background.jsx'
import MyImage from '../components/ImagenInicio.jsx'
import MyButton from '../components/Button.jsx'

export default function Index () {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  // useEffect(() => {
  //   const storedRut = localStorage.getItem('usuario')
  //   const storedTipoUsuario = localStorage.getItem('tipoUsuario')

  //   if (storedRut && storedTipoUsuario) {
  //     if (storedTipoUsuario === 'administrador') {
  //       router.push({ pathname: '/administrador/Inicio_Administrador' })
  //     } else if (storedTipoUsuario === 'usuario') {
  //       router.push({ pathname: '/usuario/inicio_estudiante' })
  //     }
  //   } else {
  //     setLoading(false)
  //   }
  // }, [])
  return (
    <MyBackground>
      <Head>
        <title>Vegateca</title>
      </Head>
      {!loading && (
      <Grid>
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
            padding: 'auto',
            textAlign: 'center',
            justifyContent: 'center',
            '@media (max-width: 768px)': {
              flexDirection: 'column'
            }
          }}
        >
           <MyImage ruta={'vegateca-1.webp'} />
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
          <MyButton text="INICIAR SESIÓN" href="/Login"/>
          <MyButton text="REGISTRATE" href="/Register" />
        </Box>
    </Box>
    </Grid>
      )}
    </MyBackground>
  )
}
