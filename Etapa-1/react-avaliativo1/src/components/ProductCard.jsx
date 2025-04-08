import React from "react"

const ProductCard = ({product}) => {
  return (
    <>
      {product.name},
      {product.price}
      <button>Adicionar ao carrinho</button>
    </>
  )
}

export default ProductCard
