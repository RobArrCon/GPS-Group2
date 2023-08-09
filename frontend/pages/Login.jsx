import { React, useEffect, useState } from 'react'
import axios from 'axios'
import sweet from 'sweetalert2'
import { Grid, Typography, Box, TextField, Link, Avatar } from '@mui/material'
import Head from 'next/head'
import { useRouter } from 'next/router'
import MyBackground2 from '../components/LorellanaComponents/Background-2.jsx'
import MyButton from '../components/LorellanaComponents/Button.jsx'
import ImagenV from '../components/LorellanaComponents/Vaquita.jsx'

const Login = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [values, setValues] = useState({
    usuario: '',
    contrasena: ''
  })
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        `${process.env.API_URL}/usuario/login`,
        values
      )
      if (response.status === 200) {
        localStorage.setItem('usuario', values.usuario)
        localStorage.setItem('tipoUsuario', response.data.user.rol_user)
        sweet
          .fire({
            title: 'Bienvenido',
            icon: 'success',
            confirmButtonText: 'OK'
          })
          .then((result) => {
            router.push('/Home')
          })
      }
    } catch (error) {
      console.error(error)
      sweet.fire({
        icon: 'error',
        title: 'Error de autenticación',
        text: 'Las credenciales no corresponden'
      })
    }
  }

  useEffect(() => {
    const storedRut = localStorage.getItem('usuario')
    const storedTipoUsuario = localStorage.getItem('tipoUsuario')

    if (storedRut && storedTipoUsuario) {
      router.push('/Home')
    } else {
      setLoading(false)
    }
  }, [])
  return (
    <MyBackground2>
      <Head></Head>
      {!loading && (
      <Grid
        container
        sx={{
          background: 'white',
          alignItems: 'center',
          borderRadius: '50px',
          boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
          width: {
            xs: '90vw',
            sm: '85vw',
            md: '70vw'
          },
          height: {
            xs: '95vh',
            sm: '90vh',
            md: '85vh'
          },
          mt: 2,
          display: 'flex'
        }}
      >
        <Grid
          item lg={7}
          sx={{
            height: '100%',
            minHeight: '80vh',
            padding: 10,
            background: 'linear-gradient(to right bottom,  #C7E9B0 ,  #90ad7a )',
            borderRadius: '50px 0 0 50px',
            display: { xs: 'none', md: 'none', lg: 'block' }
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: '50px',
                sm: '38px',
                md: '50px',
                lg: '80px'
              },
              fontFamily: 'Roboto',
              fontWeight: '800',
              mb: 4,
              color: 'white',
              textAlign: 'center'
            }}>
            La Vegateca
          </Typography>
          <ImagenV ruta={'vaquita.png'} />
        </Grid>
        <Grid
          item xs={12} lg={5}
          sx={{
            height: '100%',
            minHeight: '80vh',
            borderRadius: '0 10px 10px 0',
            display: 'flex',
            flexDirection: 'column'
          }}>
          <Box
            sx={{
              mt: 6,
              width: '64%',
              background: '  #90ad7a',
              borderRadius: '0 100px 100px 0'
            }}
          >
            <Typography
              sx={{
                fontSize: {
                  xs: '16px',
                  sm: '24px',
                  md: '27px',
                  lg: '27px'
                },
                mt: 1,
                mb: 1,
                fontFamily: 'Roboto',
                fontWeight: '800',
                color: 'white',
                textAlign: 'center'
              }}>
              INICIAR SESIÓN </Typography>
          </Box>

          <Box
            component="form"
            onSubmit={onSubmit}
            sx={{
              flex: 1,
              width: { xs: '80%', sm: '90%', md: '90%' },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              mt: 4,
              mb: 2,
              marginX: 'auto',
              padding: 'auto',
              borderRadius: '50px'
            }}
          >
            <Avatar
              sx={{
                width: '120px',
                height: '120px',
                mb: {
                  xs: 0.5,
                  md: 1,
                  lg: 4
                },
                background: '  #90ad7a'
              }}
            ></Avatar>
            <TextField
              margin="normal"
              required
              id="usuario"
              label="Usuario"
              name="usuario"
              autoComplete="usuario"
              type="text"
              autoFocus
              onChange={onChange}
              variant="outlined"
              sx={{
                width: {
                  xs: '80%',
                  md: '70%',
                  lg: '50%'
                },
                mb: 2,
                mt: 2,
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'green'
                },
                '& .MuiInputLabel-root': {
                  color: 'green'
                }
              }}

            />
            <TextField
              margin="normal"
              required
              name="contrasena"
              label="Contraseña"
              type="password"
              id="contrasena"
              autoComplete="current-password"
              onChange={onChange}
              sx={{
                width: {
                  xs: '80%',
                  md: '70%',
                  lg: '50%'
                },
                mb: 4,
                mt: 2,
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'green'
                },
                '& .MuiInputLabel-root': {
                  color: 'green'
                }
              }}
            />
            <MyButton text="Iniciar Sesión" />
            <Typography
              sx={{
                textAlign: 'center',
                alignItems: 'center',
                mt: {
                  xs: 2,
                  md: 4,
                  lg: 1
                },
                mb: 2,
                width: '100%'
              }}>¿Aún no tienes cuenta? <Link
                href='/Register'
                sx={{
                  textAlign: 'center',
                  alignItems: 'center',
                  mt: {
                    xs: 2,
                    md: 4,
                    lg: 1
                  },
                  mb: 2,
                  width: '100%'
                }}
              >
                Registrate Aqui.
              </Link></Typography>

          </Box>

        </Grid>
      </Grid>
      )}
    </MyBackground2 >
  )
}

export default Login
