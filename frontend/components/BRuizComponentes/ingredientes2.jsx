import React from 'react'

const IngredientCard = ({ ingrediente }) => {
  return (
    <div className="ingredient-card">
      <h3>{ingrediente.nombre}</h3>
      <p>Código: {ingrediente.codigo_ingrediente}</p>
      {/* Agrega más información sobre el ingrediente si es necesario */}
    </div>
  )
}

export default IngredientCard
