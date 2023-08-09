import React, { useState } from 'react'
import axios from 'axios'
import sweet from 'sweetalert2'
import { useRouter } from 'next/router'
import {
  Grid,
  Typography,
  Box,
  TextField,
  Link,
  LinearProgress
} from '@mui/material'
import Head from 'next/head'
import MyBackground2 from '../components/Background-2.jsx'
import MyButton from '../components/Button.jsx'
import ImagenV from '../components/Vaquita.jsx'

const Register = () => {
  const router = useRouter()
  const [values, setValues] = useState({
    correo: '',
    usuario: '',
    contrasena: '',
    rol: 'usuario'
  })
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [passwordError, setPasswordError] = useState(false)
  const calculatePasswordStrength = (password) => {
    let strength = 0
    if (password.length >= 8) {
      strength += 50
      setPasswordError(false)
    } else {
      setPasswordError(true)
    }
    if (/[A-Z]/.test(password)) strength += 25
    if (/[0-9]/.test(password)) strength += 25
    setPasswordStrength(strength)
    setValues({ ...values, contrasena: password })
  }
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  const onSubmit = async (e) => {
    e.preventDefault()
    console.log(values)
    try {
      const response = await axios.post(
        `${process.env.API_URL}/usuario`,
        values
      )
      console.log(response.data)

      const response1 = await axios.post(
        `${process.env.API_URL}/lista/fav`,
        { nombreUsuario: values.usuario }
      )
      console.log(response1.data)

      sweet.fire({
        icon: 'success',
        title: 'Registro Exitoso',
        confirmButtonText: 'Iniciar Sesión'
      }).then(() => {
        router.push({ pathname: 'Login' })
      })
    } catch (error) {
      console.error(error)
      if (error.response && error.response.status === 302) {
        sweet.fire({
          icon: 'error',
          title: 'Usuario no Disponible'
        })
      } else {
        sweet.fire({
          icon: 'error',
          title: 'Error en las credenciales',
          text: 'Las credenciales no corresponden'
        })
      }
    }
  }
  return (
    <MyBackground2>
      <Head></Head>
      <Grid
        container
        sx={{
          background: 'white',
          justifyContent: 'center',
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
          item
          xs={12}
          lg={5}
          sx={{
            height: '100%',
            minHeight: '80vh',
            borderRadius: '0 10px 10px 0',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Box
            sx={{
              mt: 6,
              width: '64%',
              background: '  #90ad7a',
              borderRadius: ' 100px 0 0 100px ',
              alignSelf: 'flex-end'
            }}
          >
            <Typography
              sx={{
                fontSize: {
                  xs: '16px',
                  sm: '24px',
                  md: '30px',
                  lg: '30px'
                },
                mt: 1,
                mb: 1,
                fontFamily: 'Roboto',
                fontWeight: '800',
                color: 'white',
                textAlign: 'center'
              }}
            >
              REGISTRARSE{' '}
            </Typography>
          </Box>

          <Box
            component='form'
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
            <TextField
              margin='normal'
              required
              id='correo'
              label='Correo'
              name='correo'
              autoComplete='correo'
              type='email'
              autoFocus
              onChange={onChange}
              variant='outlined'
              sx={{
                width: {
                  xs: '80%',
                  md: '70%',
                  lg: '50%'
                },
                mb: 2,
                mt: 2,
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
                  {
                    borderColor: 'green'
                  },
                '& .MuiInputLabel-root': {
                  color: 'green'
                }
              }}
            />
            <TextField
              margin='normal'
              required
              id='usuario'
              label='Usuario'
              name='usuario'
              autoComplete='usuario'
              type='text'
              autoFocus
              onChange={onChange}
              variant='outlined'
              sx={{
                width: {
                  xs: '80%',
                  md: '70%',
                  lg: '50%'
                },
                mb: 2,
                mt: 2,
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
                  {
                    borderColor: 'green'
                  },
                '& .MuiInputLabel-root': {
                  color: 'green'
                }
              }}
            />
            <TextField
              margin='normal'
              required
              name='contrasena'
              label='Contraseña'
              type='password'
              id='contrasena'
              onChange={(event) =>
                calculatePasswordStrength(event.target.value)
              }
              autoComplete='current-password'
              helperText={
                passwordError
                  ? 'La contraseña debe tener al menos 8 caracteres'
                  : ''
              }
              sx={{
                width: {
                  xs: '80%',
                  md: '70%',
                  lg: '50%'
                },
                mt: 2,
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
                  {
                    borderColor: 'green'
                  },
                '& .MuiInputLabel-root': {
                  color: 'green'
                }
              }}
            />
            <LinearProgress
              variant='determinate'
              value={passwordStrength}
              color='secondary'
              sx={{
                mb: 2,
                width: {
                  xs: '80%',
                  md: '70%',
                  lg: '50%'
                },
                '& .MuiLinearProgress-bar': {
                  backgroundColor:
                    passwordStrength <= 26
                      ? '#ffb562'
                      : passwordStrength <= 51
                        ? ' #ffec76 '
                        : passwordStrength <= 76
                          ? ' #d8ff90 '
                          : ' #aefc99 '
                }
              }}
            />
            <MyButton text='Registrarse' />
            <Typography
              sx={{
                textAlign: 'center',
                alignItems: 'center',
                mt: {
                  xs: 2,
                  md: 4,
                  lg: 10
                },
                mb: 2,
                width: '100%'
              }}
            >
              ¿Ya tienes cuenta?{' '}
              <Link
                href='/Login'
                sx={{
                  textAlign: 'center',
                  alignItems: 'center',
                  mt: {
                    xs: 2,
                    md: 4,
                    lg: 10
                  },
                  mb: 2,
                  width: '100%'
                }}
              >
                Iniciar Sesión.
              </Link>
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          lg={7}
          sx={{
            height: '100%',
            minHeight: '80vh',
            padding: 10,
            background:
              'linear-gradient(to right bottom ,  #90ad7a,  #C7E9B0 )',
            borderRadius: '0 50px 50px 0',
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
            }}
          >
            La Vegateca
          </Typography>
          <ImagenV ruta={'vaquita.png'} />
        </Grid>
      </Grid>
    </MyBackground2>
  )
}

export default Register
