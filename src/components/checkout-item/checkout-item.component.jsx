import React from 'react'
import './checkout-item.styles.scss'
import { useDispatch, useSelector } from 'react-redux'
import { addItemToCart, clearItemFromCart, removeItemFromCart } from '../../store/cart/cart.action'
import { selectCartItems } from '../../store/cart/cart.selector'

const CheckoutItem = ({cartItem}) => {
  const {name, imageUrl, quantity, price} = cartItem
    const dispatch = useDispatch()
    const cartItems = useSelector(selectCartItems)
  
  const removeClickHandler = () => dispatch(removeItemFromCart(cartItems, cartItem))
  const addClickHandler = () => dispatch(addItemToCart(cartItems, cartItem))
  const clearClickHandler = () => dispatch(clearItemFromCart(cartItems, cartItem))


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
