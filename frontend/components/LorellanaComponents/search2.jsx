import React, { useState, useRef } from 'react'
import { TextField, MenuList, MenuItem } from '@mui/material'

const SearchBar2 = (props) => {
  const options = props.options.map((option) => ({
    value: option.codigo_producto,
    label: option.nombre_producto
  }))
  const listRef = useRef(null)
  const [inputValue, setInputValue] = useState('')
  const [isMatched, setMatched] = useState([])

  const handleChange = (event) => {
    const newInputValue = event.target.value
    setInputValue(newInputValue)

    if (newInputValue) {
      const lowerCaseInput = newInputValue.toLowerCase()
      const matches = options.filter((item) =>
        item.label.toLowerCase().indexOf(lowerCaseInput) === 0
      )
      setMatched(matches.length > 0 ? matches : [{ label: 'No se encontraron resultados.' }])
    } else {
      setMatched([])
    }
  }

  const handleFocus = () => {
    if (inputValue) {
      const lowerCaseInput = inputValue.toLowerCase()
      const matches = options.filter((item) =>
        item.label.toLowerCase().indexOf(lowerCaseInput) === 0
      )
      setMatched(matches.length > 0 ? matches : [{ label: 'No se encontraron resultados.' }])
    }
  }

  const handleBlur = () => {
    setTimeout(() => setMatched([]), 200)
  }

  return (
    <>
      <TextField
        fullWidth
        label="Buscar Producto"
        type="search"
        value={inputValue}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        sx={{ backgroundColor: 'white' }}
      />
      <div style={{ position: 'relative' }}>
        {isMatched.length > 0 && (
          <MenuList role="listbox" ref={listRef} sx={{ backgroundColor: 'white', position: 'absolute', top: '100%', left: 0, width: '100%' }}>
            {isMatched.map((match, index) => (
              <MenuItem
                role="option"
                key={match.value}
                onClick={() => props.onSearchResultClick(match.label)}
              >
                {match.label}
              </MenuItem>
            ))}
          </MenuList>
        )}
      </div>
    </>
  )
}

export default SearchBar2
