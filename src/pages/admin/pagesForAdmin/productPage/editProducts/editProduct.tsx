import React from 'react'
import { IoMdClose } from 'react-icons/io'
import { IOpen } from '../addProduct/addProduct'
import { useState, useEffect } from 'react'
import { editProducts } from '../../../../../firebase/queries'
import type { BaseSyntheticEvent } from 'react'

const imageTypeRegex = /image\/(png|jpg|jpeg)/gm
export const EditProduct = ({ editedProduct, open, setOpen }: IOpen) => {
  const [imageFiles, setImageFiles] = useState([])
  const [images, setImages] = useState<string[]>(editedProduct.imageUrls)
  const [categoryId, setCategoryId] = useState(editedProduct.categoryId)
  const [description, setDescription] = useState(editedProduct.description)
  const [details, setDetails] = useState<string[]>(editedProduct.details)
  const [inStock, setInStock] = useState<string>(editedProduct.inStock)
  const [price, setPrice] = useState<string>(editedProduct.price)
  const [title, setTitle] = useState(editedProduct.title)
  const [popUpToggle, setPopUpToggle] = useState(false)
  const editObjectModel = {
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
    const validImageFiles:any = []
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
            newImages.push(fileReader.result.toString())
          }
          if (newImages.length === imageFiles.length) {
            setImages(images.concat(newImages))
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

  const edit = async () => {
    await editProducts(editObjectModel, editedProduct.id)
  }

  const deleteImages = (i: number) => {
    const arr = images.slice(i, i + 1)
    setImages(
      images.filter((el) => {
        return el !== arr[0]
      }),
    )
  }
  const handleEdit = () => {
    edit(), setPopUpToggle(false), alert('the change was made successfully!!!'), setOpen(!open)
  }

  return (
    <div className='popUp'>
      {!popUpToggle ? (
        <div className='container'>
          <i
            className='closeButtonDiv'
            onClick={() => setOpen(!open)}
          >
            <IoMdClose />
          </i>

          <div className='inputContainer'>
            <input
              defaultValue={editedProduct.categoryId}
              type='text'
              placeholder='categoryId'
              onChange={(e) => {
                setCategoryId(e.target.value)
              }}
            />

            <input
              defaultValue={editedProduct.description}
              type='text'
              placeholder='description'
              onChange={(e) => {
                setDescription(e.target.value)
              }}
            />

            <input
              defaultValue={editedProduct.details}
              type='text'
              placeholder='details'
              onChange={(e) => {
                setDetails([e.target.value])
              }}
            />

            <input
              defaultValue={editedProduct.inStock}
              type='number'
              placeholder='inStock'
              onChange={(e) => {
                setInStock(e.target.value)
              }}
            />

            <input
              defaultValue={editedProduct.price}
              type='number'
              placeholder='price'
              onChange={(e) => {
                setPrice(e.target.value)
              }}
            />

            <input
              defaultValue={editedProduct.title}
              type='text'
              placeholder='title'
              onChange={(e) => {
                setTitle(e.target.value)
              }}
            />

            <input
              type='file'
              multiple
              accept='image/*'
              onChange={changeHandler}
            />

            <div className='divImage'>
              {images?.map((image, i) => {
                return (
                  <div className='deleteImgDiv' key={image}> 
                  <span>X</span> 
                    <img
                    onClick={() => {
                      deleteImages(i)
                    }}
                    className='image'
                    src={image}
                  /> 
                   </div>
                )
              })}
            </div>

            <button
              className='editButton'
              onClick={() => {
                setPopUpToggle(true)
              }}
            >
              Edit Product
            </button>
          </div>
        </div>
      ) : (
        <div className='popContainer'>
          <p>do you really want to make a change?</p>
          <button
            className='yesClick'
            onClick={handleEdit}
          >
            Yes
          </button>
          <button
            className='noClick'
            onClick={() => {
              setPopUpToggle(false)
            }}
          >
            No
          </button>
        </div>
      )}
    </div>
  )
}
