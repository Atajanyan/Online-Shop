import React, { useEffect, useState } from 'react'
import './styles.css'
import { Link } from 'react-router-dom'

import CartDropdown from './cartDropdown'
import UserDropdown from './userDropdown'
import { useAppSelector } from '../../app/hooks'

import {TfiHeart} from 'react-icons/tfi'
import {CiUser} from 'react-icons/ci'
import {BsCart2} from 'react-icons/bs'


const CustomerNav: React.FC = () => {
  const currentUser = useAppSelector((state) => state.currentUser.currentUser)
  const favoriteItemsCount = useAppSelector((state) => state.favoriteItems.favoriteItems).length
  const cartItemsCount = useAppSelector((state) => state.cartItems.cartItems).length
 const isAdmin = useAppSelector(state => state.currentUser.isAdmin)
console.log(isAdmin, 'isAdmin');

  return (
    <nav className='customer-nav'>
      <ul>
        <li className='user-link'>
          <Link to={`/account${isAdmin ? '/admin' : currentUser ? '' : '/signIn'}`}>
            <CiUser size={28} />
          </Link>
          <UserDropdown />
        </li>
        <li className='text'>{currentUser ? 'My Account' : 'Sign In'}</li>
        <li className='favoritesCount'>
          <Link to={'/favorites'}>
            <TfiHeart size={23} />
          </Link>
        </li>
        <li className='text'>
          Favorites({currentUser ? currentUser.favoriteItems.length : favoriteItemsCount})
        </li>
        <li className='cart-link'>
          <Link to={'/shoppingcart'}>
            <BsCart2 size={25} />
          </Link>
          <CartDropdown />
        </li>
        <li className='text shoppingCartCount'>
          Shopping Cart({currentUser ? currentUser.cartItems.length : cartItemsCount})
        </li>
      </ul>
    </nav>
  )
}

export default CustomerNav
