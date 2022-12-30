import React from 'react'
import { postProducts } from '../../../../../firebase/queries'
import '../../../styles.css'
import '../zoomTheImage/zoomTheImgae'
import { IoMdClose } from 'react-icons/io'
import { useState, useEffect } from 'react'
import type { BaseSyntheticEvent } from 'react'

interface Event<T = EventTarget> {
  target: T
}
export interface IOpen {
  editedProduct?: any
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export interface IObject {
  categoryId: string
  description: string
  details: string[]
  inStock: number
  price: number
  title: string
  imageUrls: string[]
}

const imageTypeRegex = /image\/(png|jpg|jpeg)/gm
export default function AddProduct({ open, setOpen }: IOpen) {
  const [imageFiles, setImageFiles] = useState([])
  const [images, setImages] = useState<string[]>([])
  const [categoryId, setCategoryId] = useState('')
  const [description, setDescription] = useState('')
  const [details, setDetails] = useState<string[]>([])
  const [inStock, setInStock] = useState<string>('')
  const [price, setPrice] = useState<string>('')
  const [title, setTitle] = useState('')

  const objectModel: IObject = {
    categoryId: categoryId,
    description: description,
    details: details,
    inStock: +inStock,
    price: +price,
    title: title,
    imageUrls: images,
  }

  const changeHandler = (e: BaseSyntheticEvent) => {
    const { files } = e.target
    const validImageFiles: any = []
    for (let i = 0; i < files.length; i++) {
      const file = files[i]

      if (file.type.match(imageTypeRegex)) {
        validImageFiles.push(file)
      }
    }
    if (validImageFiles.length) {
      setImageFiles(validImageFiles)
      return
    }
    alert('Selected images are not of valid type!')
  }

  useEffect(() => {
    const newImages: any = [],
      fileReaders: FileReader[] = []

    if (imageFiles.length) {
      imageFiles.forEach((file) => {
        const fileReader = new FileReader()
        fileReaders.push(fileReader)

        fileReader.onload = () => {
          if (fileReader.result) {
            newImages.push(fileReader.result)
          }
          if (newImages.length === imageFiles.length) {
            setImages(newImages)
          }
        }
        fileReader.readAsDataURL(file)
      })
    }
    return () => {
      fileReaders.forEach((fileReader) => {
        if (fileReader.readyState === 1) {
          fileReader.abort()
        }
      })
    }
  }, [imageFiles])

  const addCategoryId = (e: Event<HTMLInputElement>) => {
    setCategoryId(e.target.value)
  }
  const addDescription = (e: Event<HTMLInputElement>) => {
    setDescription(e.target.value)
  }
  const addDetails = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetails([e.target.value])
  }
  const addInStock = (e: Event<HTMLInputElement>) => {
    setInStock(e.target.value)
  }
  const addPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value)
  }
  const addTitle = (e: Event<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const stateValues = () => {
    return Object.values(objectModel).every((el) => Boolean(el) === true)
  }

  const post = async () => {
    await postProducts(objectModel)
  }
  const addPosts = () => {
    stateValues()
      ? (post(), setOpen(!open), alert('Successfully added product'))
      : alert('All input fields must be filled in to add a product')
  }

  return (
    <div className='popUp'>
      <div className='container'>
        <i
          className='closeButtonDiv'
          onClick={() => {
            setOpen(!open)
          }}
        >
          <IoMdClose />
        </i>

        <div className='inputContainer'>

        <input
            value={title}
            className='inputContainer'
            type='text'
            placeholder='Enter the name of the product'
            onChange={addTitle}
          />
          
          <input
            value={categoryId}
            type='text'
            placeholder='Enter category of the product'
            onChange={addCategoryId}
          />

          <input
            className='inputContainer'
            value={description}
            type='text'
            placeholder='Enter the description'
            onChange={addDescription}
          />

          <input
            className='inputContainer'
            value={details}
            type='text'
            placeholder='Enter the details'
            onChange={addDetails}
          />

          <input
            value={inStock}
            className='inputContainer'
            type='number'
            placeholder='Enter the quantity'
            onChange={(e) => addInStock(e)}
          />

          <input
            value={price}
            className='inputContainer'
            type='number'
            placeholder='Enter the price'
            onChange={(e) => addPrice(e)}
          />
          <input
            className='inputContainer'
            type='file'
            id='file'
            onChange={changeHandler}
            accept='image/png, image/jpg, image/jpeg'
            multiple
          />
          <div className='divImage'>
            {images.map((image) => {
              return (
                <img
                  key={image}
                  className='image'
                  src={image}
                />
              )
            })}
          </div>
        </div>
        <button
          className='addPosts'
          onClick={addPosts}
        >
          Add posts
        </button>
      </div>
    </div>
  )
}
