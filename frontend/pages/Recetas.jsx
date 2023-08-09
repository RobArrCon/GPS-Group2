import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import BackGround from '../components/CTiznadoComponentes/GeneralBackground'
import Swal from 'sweetalert2'
import Grid from '@mui/material/Grid'
import axios from 'axios'
import SearchIcon from '@mui/icons-material/Search'

export default function Receta () {
  const [isAdmin, setIsAdmin] = useState(false)

  const checkAdminStatus = () => {
    setIsAdmin(true)
  }

  const [searchQuery, setSearchQuery] = useState('')

  const [filteredData, setFilteredData] = useState([])

  const handleSearch = (query) => {
    setSearchQuery(query)
    const filtered = data.filter(item =>
      item.nombre_receta.toLowerCase().includes(query.toLowerCase())
    )
    setFilteredData(filtered)
  }

  const onSearch = (e) => {
    handleSearch(e.target.value)
    console.log(e.target.name, e.target.value)
  }

  const [open2, setOpen2] = React.useState(false)
  const handleOpen2 = () => setOpen2(true)
  const handleClose2 = () => {
    setAgregar(() => ({ ...agregar, nombreReceta: '', preparacion: '' }))
    setError('')
    setOpen2(false)
  }

  const [error, setError] = useState()
  const [agregar, setAgregar] = useState({
    nombreReceta: '',
    preparacion: ''
  })

  const onChange = (e) => {
    setAgregar({ ...agregar, [e.target.name]: e.target.value })
    console.log(e.target.name, e.target.value)
  }

  const agregarReceta = async () => {
    if (agregar.nombreReceta.trim() === '' || agregar.preparacion.trim() === '') {
      setError('Ingrese campos por favor')
      return
    }
    console.log(agregar)
    try {
      const responsePOST = await axios.post(`${process.env.API_URL}/receta`, agregar)
      console.log(responsePOST.data)
      Swal.fire({
        icon: 'success',
        title: 'Receta Agregada Exitosamente',
        confirmButtonText: 'OK'
      })
      handleClose2()
      getReceta()
    } catch (error) {
      console.log(error)
    }
  }

  const [data, setData] = useState([])

  const getReceta = async () => {
    try {
      const responseGET = await axios.get(`${process.env.API_URL}/recetas`)
      setData(responseGET.data)
    } catch (error) {
      console.error(error)
    }
  }
  const [abrirRecetas, setAbrirRecetas] = useState({})

  const OpenCloseModal = (IDReceta) => {
    setAbrirRecetas((OpenClose) => ({ ...OpenClose, [IDReceta]: !OpenClose[IDReceta] })
    )
  }

  const mostrarReceta = (dataToShow) => {
    return dataToShow.map((item, index) => {
      const isModalOpen = abrirRecetas[item.codigo_receta] || false
      return (
        <Card key={item.codigo_receta} sx={{ width: 235 }} >
          <CardContent>
            <div align='center'>
              {item.nombre_receta}
            </div>
          </CardContent>
          <CardActions>
            <Box display="flex" justifyContent="center" width="100%">
              <div>
                <div align='center'>
                  <Button variant='contained' onClick={() => OpenCloseModal(item.codigo_receta)}>VER</Button>
                </div>
                <Modal
                  open={isModalOpen}
                  onClose={() => OpenCloseModal(item.codigo_receta)}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style.box}>
                    <div align='right'>
                      <Button color="error" onClick={() => OpenCloseModal(item.codigo_receta)} variant="contained">X</Button>
                    </div>
                    <div align='center'>
                      <Typography variant="h6" component="h2">
                        {item.nombre_receta}
                      </Typography><br></br>
                    </div>
                    <TextField
                      sx={style.text}
                      defaultValue={item.preparacion}
                      InputProps={{
                        readOnly: true
                      }}
                      multiline
                      minRows={10}
                      maxRows={20}
                    />
                  </Box>
                </Modal>
                <br></br>
                {isAdmin && (
                  <Stack direction="row" spacing={2}>
                    <Button onClick={() => {
                      setModificar({
                        codigoReceta: item.codigo_receta,
                        nombreReceta: item.nombre_receta,
                        preparacion: item.preparacion
                      })
                      OpenCloseModificar(item.codigo_receta)
                    }} color='secondary' variant='contained'>
                      MODIFICAR
                    </Button>
                    <Modal
                      open={openModificar[item.codigo_receta] || false}
                      onClose={() => {
                        OpenCloseModificar(item.codigo_receta)
                      }}
                      aria-labelledby="modal-modal-title"
                    >
                      <Box sx={style.box}>
                        <div align='right'>
                          <Button color="error" onClick={() => OpenCloseModificar(item.codigo_receta)} variant="contained">X</Button>
                        </div>
                        <div align='center'>
                          <Typography id="modal-modal-title" variant="h6" component="h2">
                            MODIFICAR
                          </Typography><br />
                        </div>
                        <TextField
                          sx={style.text}
                          required
                          id="nombreReceta"
                          label="Nombre receta"
                          name="nombreReceta"
                          value={modificar.nombreReceta}
                          onChange={(e) =>
                            setModificar({
                              ...modificar,
                              nombreReceta: e.target.value
                            })
                          }
                          error={modificar.nombreReceta.trim() === ''}
                          helperText={modificar.nombreReceta.trim() === '' ? 'Campo requerido' : ''}
                        />
                        <br /><br />
                        <TextField
                          sx={style.text}
                          required
                          id="preparacion"
                          label="Preparacion"
                          name="preparacion"
                          value={modificar.preparacion}
                          onChange={(e) =>
                            setModificar({
                              ...modificar,
                              preparacion: e.target.value
                            })
                          }
                          error={modificar.preparacion.trim() === ''}
                          helperText={modificar.preparacion.trim() === '' ? 'Campo requerido' : ''}
                          multiline
                          minRows={10}
                          maxRows={15}
                          variant="filled"
                        />
                        <br /><br />
                        <div align='center'>
                          {error && <Typography variant='body2' color='error'>
                            {error}</Typography>}
                        </div><br />
                        <div align='center'>
                          <Button color="success" onClick={() => {
                            modificarReceta(item.codigo_receta)
                          }} variant="contained">Guardar</Button>
                        </div>
                      </Box>
                    </Modal>
                    <Button onClick={() => { ConfirmDelete(item.nombre_receta) }} color="error" variant='contained' >ELIMINAR</Button>
                  </Stack>
                )}
              </div>
            </Box>
          </CardActions>
        </Card>
      )
    })
  }

  const ConfirmDelete = (eliminada) => {
    Swal.fire({
      title: 'Desea eliminar esta receta?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarReceta(eliminada)
        Swal.fire(
          'ELIMINADO!',
          'RECETA ELIMINADA EXITOSAMENTE',
          'success'
        )
      }
    })
  }

  const eliminarReceta = async (eliminada) => {
    try {
      const responseDEL = await axios.delete(`${process.env.API_URL}/receta/${eliminada}`)
      console.log(responseDEL.data)
      getReceta()
    } catch (error) {
      console.log(error)
    }
  }

  const [openModificar, setOpenModificar] = useState({})

  const OpenCloseModificar = (IDReceta) => {
    setOpenModificar((OpenClosem) => ({ ...OpenClosem, [IDReceta]: !OpenClosem[IDReceta] }))
    setError('')
  }

  const [modificar, setModificar] = useState({
    codigoReceta: null,
    nombreReceta: '',
    preparacion: ''
  })

  const modificarReceta = async (cerrar) => {
    if (modificar.nombreReceta.trim() === '' || modificar.preparacion.trim() === '') {
      setError('Ingrese campos por favor')
      return
    }
    try {
      OpenCloseModificar(cerrar)
      const responsePUT = await axios.put(`${process.env.API_URL}/receta/${modificar.codigoReceta}`, modificar)
      console.log(responsePUT.data)
      Swal.fire({
        icon: 'success',
        title: 'Receta Modificada Exitosamente',
        confirmButtonText: 'OK'
      })
      getReceta()
    } catch (error) {
      console.log(error)
    }
  }

  const style = {
    box: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      height: 700,
      width: 700,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4
    },
    text: {
      width: '100%',
      align: 'center'
    }

  }

  useEffect(() => {
    checkAdminStatus()
    getReceta()
  }, [])

  return (
    <BackGround>
      <div>
        <Typography align='center' id="titulo-pag-receta" variant="h4">
          RECETAS
        </Typography>
        {isAdmin && (
          <div align='right'>
            <Button align='right' onClick={handleOpen2} color="success" variant="contained">Agregar</Button><br /><br />
          </div>
        )}
      </div>
      <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
      >
        <Box component="form" sx={style.box} >
          <div align='right'>
            <Button color="error" onClick={handleClose2} variant="contained">X</Button>
          </div>
          <div align='center'>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              AGREGAR
            </Typography>
          </div>
          <TextField sx={style.text} required id="nombreReceta" label="Nombre receta" name="nombreReceta" type="text" autoComplete="nombreReceta" onChange={onChange} variant="standard" /><br /><br />
          <TextField
            sx={style.text}
            required
            id="preparacion"
            label="Preparacion"
            name="preparacion"
            type="text"
            onChange={onChange}
            multiline
            minRows={10}
            maxRows={15}
            variant="filled"
          /><br /><br />
          <div align='center'>
            {error && <Typography variant='body2' color='error'>
              {error}</Typography>}
          </div><br />
          <div align='center'>
            <Button color="success" onClick={() => { agregarReceta() }} variant="contained">Agregar</Button>
          </div>
        </Box>
      </Modal>
      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <SearchIcon style={{ fontSize: 50 }} />
        <TextField
          autoComplete="off"
          label="Que receta esta buscando"
          variant="filled"
          onChange={onSearch}
          value={searchQuery}
          fullWidth
        />
      </Box><br></br>
      <Grid container spacing={1}>
        {searchQuery === ''
          ? mostrarReceta(data)
          : filteredData.length > 0
            ? mostrarReceta(filteredData)
            : (
              <Typography align="center" variant="body1">
                No results found.
              </Typography>
            )
        }
      </Grid>
    </BackGround >
  )
}
