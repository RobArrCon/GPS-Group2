/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Card, CardMedia, TextField, MenuList, MenuItem, Typography, CardActionArea, CardContent, Grid } from '@mui/material'
const DisplayBox = (props) => {
  const keys = ['nombre_producto', 'nombre_categoria', 'descripcion_producto']
  return (<Grid
            container
            spacing={4}
            sx={props.style}
            >
        {props.items.filter((items) => {
          return keys.some(vars => items[vars].toLowerCase().includes(props.filterTerm.toLowerCase()))
        }).map(producto => {
          // eslint-disable-next-line react/jsx-key
          return (<Grid
                    item
                    >
                    <Card
                        sx={{
                          maxWidth: 240,
                          minWidth: 200
                        }}
                        >
                      <CardActionArea>
                        <CardMedia
                          component='img'
                          height={140}
                          src={'./vegateca.png'}
                          alt='vegateca logo'
                        />
                        <CardContent>
                          <Typography
                            variant='h5'
                          >
                            {producto.nombre_producto}
                          </Typography>
                          <Typography
                            variant='body2'
                          >
                            {producto.descripcion_producto}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
          )
        })
        }
    </Grid>)
}

export default DisplayBox
