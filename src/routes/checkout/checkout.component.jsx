import React from 'react'
import './checkout.styles.scss'
import CheckoutItem from '../../components/checkout-item/checkout-item.component'
import { useSelector } from 'react-redux'
import { selectCartItems, selectCartPrice } from '../../store/cart/cart.selector'

const Checkout = () => {
    const cartItems = useSelector(selectCartItems)
    const cartPrice = useSelector(selectCartPrice)
  return (
    <div className='checkout-container'>
      <div className='checkout-header'>
        <div className='header-container'>
           <span>Product</span> 
        </div>
        <div className='header-container'>
           <span>Description</span> 
        </div>
        <div className='header-container'>
           <span>Quantity</span> 
        </div>
        <div className='header-container'>
           <span>Price</span> 
        </div>
        <div className='header-container'>
           <span>Remove</span> 
        </div>
      </div>
        {cartItems?.map((cartItem) => <CheckoutItem key={cartItem.id} cartItem={cartItem}/>)}
      <div className='total'>{`Total: $${cartPrice}`}</div>
    </div>
  )
}

export default Checkout
