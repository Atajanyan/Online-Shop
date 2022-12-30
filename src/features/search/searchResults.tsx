import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchProductsForSearch } from '../slices/productsSlice'
import ProductsUI from '../../pages/products/productsUI'
import SortBy from '../../pages/products/sortBy'
import { LoadMoreBtn } from '../loadMoreBtn/loadMoreBtn'
import NoResults from './noResults'
import { BounceLoader } from 'react-spinners'



const SearchResults: React.FC = () => {
  const [pages, setPages] = useState(16)
  const { keyword } = useParams()
  const dispatch = useAppDispatch()
  const matchedProducts = useAppSelector((state) => state.products.products)
  const matchedProductsCount = useAppSelector((state) => state.products.matchedProductsCount)
  const needLoad = useAppSelector((state) => state.products.needLoad)
  const [isSearchLoading, setIsSearchLoading] = useState(false)
  const productsStatus = useAppSelector(state => state.products.status)

  useEffect(() => {
    if (keyword) {
      dispatch(fetchProductsForSearch({ pages, keyword }))
    }
  }, [keyword, pages])

  // useEffect(()=>{
  //   console.log(productsStatus, 'status');
    
  //   if(productsStatus==='loading'){
  //     setIsSearchLoading(true)
  //   } else if(productsStatus === 'succeeded') {
  //     setIsSearchLoading(false)
  //   }
  // },[productsStatus])

  const handlePagination = () => {
    setPages(pages + 16)
  }

  return (
    <div className='search-results'>
      {productsStatus === 'loading'  ? (
        <div className='loadingSpinner'>
          <BounceLoader color='red' />
        </div>
      ) : matchedProducts.length ? (
        <>
          <div className='search-result-heading'>
            <h2>{`${matchedProductsCount} search results for “${keyword}”`}</h2>
          </div>
          <div className='searched-products'>
            <SortBy />
            <ProductsUI products={matchedProducts} />
          </div>
        </>
      ) : (
        <NoResults keyword={keyword as string} />
      )}
      {needLoad && <LoadMoreBtn handlePagination={handlePagination} />}
    </div>
  )
}

export default SearchResults
