import React from 'react'
import './cart-dropdown.styles.scss'
import Button from '../button/button.component'
import CartItem from '../cart-item/cart-item.component'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectCartItems } from '../../store/cart/cart.selector'
import { setIsCartOpen } from '../../store/cart/cart.action'

const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const goToCheckoutHandler = () => {
    if(cartItems.length > 0) {
      dispatch(setIsCartOpen(false))
      navigate('/checkout')
    }
  }
  
  return (
    <div className='cart-dropdown-container'>
      <div className='cart-items'>
        {cartItems?.map((item) => <CartItem key={item.id} cartItem={item}/>)}
      </div>
        <Button onClick={goToCheckoutHandler}>CHECKOUT</Button>      
    </div>
  )
}

export default CartDropdown
