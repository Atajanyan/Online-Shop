import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { sortByPrice } from '../../features/slices/productsSlice'

interface IOrderOption {
  value: TOrder
  text: 'Featured' | 'Price, low to high' | 'Price, high to low'
}

export type TOrder = 'featured' | 'asc' | 'desc'

const SortBy = () => {
  const [selected, setSelected] = useState<TOrder>('featured')
  const dispatch = useAppDispatch()
  const products = useAppSelector((state) => state.products.products)
  useEffect(() => {
    dispatch(sortByPrice(selected))
  }, [selected, products])

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(event.target.value as TOrder)
  }

  const orderOptions: IOrderOption[] = [
    { value: 'featured', text: 'Featured' },
    { value: 'asc', text: 'Price, low to high' },
    { value: 'desc', text: 'Price, high to low' },
  ]
  return (
    <div className='sortByPrice'>
      <label htmlFor='sort'>
        <span>Sort By </span>
        <select
          name=''
          id='sort'
          value={selected}
          onChange={handleChange}
        >
          {orderOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.text}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}

export default SortBy
