import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { IProduct } from './productPage'
import LikeIcon from '../favorites/likeIcon'
import { TransformWrapper,TransformComponent } from 'react-zoom-pan-pinch'


const ProductPageCarusel:React.FC<{slideContent:IProduct}> = ({slideContent}) => {
  
  return (
    

    <div className='slider-container-prodPage'>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        slidesPerGroup={1}
        navigation
        pagination={{ clickable: true }}
      >
        {slideContent?.imageUrls.map((item) => {
          return (
            <SwiperSlide key={item}>
              <div className='slide-item-productePage'>
                <TransformWrapper>
                  <TransformComponent>
                    <img
                    className='productPageImg'
                    src={item}
                    alt='product'
                  />
                    </TransformComponent>
                  </TransformWrapper>
                     <div className='like-icon-container'>
                <LikeIcon product={slideContent as IProduct} />
              </div>
              </div>
            </SwiperSlide>
          )
        })}
        
      </Swiper>
   
    </div>
    
  )
}

export default ProductPageCarusel