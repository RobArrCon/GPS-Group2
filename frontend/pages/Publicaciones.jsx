import * as React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import MyBackground from '../components/CTiznadoComponentes/GeneralBackground'
import { Stack, Typography, Button, Link, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import PostList from '../components/CTiznadoComponentes/PostList'
import Swal from 'sweetalert2'

export default function PostsUsuario () {
  const [posts, setPosts] = useState([])
  const [comentarios, setComentarios] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [selectedRow, setSelectedRow] = useState(null)
  const [crearP, setCrearP] = useState(false)
  const [publicacionTitulo, setpublicacionTitulo] = useState('')
  const [publicacionDetalle, setpublicacionDetalle] = useState('')

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

  const columns = [
    { id: 'fecha_publicacion', label: 'Fecha', minWidth: 60 },
    { id: 'titulo_post', label: 'Titulo', minWidth: 100 },
    { id: 'cantidad_comentarios', label: 'Comentarios', minWidth: 100, align: 'center' }
  ]

  const handleChangePage = (newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const handleRowClick = (row) => {
    setSelectedRow(row) // Guardar la fila seleccionada en el estado
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
    console.log(values)
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
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
          {posts
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.codigo_post} onClick={() => handleRowClick(row)}>
                  {columns.map((column) => {
                    let value
                    if (column.id === 'fecha_publicacion') {
                      const dateParts = row.fecha_publicacion.split('T')[0].split('-')
                      const formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`
                      value = formattedDate
                    } else {
                      value = row[column.id]
                    }
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.id === 'titulo_post'
                          ? (
                          <Link component="button"
                          >
                            {value}
                          </Link>
                            )
                          : (
                              value
                            )}
                      </TableCell>
                    )
                  })}
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={posts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Filas por página"
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
      />
      </Paper>
      {crearP && crearPublicacion()}
      <PostList publicacion={selectedRow} comentarios={comentarios} onClose={() => setSelectedRow(null)} />
    </MyBackground>
  )
}
