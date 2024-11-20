import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Link, Outlet } from 'react-router-dom'
import { ReactComponent as CrwnLogo} from '../../assets/crown.svg'
import './navigation.styles.scss'
import { signOutUser } from '../../utils/firebase/firebase.utils'
import CartIcon from '../../components/cart-icon/cart-icon.component'
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component'
import { selectCurrentUser} from '../../store/user/user.selector'
import { selectIsCartOpen } from '../../store/cart/cart.selector'


const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser)
  const isCartOpen = useSelector(selectIsCartOpen)
  
  const hadleSignOut = async() => {
    await signOutUser()    
  }

  return (
    <Fragment>
      <div className='navigation'>
			<Link className='logo-container' to='/'>
                <CrwnLogo/>
            </Link>
            <div className='nav-links-container'>
                <Link className='nav-link' to='/shop'>
                SHOP
                </Link>
                {
                  currentUser ? (
                    <span className='nav-link' onClick={hadleSignOut}>SIGN OUT</span>
                  ) : (
                    <Link className='nav-link' to='/auth'>
                SIGN IN
                </Link>
                  )
                }
                <CartIcon/>
            </div>
            {isCartOpen && <CartDropdown/>}
		</div>
        <Outlet />
    </Fragment>
  )
}

export default Navigation
