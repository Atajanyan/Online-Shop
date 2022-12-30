import './product.css'
import './productMedia.css'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getProductById } from '../../firebase/queries'
import AddToCart from '../cart/addToCart'
import { useAppDispatch } from '../../app/hooks'
import { updateRecentlyViewedItems } from '../../features/slices/recentlyViewedSlice'
import ProductPageCarusel from './productPageCarusel'
import { ProductPageh1, ProductPageImg,ProductDescription,ProductDetails,ProductPagePrice } from '../../features/skeletons'

export interface IProduct {
  categoryId?: string
  description: string
  details: string[]
  id : string
  imageUrls: string[]
  price: number
  title: string
  inStock: number
}

const ProductPage: React.FC = () => {
  const { productId } = useParams()
  const [product, setProduct] = useState<IProduct>()
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useAppDispatch()

  useEffect(() => {
    async function fetch() {
      if (productId) {
        const response = await getProductById(productId)
        dispatch(updateRecentlyViewedItems(response as IProduct))
        setProduct(response as IProduct)
        setIsLoading(false)
      }
    }
    fetch()
  }, [productId])

  return (
    <>
      <div className='product_info'>
        <div className='product_image_div'>
          {isLoading ? (
            <ProductPageImg />
          ) : (
            <ProductPageCarusel slideContent={product as IProduct} />
          )}
        </div>
        <div className='product_details_div'>
          <h2 className='product-title1'>{isLoading?<ProductPageh1/>: product?.title}</h2>
          <div className='product_details'>
            <span className='span-price'>$ {isLoading?<ProductPagePrice/>: product?.price.toLocaleString()}</span>
            <p></p>
            <AddToCart product={product as IProduct} />

            <p className='product-details'>Description</p>
            <p className='product-discription-text'>{isLoading?<ProductDescription/>: product?.description}</p>
            <p className='product-details'>Details</p>
            <p className='product-details-text'>
             <ul>
             {isLoading?<ProductDetails/>: product?.details.map((detail) => (
                <li
                  key={Math.random()}
                  className='details-arr'
                >
                  {detail}
                </li>
              ))}
             </ul>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductPage
