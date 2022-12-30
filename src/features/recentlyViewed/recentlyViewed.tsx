import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import Carousel from '../carousel/carousel'
import { getRecentlyViewedItems } from '../slices/recentlyViewedSlice'

const RecentlyViewed: React.FC = () => {
  const dispatch = useAppDispatch()
  const recentlyViewedProducts = useAppSelector((state) => state.recentlyViewed.recentlyViewed)

  useEffect(() => {
    dispatch(getRecentlyViewedItems())
  }, [])

  if (recentlyViewedProducts.length) {
    return (
      <Carousel
        slideContent={recentlyViewedProducts}
        sliderHeader='recently viewed'
      />
    )
  } else {
    return <></>
  }
}

export default RecentlyViewed
