import React from 'react'
import { BsCartDash } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'

const NoCartItems = () => {
  const currentUser = useAppSelector(state => state.currentUser.currentUser)
  const navigate = useNavigate()
  return (
    <div className='empty-cart-container'>
      <h1>your shopping cart is empty</h1>
      <div className='cart-icon'>
        <BsCartDash />
      </div>
     {
      !currentUser && <>
       <button
        className='cart-sign-in-btn'
        onClick={() => navigate('/account/signIn')}
      >
        Sign In
      </button>
      <p className='sign-in-text'>Have an account? Sign in to view cart items from your account.</p>
      </> 
     }
    </div>
  )
}

export default NoCartItems
