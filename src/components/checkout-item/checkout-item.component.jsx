import React, { useContext } from 'react'
import './checkout-item.styles.scss'
import { CartContext } from '../../contexts/cart.context'

const CheckoutItem = ({cartItem}) => {
  const {name, imageUrl, quantity, price} = cartItem
  const {removeItemFromCart, addItemToCart, clearItemFromCart} = useContext(CartContext)
  
  const removeClickHandler = () => removeItemFromCart(cartItem)
  const addClickHandler = () => addItemToCart(cartItem)
  const clearClickHandler = () => clearItemFromCart(cartItem)


    return(
    <div className='checkout-item-container'>
        <div className='image-container'>
            <img src={imageUrl} alt={'${name}'}/> 
        </div>
            <span className='name'>{name}</span>
                <span className='quantity'>
                <div className="arrow" onClick={removeClickHandler}>&#10094;</div>
                <span className="value">{quantity}</span>
                <div className="arrow" onClick={addClickHandler}>&#10095;</div>
            </span>   
            <span className='price'>{price}</span>
            <div className='remove-button' onClick={clearClickHandler}>&#10005;</div>
    </div>)
}

export default CheckoutItem
