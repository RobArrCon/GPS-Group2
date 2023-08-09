import { useEffect, useState } from 'react'
import NoteAltIcon from '@mui/icons-material/NoteAlt'
import MyButton from '../components/LorellanaComponents/myButton'
import MyGeneralBackground from '../components/CTiznadoComponentes/GeneralBackground'
import { Grid, Button } from '@mui/material'
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

  const handleCategoryClick = (categoryName) => {
    console.log('Clicked on category:', categoryName)
    router.push({
      pathname: '/Productos',
      query: { nombreCategoria: categoryName }
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
<Button
          style={{
            color: 'white',
            backgroundColor: '#4a732b',
            width: '200px',
            height: '250px',
            borderRadius: '8px',
            fontSize: '16px',
            padding: '8px',
            fontFamily: 'Roboto',
            fontWeight: 'bold',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
            transition: 'background-color 0.3s',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            cursor: 'pointer'
          }}
          onClick={() => handleCategoryClick('Bebidas Vegetales')}
        >
          <img
            src={'bebidas.jpg'}
            alt="Bebidas Vegetales"
            style={{ width: '100%', height: '100%' }}
          />
          <span>Bebidas Vegetales</span>
        </Button>
        </Grid>
        <Grid item>
        <Button
          style={{
            color: 'white',
            backgroundColor: '#4a732b',
            width: '200px',
            height: '250px',
            borderRadius: '8px',
            fontSize: '16px',
            padding: '8px',
            fontFamily: 'Roboto',
            fontWeight: 'bold',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
            transition: 'background-color 0.3s',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            cursor: 'pointer'
          }}
          onClick={() => handleCategoryClick('Cereales')}
        >
          <img
            src={'cereales.jpg'}
            alt="Cereales"
            style={{ width: '100%', height: '90%' }}
          />
          <span>Cereales</span>
        </Button>
        </Grid>
        <Grid item>
        <Button
            style={{
              color: 'white',
              backgroundColor: '#4a732b',
              width: '200px',
              height: '250px',
              borderRadius: '8px',
              fontSize: '16px',
              padding: '8px',
              fontFamily: 'Roboto',
              fontWeight: 'bold',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
              transition: 'background-color 0.3s',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer'
            }}
            onClick={() => handleCategoryClick('Comidas congeladas')}
          >
            <img
              src={'congelados.jpg'}
              alt="Comidas congeladas"
              style={{ width: '100%', height: '100%' }}
            />
            <span>Comidas congeladas</span>
          </Button>
        </Grid>
        <Grid item>
        <Button
            style={{
              color: 'white',
              backgroundColor: '#4a732b',
              width: '200px',
              height: '250px',
              borderRadius: '8px',
              fontSize: '16px',
              padding: '8px',
              fontFamily: 'Roboto',
              fontWeight: 'bold',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
              transition: 'background-color 0.3s',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer'
            }}
            onClick={() => handleCategoryClick('Despensa')}
          >
            <img
              src={'despensa.jpg'}
              alt="Despensa"
              style={{ width: '100%', height: '100%' }}
            />
            <span>Despensa</span>
          </Button>
        </Grid>
        <Grid item>
        <Button
            style={{
              color: 'white',
              backgroundColor: '#4a732b',
              width: '200px',
              height: '250px',
              borderRadius: '8px',
              fontSize: '16px',
              padding: '8px',
              fontFamily: 'Roboto',
              fontWeight: 'bold',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
              transition: 'background-color 0.3s',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer'
            }}
            onClick={() => handleCategoryClick('Dulces y Snacks')}
          >
            <img
              src={'galletas.jpg'}
              alt="Dulces y Snacks"
              style={{ width: '100%', height: '100%' }}
            />
            <span>Dulces y Snacks</span>
          </Button>
        </Grid>
        <Grid item>
        <Button
            style={{
              color: 'white',
              backgroundColor: '#4a732b',
              width: '200px',
              height: '250px',
              borderRadius: '8px',
              fontSize: '16px',
              padding: '8px',
              fontFamily: 'Roboto',
              fontWeight: 'bold',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
              transition: 'background-color 0.3s',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer'
            }}
            onClick={() => handleCategoryClick('Helados')}
          >
            <img
              src={'helado.jpg'}
              alt="Helados"
              style={{ width: '100%', height: '89%' }}
            />
            <span>Helados</span>
          </Button>
        </Grid>
        <Grid item>
        <Button
            style={{
              color: 'white',
              backgroundColor: '#4a732b',
              width: '200px',
              height: '250px',
              borderRadius: '8px',
              fontSize: '16px',
              padding: '8px',
              fontFamily: 'Roboto',
              fontWeight: 'bold',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
              transition: 'background-color 0.3s',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer'
            }}
            onClick={() => handleCategoryClick('Quesos y fiambres')}
          >
            <img
              src={'queso.jpg'}
              alt="Queso y Embutido"
              style={{ width: '100%', height: '89%' }}
            />
            <span>Queso & Embutido</span>
          </Button>
        </Grid>
      </Grid>
    </MyGeneralBackground>

  )
}

export default Home
