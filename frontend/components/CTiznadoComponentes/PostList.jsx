import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
  Card,
  CardContent,
  Typography,
  Box,
  TextField
} from '@mui/material'
import { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

const PostList = ({ publicacion, comentarios, onClose }) => {
  const [crearC, setCrearC] = useState(false)
  const [comentarioText, setComentarioText] = useState('')

  const [values] = useState({
    nombreUsuario: '',
    codigoPost: '',
    detalleComentario: ''
  })

  const getComentariosPost = () => {
    const arrayComentarios = []
    comentarios.forEach(comment => {
      if (comment.codigo_post === publicacion.codigo_post) {
        arrayComentarios.push(comment)
      }
    })
    return arrayComentarios
  }

  const abrirCrear = () => {
    setCrearC(true)
  }

  const cerrarCrearComentarioDialog = () => {
    setCrearC(false)
  }

  const enviarComentario = async () => {
    values.detalleComentario = comentarioText
    values.codigoPost = publicacion.codigo_post
    values.nombreUsuario = localStorage.getItem('usuario')
    try {
      const response = await axios.post(`${process.env.API_URL}/comentario`, values)
      if (response.status === 200) {
        cerrarCrearComentarioDialog()
        onClose()
        Swal.fire({ title: 'Lista creada correctamente' }).then(() => { window.location.reload() })
      } else {
        console.log('fallo')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const crearComentario = () => {
    return (
      <Dialog open={crearC} onClose={cerrarCrearComentarioDialog} fullWidth maxWidth="sm">
        <DialogTitle>Crear Comentario</DialogTitle>
        <DialogContent>
        <TextField
            autoFocus
            margin="dense"
            id="comentario"
            label="Detalle comentario"
            type="text"
            fullWidth
            variant="standard"
            value={comentarioText}
            onChange={(e) => setComentarioText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={cerrarCrearComentarioDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={enviarComentario} color="primary">
            Enviar Comentario
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  const showComentarios = () => {
    return getComentariosPost().map(comentario => {
      const dateParts = comentario.fecha_comentario.split('T')[0].split('-')
      const formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`
      return (
          <Card key={comentario.codigo_comentario} sx={{ width: '90%', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)', borderRadius: '12px', margin: '30px' }}>
            <CardContent sx={{ padding: '16px' }}>
              <Typography variant="body1" sx={{ marginBottom: '8px' }}>{comentario.nombre_usuario} {formattedDate}</Typography>
              {comentario.detalle_comentario}
            </CardContent>
          </Card>
      )
    })
  }

  return (
    <Dialog open={!!publicacion} onClose={onClose} maxWidth="md" fullWidth>
      <Box maxHeight={300} overflow="auto">
      <DialogTitle>{publicacion ? publicacion.titulo_post : ''}</DialogTitle>
      </Box>
      <Divider/>
      <DialogContent>
        {publicacion && (
          <div>
            <Box maxHeight={300} overflow="auto" marginBottom={4}>
              {publicacion.detalle_post}
            </Box>
            <Divider/>
            <Box maxHeight={300} overflow="auto">
              {showComentarios()}
            </Box>
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cerrar
        </Button>
        <Button onClick={abrirCrear} color="primary">
          Crear Comentario
        </Button>
      </DialogActions>
      {crearC && crearComentario()}
    </Dialog>
  )
}

export default PostList
