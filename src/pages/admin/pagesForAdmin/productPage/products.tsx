import { useEffect, useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { RiDeleteBin6Line } from 'react-icons/ri'

import { useAppSelector, useAppDispatch } from '../../../../app/hooks'
import CategoriesToFilter from './filterByCategory/categoriesToFilter'
import {
  fetchAllProducts,
  fetchProductsByCategory,
} from '../../../../features/slices/productsSlice'
import { fetchedCategories } from '../../../../features/slices/categoriesSlice'
import { ZoomTheImgae } from './zoomTheImage/zoomTheImgae'
import { deleteProduct } from '../../../../firebase/queries'
import { EditProduct } from './editProducts/editProduct'
import './styles.css'
import AddProductBtn from './addProduct/addProductBtn'
import { IProduct } from '../../../productPage/productPage'

import { LoadMoreBtn } from '../../../../features/loadMoreBtn/loadMoreBtn'
import './styles.css'

const Products = function () {
  const [open, setOpen] = useState(false)

  const products = useAppSelector((state) => state.products.products)
  const needLoad = useAppSelector((state) => state.products.needLoad)
  const [categoryId, setSelected] = useState('All Products')
  const [zoomed, setZoomed] = useState(false)
  const [pages, setPages] = useState(10)
  const [editedProduct, setEditedProduct] = useState<IProduct>()
  const [src, setSrc] = useState('')
  const dispatch = useAppDispatch()

 
  useEffect(() => {
    dispatch(fetchedCategories())
  }, [])



  useEffect(() => {
    if (categoryId === 'All Products') {
      dispatch(fetchAllProducts({pages}))
    } else {
      dispatch(fetchProductsByCategory({ pages, categoryId }))
    }
  }, [categoryId, pages])

  const changeCategory = (category: string) => {
    setSelected(category)
    setPages(10)
  }
  const handlePages = () => {
    setPages(pages + 10)
  }
  const productHandler = () => {
    setOpen(!open)
  }
  
  

  return (
    <div>
      <div className='AdminPage'>
        <AddProductBtn />
      </div>
      <div>
        {zoomed && (
          <ZoomTheImgae
            imgUrl={src}
            zoomed={zoomed}
            setZoomed={setZoomed}
          />
        )}
      </div>

      <CategoriesToFilter
        selected={categoryId}
        changeCategory={changeCategory}
      />
      <table className='productPage'>
        <thead>
          <tr>
            <th>PHOTO</th>
            <th>NAME</th>
            <th>IN STOCK</th>
            <th>PRICE</th>
            <th>EDIT</th>
            <th>DELETE</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => {
            return (
              <tr key={product.id}>
                <td className='productTD'>
                  <img
                    className='photoInTable'
                    src={product.imageUrls[0]}
                    onClick={() => {
                      setZoomed(!zoomed)
                      setSrc(product.imageUrls[0])
                    }}
                  />
                </td>
                <td className='productTD'>{product.title}</td>
                <td className='productTD'>{product.inStock}</td>
                <td className='productTD'>{product.price}$</td>
                <td className='icons'>
                  <FaEdit
                    onClick={() => {
                      
                      
                      return productHandler(), setEditedProduct(product)
                    }}
                  />
                </td>
                <td className='icons'>
                  <RiDeleteBin6Line />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      {open && (
        <EditProduct
          editedProduct={editedProduct}
          open={open}
          setOpen={setOpen}
        />
      )}
      {needLoad && <LoadMoreBtn handlePagination={handlePages} />}
    </div>
  )
}

export default Products
