import React,{FC,useState} from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { IProduct } from '../productPage/productPage'
import { updateCartItems } from '../../features/slices/cartSlice'
import './shoppingCart.css'
import { updateUserCartItems } from '../../features/slices/currentUserSlice';

export interface ICartItem {
  product: IProduct
  qty: number
}

const AddToCart: FC<{ product: IProduct }> = ({ product }) => {
  const [addedToCart, setAddedToCart] = useState(false)
  const [addedToCartMedia, setAddedToCartMedia] = useState(false)
  const dispatch = useAppDispatch()

  const handleAddToCartMedia = () => {
    // dispatch(updateCartItems(product))
    setAddedToCartMedia(true)
    setTimeout(() => {
      setAddedToCartMedia(false)
    }, window.innerWidth>=900?800:2000)
  }
    const currentUser = useAppSelector(state => state.currentUser.currentUser)

  const handleAddToCard = () => {
        if(currentUser) {
            dispatch(updateUserCartItems({product, actionType: 'addToCart'}))
        } else {
        dispatch(updateCartItems(product))
        }
    setAddedToCart(true)
    setTimeout(() => {
      setAddedToCart(false)
    }, 800)
    handleAddToCartMedia()
  }

  return (
    <div className='add-cart-div'>
      <div>
        <button
          disabled={addedToCartMedia ? true : false}
          onClick={handleAddToCard}
          className={addedToCartMedia ? 'button-add-cart-disabled' : 'button-add-cart'}
        >
          ADD TO CART
        </button>
      </div>
      <div className='animDiv'>
        <img
          className={
            addedToCart ? 'added-productImage-to-cart ' : 'added-productImage-to-cart-Dnone'
          }
          src={product?.imageUrls[0]}
          alt=''
        />
      </div>
      <div className='cart-message-div'>
        <p className={addedToCartMedia ? 'messageShow' : 'messageHide'}>Product Added to Cart</p>
      </div>
    </div>
  )
}

export default AddToCart
