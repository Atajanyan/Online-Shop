import React from 'react'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import ProductsUI from '../products/productsUI'
import { getLikedProducts, clearLikedItems } from '../../features/slices/favoritesSlice'
import NoFavorites from './noFavorites'
import './styles.css'
import './favoritesMedia.css'
import { updateUserLiked } from '../../features/slices/currentUserSlice'


const FavoritesPage: React.FC = () => {

 const dispatch = useAppDispatch()
 const currentUser = useAppSelector(state => state.currentUser.currentUser)
 const localFavorites = useAppSelector(state=>state.favoriteItems.favoriteItems)
 const favorites = currentUser ? currentUser.favoriteItems : localFavorites
 
  useEffect(()=>{
    dispatch(getLikedProducts())
  },[])

  const handleClearAllFavorites = () => {
    if(currentUser) {
      dispatch(updateUserLiked({actionType: 'clearAll'}))
    } else {
      dispatch(clearLikedItems())
    }
  }


  return (
    <>
    {
       favorites.length?
       <div className='favoritePage'>
       <div className='favoriteHeader'>
       <h1 className='favorites-h1'>Your Favorite Items</h1>
       <div className= 'clearFavoritesContainer'>
        <button onClick={handleClearAllFavorites}>Clear All Favorites</button>
       </div>
       <p>Item count: { favorites?.length}</p> 
      </div>
      <div className='favoritesContainer'>
      <ProductsUI products={favorites}/>
      </div>
      </div>
      :
      <NoFavorites/>
    }
    </>
  )
}

export default FavoritesPage
