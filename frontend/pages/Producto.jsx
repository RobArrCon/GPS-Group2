import { useEffect, useState } from 'react'
import axios from 'axios'
import { Box, Grid, Card, CardHeader, CardContent, Typography, CardMedia, Button, IconButton } from '@mui/material'
import Head from 'next/head'
import MyGeneralBackground from '../components/CTiznadoComponentes/GeneralBackground'
import Comment from '../components/LorellanaComponents/Comment.jsx'
import AddList from '../components/LorellanaComponents/AddList.jsx'
import Swal from 'sweetalert2'

import { useRouter } from 'next/router'

const Producto = () => {
  const router = useRouter()
  const [usuario, setUsuario] = useState([])
  const { nombreProducto } = router.query
  const [data, setData] = useState([])
  const [opinion, setOpinion] = useState([])
  const [link, setLink] = useState([])
  const [number, setNumber] = useState(0)
  const [arrayNombres, setArray] = useState([])

  /* CORRECIÓN DE CODIGO: Agregar boton para mostrar ingredientes */
  const [values] = useState({
    codigoProducto: '',
    codigo: ''
  })

  const [ingredientes, setIngredientes] = useState([])
  const allIngredientes = []

  const getTodos = async () => {
    const response = await axios.get(`${process.env.API_URL}/ingrediente`)
    const ingredientesData = response.data
    console.log('ayudaaaa', ingredientesData)
    setIngredientes(ingredientesData)
  }
  const setTodos = () => {
    ingredientes.map(nombre => (
      allIngredientes.push(
        nombre.nombre_ingrediente
      )
    ))
  }

  const handleIngredientes = async () => {
    const AddList = await Swal.fire({
      title: 'Selecciona un ingrediente a agregar',
      input: 'select',
      inputOptions: allIngredientes,
      inputPlaceholder: 'Ingredientes',
      showCancelButton: true,
      cancelButtonText: 'Volver atras',
      inputValidator: (value) => {
        if (!value) {
          return 'elije un ingrediente'
        }
      }
    })
    if (AddList.isConfirmed) {
      values.codigo = ingredientes[AddList.value].codigo_ingrediente
      console.log('AXIOS:', values)
      const response = await axios.post(`${process.env.API_URL}/conectar`, values)
      if (response.status === 200) {
        Swal.fire({ title: 'Ingrediente agregado correctamente' }).then(() => { window.location.reload() })
      }
    }
  }
  // Fin de elementos agregados para el cambio de Bryan

  const getUsuario = async (usuario) => {
    if (usuario) {
      try {
        const response = await axios.get(`${process.env.API_URL}/usuario/${usuario}`)
        setUsuario(response.data)
      } catch (error) {
        console.error(error)
      }
    }
  }

  const getProducto = async (nombreProducto) => {
    try {
      const response = await axios.get(`${process.env.API_URL}/producto/${nombreProducto}`)
      setData(response.data)
      getOpiniones(response.data.codigo_producto)
      getLinks(response.data.codigo_producto)
      const ingredientesResponse = await axios.get(`${process.env.API_URL}/enproductos/${response.data.codigo_producto}`)
      setArray(getIngredientesForProduct(ingredientesResponse.data))
      values.codigoProducto = response.data.codigo_producto
    } catch (error) {
      console.error(error)
    }
  }
  const getOpiniones = async (codigoProducto) => {
    try {
      const response = await axios.get(`${process.env.API_URL}/opinion/${codigoProducto}`)
      setOpinion(response.data)
      const totalValoraciones = response.data.reduce((sum, item) => sum + item.num_valoracion, 0)
      const averageValoraciones = totalValoraciones / response.data.length
      setNumber(response.data.length > 0 ? averageValoraciones : 0)
    } catch (error) {
      console.error(error)
    }
  }

  const getLinks = async (codigoProducto) => {
    try {
      const response = await axios.get(`${process.env.API_URL}/links/${codigoProducto}`)
      setLink(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const getIngredientesForProduct = (data) => {
    const arrayNombres = []
    arrayNombres.push(data)
    return arrayNombres
  }

  const showingredientes = () => {
    if (arrayNombres.length === 0) {
      return null
    }

    return (
      <Box>
        <Typography variant="body1" sx={{ marginBottom: '8px' }}>
          {arrayNombres.join(', ')}
        </Typography>
      </Box>
    )
  }

  // paginacion
  const [currentPage, setCurrentPage] = useState(1)
  const opinionsPerPage = 5

  const totalPages = Math.ceil(opinion.length / opinionsPerPage)

  const indexOfLastOpinion = currentPage * opinionsPerPage
  const indexOfFirstOpinion = indexOfLastOpinion - opinionsPerPage
  let currentOpinions
  if (opinion.length > 0) {
    currentOpinions = opinion.slice(indexOfFirstOpinion, indexOfLastOpinion)
  }
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1)
  }

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1)
  }

  const showOpiniones = () => {
    if (opinion.length > 0) {
      return currentOpinions.map((opinionItem, index) => {
        const dateParts = opinionItem.fecha_opinion.split('T')[0].split('-')
        const formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`

        return (
        <Card key={index} sx={{ width: '100%', boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)', borderRadius: '8px', marginTop: '20px' }}>
          <CardContent sx={{ padding: '16px' }}>
            <Typography variant="body1" sx={{ marginBottom: '8px' }}>{opinionItem.nombre_usuario} {formattedDate}</Typography>
            <Typography>
            {Array(5).fill().map((_, index) => (
               <IconButton
               key={index}
               color={index <= opinionItem.num_valoracion ? 'primary' : 'default'}
               sx={{ fontSize: 'inherit', padding: '0' }}
               >⭐</IconButton>
            ))}
            </Typography>
            {opinionItem.detalle_opinion}
          </CardContent>
        </Card>
        )
      })
    }
  }

  useEffect(() => {
    const usuario = localStorage.getItem('usuario')
    console.log('Fetching usuario:', usuario)
    getUsuario(usuario)
    getProducto(nombreProducto)
    // Implementar Get para cambio
    getTodos()
  }, [nombreProducto])

  return (
    <MyGeneralBackground>
      <Head>
        <title>Vegateca</title>
      </Head>
      <Box sx={{ width: '100%' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} sx={{ alignItems: 'center' }}>
          <Card sx={{ width: '100%', height: '92%', boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CardHeader sx={{ padding: '16px' }}></CardHeader>
            <CardMedia
              component="img"
              height="auto"
              image={data.ruta_imagen}
              sx={{ maxWidth: '70%' }}
            />
          </Card>
          </Grid>
          <Grid item xs={12} md={6} sx={{ alignItems: 'center' }}>
            <Card sx={{ width: '100%', height: '92%', boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)', borderRadius: '8px' }}>
              <CardHeader sx={{ padding: '16px' }} title={<Typography variant="h5" sx={{ fontWeight: 'bold' }}>{data.nombre_producto}</Typography>}>
              </CardHeader>
              <CardContent sx={{ padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <Typography variant="body1" sx={{ color: 'text.secondary', marginBottom: '8px', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                Valoración:
                {Array(5).fill().map((_, index) => (
                <IconButton
                  key={index}
                  color={index <= number ? 'primary' : 'default'}
                  sx={{ fontSize: 'inherit', padding: '0' }}
                >
                ⭐
                </IconButton>
                ))}
                &nbsp;&nbsp;
                {number}
              </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', marginBottom: '8px' }}>descripcion:{data.descripcion_producto}</Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', marginBottom: '8px' }}>información nutricional:{data.informacion_nutricional}</Typography>
                <Box maxHeight={300} overflow="auto">
                <Typography variant="body1" sx={{ color: 'text.secondary', marginBottom: '8px' }}>Ingredientes:</Typography>
                  {showingredientes()}
                </Box>

                { setTodos()}

                <Button onClick={() => handleIngredientes()}>AGREGAR INGREDIENTE</Button>

                <Box sx={{ marginTop: '16px' }}>
  <Typography variant="body1" sx={{ color: 'text.secondary', marginBottom: '8px' }}>
    Donde adquirirlo:
  </Typography>
  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
    {link.map((linkItem, index) => (
      <Button
        key={linkItem.codigo_link}
        variant="outlined"
        color="primary"
        href={linkItem.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {linkItem.supermercado}
      </Button>
    ))}
  </Box>
</Box>

                <Box sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignSelf: 'center',
                  alignItems: 'center',
                  alignContent: 'center',
                  gap: '8px',
                  flexWrap: 'wrap',
                  mt: {
                    lg: '100px'
                  }
                }}>
                  <AddList usuario={usuario.nombre_usuario} codigoProducto={data.codigo_producto}></AddList>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
             <Box sx={{ width: '100%', boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)', borderRadius: '8px', padding: '10px', backgroundColor: 'white' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'row', alignContent: 'center', height: '60px' }}>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', marginRight: { md: '500px', lg: '850px' } }}>Comentarios</Typography>
                  <Comment usuario={usuario.nombre_usuario} codigo={data.codigo_producto} getOpiniones={getOpiniones} />

                  </Box>
                  {showOpiniones()}
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Button variant="contained" color="primary" onClick={handlePrevPage} disabled={currentPage === 1}>
          Anterior
        </Button>
        <Typography variant="body1" sx={{ margin: '0 10px' }}>
          Página {currentPage} de {totalPages}
        </Typography>
        <Button variant="contained" color="primary" onClick={handleNextPage} disabled={indexOfLastOpinion >= opinion.length}>
          Siguiente
        </Button>
      </div>
              </Box>
          </Grid>
        </Grid>
      </Box>
    </MyGeneralBackground>
  )
}

export default Producto
