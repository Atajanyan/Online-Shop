import React, { useState } from 'react'
import AddProduct from './addProduct'

import '../../../styles.css'




const AddProductBtn = () => {
  const [open, setOpen] = useState(false)
  const productHandler = () => {
    setOpen(!open)
  }
  return (
    <div className='addBtnDiv'>
      <button className='addProductBot' onClick={productHandler} >Add a product</button>
      {open && <AddProduct open={open}setOpen={setOpen}/>}
    </div>
  )
}

export default AddProductBtn
