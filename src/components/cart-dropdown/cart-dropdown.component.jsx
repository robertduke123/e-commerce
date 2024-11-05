import React, { useContext } from 'react'
import './cart-dropdown.styles.scss'
import Button from '../button/button.component'
import CartItem from '../cart-item/cart-item.component'
import { CartContext } from '../../contexts/cart.context'
import { useNavigate } from 'react-router-dom'

const CartDropdown = () => {
  const {cartItems, setIsCartOpen} = useContext(CartContext)
  const navigate = useNavigate()

  const goToCheckoutHandler = () => {
    if(cartItems.length > 0) {
      setIsCartOpen(false)
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