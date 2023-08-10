import * as React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import MyBackground from '../components/CTiznadoComponentes/GeneralBackground'
import { Stack, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Card, CardActions, CardContent, Divider } from '@mui/material'
import Swal from 'sweetalert2'
import PostList from '../components/CTiznadoComponentes/PostList'

export default function PostsUsuario () {
  const [posts, setPosts] = useState([])
  const [comentarios, setComentarios] = useState([])
  const [crearP, setCrearP] = useState(false)
  const [publicacionTitulo, setpublicacionTitulo] = useState('')
  const [publicacionDetalle, setpublicacionDetalle] = useState('')
  const [selectedRow, setSelectedRow] = useState(null)

  const [values] = useState({
    tituloPost: '',
    detallePost: '',
    nombreUsuario: ''
  })

  const getPosts = async () => {
    try {
      const response = await axios.get(`${process.env.API_URL}/postComments`)
      setPosts(response.data)
      const response2 = await axios.get(`${process.env.API_URL}/comentario/post`)
      setComentarios(response2.data)
    } catch (error) {
      console.log(error)
    }
  }

  const abrirCrear = () => {
    setCrearP(true)
  }

  const cerrarCrear = () => {
    setCrearP(false)
  }

  const enviarPublicacion = async () => {
    values.tituloPost = publicacionTitulo
    values.detallePost = publicacionDetalle
    values.nombreUsuario = localStorage.getItem('usuario')
    if (!(publicacionTitulo === '' || publicacionDetalle === '')) {
      try {
        const response = await axios.post(`${process.env.API_URL}/post`, values)
        if (response.status === 200) {
          cerrarCrear()
          Swal.fire({ title: 'Publicacion creada correctamente' }).then(() => { window.location.reload() })
        } else {
          console.log('fallo')
        }
      } catch (error) {
        console.error('Error:', error)
      }
    }
  }

  const crearPublicacion = () => {
    return (
      <Dialog open={crearP} onClose={cerrarCrear} fullWidth maxWidth="sm">
        <DialogTitle>Crear Publicación</DialogTitle>
        <DialogContent>
        <TextField
            autoFocus
            margin="dense"
            id="titulo"
            label="Titulo Publicación"
            type="text"
            fullWidth
            variant="standard"
            value={publicacionTitulo}
            onChange={(e) => setpublicacionTitulo(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="detalle"
            label="Detalle Publicación"
            type="text"
            fullWidth
            variant="standard"
            value={publicacionDetalle}
            onChange={(e) => setpublicacionDetalle(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={cerrarCrear} color="primary">
            Cancelar
          </Button>
          <Button onClick={enviarPublicacion} color="primary">
            Crear Publicación
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  const showPublicaciones = () => {
    return posts.map(posts => {
      return (
        <div key={posts.codigo_post} style={{ marginBottom: '10px' }} >
          <Card sx={{ maxWidth: '100%', borderRadius: '12px' }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" style={{ marginBottom: '15px' }}>
                        {posts.titulo_post}
                    </Typography>
                    <Divider style={{ marginBottom: '15px' }}/>
                    <Typography variant="body2" color="text.secondary" >
                        {posts.detalle_post}
                    </Typography>
                </CardContent>
            <CardActions>
                <Button size="small" color="primary" onClick={() => setSelectedRow(posts)}>
                    Comentarios ({posts.cantidad_comentarios})
                </Button>
            </CardActions>
          </Card>
        </div>
      )
    })
  }

  useEffect(() => {
    getPosts()
  }, [])

  return (
    <MyBackground>
      <Stack sx={{ justifyContent: 'center', alignItems: 'center', marginBottom: 5 }} >
        <Typography variant='h2' sx={{ marginBottom: 5 }}>Muro de Publicaciones</Typography>
        <Button onClick={abrirCrear}>
          Crear Publicación
        </Button>
      </Stack>
      {crearP && crearPublicacion()}
      {showPublicaciones()}
      <PostList publicacion={selectedRow} comentarios={comentarios} onClose={() => setSelectedRow(null)}/>
    </MyBackground>
  )
}
