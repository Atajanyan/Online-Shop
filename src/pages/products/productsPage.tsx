import { fetchProductsByCategory } from '../../features/slices/productsSlice'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { useParams } from 'react-router'
import { useEffect, useState } from 'react'

import './styles.css'
import SortBy from './sortBy'
import ProductsUI from './productsUI'
import {Skeleton} from '../../features/skeletons'
import { LoadMoreBtn } from '../../features/loadMoreBtn/loadMoreBtn'

const ProductsPage: React.FC = () => {
  const [pages, setPages] = useState(8)
  const { categoryId } = useParams()
  const dispatch = useAppDispatch()
  const products = useAppSelector((state) => state.products.products)
  const productsStatus = useAppSelector((state) => state.products.status)
  const error = useAppSelector((state) => state.products.error)
  const needLoad = useAppSelector((state) => state.products.needLoad)

  useEffect(() => {
    setPages(8)
  }, [categoryId])

  useEffect(() => {
    if (categoryId) {
      dispatch(fetchProductsByCategory({ pages, categoryId }))
    }
  }, [pages, categoryId])

  const handlePagination = () => {
    setPages(pages + 8)
  }
  return (
    <>
    <div className='products-container'>
      <SortBy />
      {productsStatus===('loading'||'idle')?[...new Array(8)].map((e,ind)=><div className='product' key={ind}>
        <Skeleton/>
      </div>)
      :<ProductsUI products={products} />}
    </div>
    {needLoad&&<LoadMoreBtn handlePagination={handlePagination}/>}
    </>
  )
}

export default ProductsPage
