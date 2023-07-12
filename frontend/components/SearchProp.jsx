/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { TextField, MenuList, MenuItem, Typography } from '@mui/material'

const SearchBarProp = (props) => {
  const options = props.items
  const listRef = useRef(null)
  const [inputValue, setInputValue] = useState('')
  const [isMatched, setMatched] = useState([])
  const [count, setCount] = useState(0)
  const [isOpen, setOpen] = useState(false)
  const [isFocused, setFocused] = useState(false)

  const findMatches = useCallback(() => {
    if (inputValue && isFocused) {
      const matches = options.filter(
        (item) => item.toLowerCase().indexOf(inputValue.toLowerCase()) === 0
      )
      setMatched(matches)
    } else {
      setMatched([])
    }
  }, [inputValue, options, isFocused])

  useEffect(() => {
    findMatches()

    return () => {
      setMatched([])
      setOpen(false)
      setCount(0)
    }
  }, [findMatches])

  const handleChange = (event) => {
    setInputValue(event.target.value)
    props.setFilterTerm(event.target.value)
  }

  const handleSelect = (match) => {
    setInputValue(match)
    setMatched([])
  }

  const handleFocus = () => {
    setFocused(true)
  }

  const handleBlur = () => {
    setFocused(false)
  }

  return (
    <>
      <TextField
        fullWidth
        autoComplete="off"
        label= {props.label}
        type="search"
        value={inputValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        sx={{ backgroundColor: 'white' }}
      />
      {inputValue !== '' && isMatched.length > 0
        ? (
        <MenuList role="listbox" ref={listRef} sx={{ backgroundColor: 'white' }}>
          {isMatched.map((match) => {
            const suggest = (
              <Typography component="span" fontWeight="bold">
                {match.substring(0, inputValue.length)}
              </Typography>
            )
            return (
              <MenuItem role="option" key={match} onClick={() => handleSelect(match)}>
                {suggest}
                {match.substring(inputValue.length)}
              </MenuItem>
            )
          })}
        </MenuList>
          )
        : inputValue !== ''
          ? (
        <MenuList sx={{ backgroundColor: 'white' }}>
          <MenuItem>No se encontraron resultados.</MenuItem>
        </MenuList>
            )
          : null}
    </>
  )
}

export default SearchBarProp
