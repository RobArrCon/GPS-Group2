import { useEffect, useState } from 'react'
import NoteAltIcon from '@mui/icons-material/NoteAlt'
import MyButton from '../components/LorellanaComponents/myButton'
import MyGeneralBackground from '../components/LorellanaComponents/GeneralBackground'
import { Grid } from '@mui/material'
import SearchBar2 from '../components/LorellanaComponents/search2'
import axios from 'axios'
import MyAvatar3 from '../components/LorellanaComponents/avatar3'
import { useRouter } from 'next/router'

const Home = () => {
  const router = useRouter()
  const [usuario, setUsuario] = useState([])
  const [productos, setProductos] = useState([])

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

  const getProductos = async () => {
    try {
      const response = await axios.get(`${process.env.API_URL}/productos`)
      setProductos(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const handleSearchResultClick = (productName) => {
    console.log('Clicked on product:', productName)
    router.push({
      pathname: '/Producto',
      query: { nombreProducto: productName }
    })
  }

  useEffect(() => {
    const usuario = localStorage.getItem('usuario')
    console.log('Fetching usuario:', usuario)
    getUsuario(usuario)
    getProductos()
  }, [])

  console.log('Rendering component with productos:', productos)

  return (
      <MyGeneralBackground>
      <Grid
        style={{ textAlign: 'center' }}
      >
        <MyAvatar3 nombre={usuario.nombre_usuario}></MyAvatar3>
        <h1>CATEGORIAS</h1>
        <SearchBar2 options={productos} onSearchResultClick={handleSearchResultClick} />
      </Grid>
      <Grid
        style={{ alignItems: 'center', justifyContent: 'center' }}
        marginTop={4}
        width={'auto'}
        container
        columns={{ xs: 3, sm: 4 }}
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
      >
        <Grid item style={{ alignItems: 'center' }}
>
          <MyButton
            margin={2}
            text="Bebidas Vegetales"
            imageSource={'Bebidas.jpg'}
            style={{
              font: 'impact',
              color: 'white',
              textShadow: '1px 1px 2px black'
            }}
            underlinestartIcon={<NoteAltIcon />}
            variant="contained"
            color="primary"
          ></MyButton>
        </Grid>
        <Grid item>
          <MyButton
            margin={2}
            text="Cereales"
            style={{ border: '1px solid white' }}
            imageSource={'cereales.jpg'}
            startIcon={<NoteAltIcon />}
            variant="contained"
            color="primary"
          ></MyButton>
        </Grid>
        <Grid item>
          <MyButton
            text="Comidas congeladas"
            imageSource={'congelados.jpg'}
            startIcon={<NoteAltIcon />}
            variant="contained"
            color="primary"
          ></MyButton>
        </Grid>
        <Grid item>
          <MyButton
            text="Despensa"
            imageSource={'despensa.jpg'}
            startIcon={<NoteAltIcon />}
            variant="contained"
            color="primary"
          ></MyButton>
        </Grid>
        <Grid item>
          <MyButton
            text="Dulces & Snacks"
            imageSource={'galletas.jpg'}
            startIcon={<NoteAltIcon />}
            variant="contained"
            color="primary"
          ></MyButton>
        </Grid>
        <Grid item>
          <MyButton
            text="Helados"
            imageSource={'helado.jpg'}
            startIcon={<NoteAltIcon />}
            variant="contained"
            color="primary"
          ></MyButton>
        </Grid>
        <Grid item>
          <MyButton
            text="Queso & Embutido"
            imageSource={'queso.jpg'}
            startIcon={<NoteAltIcon />}
            variant="contained"
            color="primary"
          ></MyButton>
        </Grid>
      </Grid>
    </MyGeneralBackground>

  )
}

export default Home
