import React, { FC, useState, useEffect } from 'react'
import { HiOutlineHeart } from 'react-icons/hi'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { IProduct } from '../productPage/productPage'
import { getLikedProducts, updateLikedProducts } from '../../features/slices/favoritesSlice'
import { updateUserLiked } from '../../features/slices/currentUserSlice'

const LikeIcon: FC<{ product: IProduct }> = ({ product }) => {
  const [isLiked, setIsLiked] = useState(false)
  const currentUser = useAppSelector(state => state.currentUser.currentUser)
  const localFavorites = useAppSelector((state) => state.favoriteItems.favoriteItems)
  const favorites = currentUser ? currentUser.favoriteItems : localFavorites
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getLikedProducts())
  }, [])

  useEffect(() => {
    const isProductLiked = favorites.find((item: IProduct) => item.id === product.id)
    if (isProductLiked) {
      setIsLiked(true)
    }
  }, [favorites])

  const handleFavoriteIcon = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.stopPropagation()
    if(currentUser) {
      dispatch(updateUserLiked({likedItem: product, actionType: 'like-dislike'}))
    } else {dispatch(updateLikedProducts(product))}
    setIsLiked(!isLiked)
  }

  

  return (
    <span
      className='products_icon_heart'
      onClick={(e) => handleFavoriteIcon(e)}
    >
      <HiOutlineHeart
        stroke='#d21414'
        fill={!isLiked ? 'white' : '#d21414'}
        cursor='pointer'
      />
    </span>
  )
}

export default LikeIcon
