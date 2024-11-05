import React, { useContext } from 'react'
import Button from '../button/button.component'
import './product-card.style.scss'
import { CartContext } from '../../contexts/cart.context'

function ProductCard({product}) {
    const {name, price, imageUrl} = product
    const {addItemToCart} = useContext(CartContext)

    const addProductToCart = () => addItemToCart(product)
    
  return (
    <div className='product-card-container'>
      <img src={imageUrl} alt={`${name}`}/>
      <div className='footer'>
        <span className='name'>{name}</span>
        <span className='proce'>{price}</span>
      </div>
      <Button buttonType='inverted' onClick={addProductToCart}>Add to Cart</Button>
    </div>
  )
}

export default ProductCard
