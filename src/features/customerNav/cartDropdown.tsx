import React, { useEffect } from 'react'
import { BsCartDash } from 'react-icons/bs'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { calcCartSubtotal } from '../slices/cartSlice'
import { calcUserCartSubtotal } from '../slices/currentUserSlice'

const CartDropdown: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const currentUser = useAppSelector((state) => state.currentUser.currentUser)
  const localCartItems = useAppSelector((state) => state.cartItems.cartItems)
  const cartItems = currentUser ? currentUser.cartItems : localCartItems
  const localSubtotal = useAppSelector((state) => state.cartItems.subtotal)
  const userCartSubTotal = useAppSelector((state) => state.currentUser.userCartSubTotal)
  const subtotal = currentUser ? userCartSubTotal : localSubtotal


  useEffect(() => {
    handleSubtotal()
  }, [cartItems])

  const handleSubtotal = () => {
    if(currentUser) {
      dispatch(calcUserCartSubtotal())
    } else {
      dispatch(calcCartSubtotal())
    }
  }


  return (
  <div className='cart-dropDown-container'>
      <div className='cart-dropDown-list'>
        {!cartItems.length?<div>
          <p>Your shopping cart is empty.</p>
          <div className='no_cartItem_Icon'><BsCartDash /></div>
 {
  !currentUser && 
  <p>
  If you have an account, <Link to='/account/signIn'>Sign In</Link> to see items added on earlier visits.
   </p>
 }
 </div>: cartItems.map((item) => (
          <div
            onClick={() => navigate(`/products/${item.product.id}`)}
            className='dropDownListItem'
            key={Math.random()}
          >
            <img
              src={item.product.imageUrls[0]}
              alt=''
            />
            <span className='dropDownListItemTitle'>{item.product.title}</span>
            <span className='dropDownListItemPrice'>
              ${item.product.price} x {item.qty}
            </span>
          </div>
        ))}
      </div>
      <div className='cart-dropDown-button'>
        <span>Subtotal: ${subtotal.toLocaleString()}</span>
        <button onClick={() => navigate('/shoppingcart')}>VIEW CART</button>
      </div>
    </div>
  )
}

export default CartDropdown
