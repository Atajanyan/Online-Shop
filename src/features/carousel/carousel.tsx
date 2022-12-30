import React,{useRef,useEffect,useState} from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import './styles.css'
import './caruselMedia.css'
import { Link } from 'react-router-dom'
import { IProduct } from '../../pages/productPage/productPage'

const Carousel: React.FC<{ slideContent: IProduct[]; sliderHeader: string }> = ({
  slideContent,
  sliderHeader,
}) => {
  const [innerWidth,setInnerWidth] = useState(window.innerWidth)
  useEffect(()=>{
    const handleResize = () => {
      setInnerWidth(window.innerWidth)
    }
    window.addEventListener('resize',handleResize)    
  },[])
  
  return (
    <div className='slider-container'>
      <h3 className='slider-header'>{sliderHeader}</h3>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={innerWidth<=450?1:innerWidth<=600?2:innerWidth>600&&innerWidth<=900?3:4}
        slidesPerGroup={innerWidth<=450?1:innerWidth<=600?2:innerWidth>600&&innerWidth<=900?3:4}
        navigation
        pagination={{ clickable: true }}
      >
        {slideContent.map((item) => {
          return (
            <SwiperSlide key={item.id}>
              <div className='slide-item'>
                <Link to={`/products/${item.id}`}>
                  <img
                    src={item.imageUrls[0]}
                    alt='product'
                  />
                </Link>
                <div className='slide-item-info'>
                  <Link to={`/products/${item.id}`}>
                    <span className='item-name'>{item.title}</span>
                  </Link>
                  <span>$ {item.price.toLocaleString()}</span>
                </div>
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}

export default Carousel
