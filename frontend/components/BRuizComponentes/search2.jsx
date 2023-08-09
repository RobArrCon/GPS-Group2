import React, { useState, useEffect, useRef, useCallback } from 'react'
import { TextField, MenuList, MenuItem } from '@mui/material'
import { useRouter } from 'next/router'

const SearchBar2 = (props) => {
  const router = useRouter()

  const options = props.options.map(option => ({
    value: option.codigo_producto,
    label: option.nombre_producto
  }))
  const listRef = useRef(null)
  const [inputValue, setInputValue] = useState('')
  const [isMatched, setMatched] = useState([])

  const findMatches = useCallback(() => {
    if (inputValue) {
      const matches = options.filter(
        (item) => item.label.toLowerCase().indexOf(inputValue.toLowerCase()) === 0
      )

      if (matches.length > 0) {
        setMatched(matches)
      } else {
        setMatched([{ label: 'No se encontraron resultados.' }])
      }
    } else {
      setMatched([])
    }
  }, [inputValue, options])

  useEffect(() => {
    findMatches()

    return () => {
      setMatched([])
    }
  }, [findMatches])

  const handleChange = (event) => {
    setInputValue(event.target.value)
  }

  const handleSelect = (match) => {
    router.push({
      pathname: '/Producto',
      state: { match }
    })
  }

  const handleFocus = () => {
    findMatches() // Llamar a findMatches en lugar de setFocused
  }

  const handleBlur = () => {
    setMatched([]) // Vaciar los resultados cuando se pierde el foco
  }

  return (
    <>
      <TextField
        fullWidth
        autoComplete="off"
        label="Buscar Producto"
        type="search"
        value={inputValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        sx={{ backgroundColor: 'white' }}
      />
      {isMatched.length > 0 && (
        <MenuList role="listbox" ref={listRef} sx={{ backgroundColor: 'white' }}>
          {isMatched.map((match, index) => (
            <MenuItem
              role="option"
              key={index}
              onClick={() => handleSelect(match.label)}
            >
              {match.label}
            </MenuItem>
          ))}
        </MenuList>
      )}
    </>
  )
}

export default SearchBar2
