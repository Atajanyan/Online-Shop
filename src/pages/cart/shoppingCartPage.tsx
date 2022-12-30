import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import NoCartItems from './noCartItems'
import './shoppingCart.css'
import './shoppingCartMedia.css'


import {
  addQtyToCartItem,
  calcCartSubtotal,
  removeCartItem,
  removeQtyFromCartItem,
} from '../../features/slices/cartSlice'
import { IProduct } from '../productPage/productPage'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineDelete } from 'react-icons/ai'
import { calcUserCartSubtotal, updateUserCartItems } from '../../features/slices/currentUserSlice'
import CartSummary from './cartSummary'

const ShoppingCartPage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const currentUser = useAppSelector((state) => state.currentUser.currentUser)
  const localCartItems = useAppSelector((state) => state.cartItems.cartItems)
  
  const cartItems = currentUser ? currentUser.cartItems : localCartItems
  const submitButtonName = currentUser ? 'continue to checkout' : 'sign in to check out'

  useEffect(() => {
    handleSubtotal()
  }, [cartItems])

  const handleMinusQty = (product: IProduct) => {
    if (currentUser) {
      dispatch(updateUserCartItems({ product, actionType: 'removeQty' }))
    } else {
      dispatch(removeQtyFromCartItem(product))
    }
  }

  const handleAddQty = (product: IProduct) => {
    if (currentUser) {
      dispatch(updateUserCartItems({ product, actionType: 'addQty' }))
    } else {
      dispatch(addQtyToCartItem(product))
    }
  }

  const handleRemoveItem = (product: IProduct) => {
    if (currentUser) {
      dispatch(updateUserCartItems({ product, actionType: 'removeFromCart' }))
    } else {
      dispatch(removeCartItem(product))
    }
  }

  const handleSubtotal = () => {
    if (currentUser) {
      dispatch(calcUserCartSubtotal())
    } else {
      dispatch(calcCartSubtotal())
    }
  }

  const handleCheckout = () => {    
    if(currentUser) {
      navigate('/checkout')
    } else {
      navigate('/account/signIn')
    }
  }


  

  return (
    <div>
      <h3 className='shopping-cart-header'>SHOPPING CART</h3>
      {cartItems.length ? (
        <div className='cart-main-grid'>
          <div>
            <div className='cart-items-header'>
              <span>product</span>
              <span>qty</span>
              <span>total price</span>
            </div>
            {cartItems.map((item) => {
              return (
                <div
                  key={item.product.id}
                  className='cart-item-grid'
                >
                  <div className='cart-item-product-container'>
                    <div className='cart-item-product'>
                      <Link to={`/products/${item.product.id}`}>
                        <img
                          src={item.product.imageUrls[0]}
                          alt='product'
                        />
                      </Link>
                      <Link to={`/products/${item.product.id}`}>
                        <span>{item.product.title}</span>
                      </Link>
                      <span>${item.product.price.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className='cart-item-qty'>
                    <button onClick={() => handleMinusQty(item.product)}>&#8722;</button>
                    <span>{item.qty}</span>
                    <button onClick={() => handleAddQty(item.product)}>+</button>
                  </div>
                  <div className='cart-item-total-price'>
                    <span>${(item.qty * item.product.price).toLocaleString()}</span>
                  </div>
                  <div className='remove-cart-item'>
                    <button onClick={() => handleRemoveItem(item.product)}>
                      <AiOutlineDelete />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
         <div className='cart-summary-wrapper'>
           <CartSummary submitFunction={handleCheckout} submitButtonName={submitButtonName} />
         </div>
        </div>
      ) : (
        <NoCartItems />
      )}
    </div>
  )
}

export default ShoppingCartPage
