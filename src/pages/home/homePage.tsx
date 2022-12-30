import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router'
import './styles.css'
import './homePageMedia.css'
import { SubDepartmentsImageSkeleton } from '../../features/skeletons'

const HomePage = () => {
  const navigate = useNavigate()
  const [isLoading,setIsloading] = useState(true)
  useEffect(()=>{
    setTimeout(() => {
      setIsloading(false)
    }, 4000);
  },[])
  
  return (
    <div>
      <div className='main-video-container'>
      <iframe src="https://player.vimeo.com/video/755323125/?h=0a19c8bc86&loop=1&background=1&autoplay=true"></iframe>
        <div className='video-ad-container'>
          <div className='text-shop'>
            <button onClick={() => navigate('/holidays')}>SHOP NOW</button>
          </div>
        </div>
      </div>
      <div className='homePageDep'>
        <div className='homePageDepTop' onClick={()=>navigate('/holidays')}>
          <div className='homePageDepTopImg'>
            <img src="https://assets.pbimgs.com/pbimgs/rk/images/dp/wcm/202233/0454/tree-candle-clips-set-1-xl.jpg" alt="" />
          </div>
          <div className='homePageDepTopImg'>
            <img src="https://assets.pbimgs.com/pbimgs/rk/images/dp/wcm/202236/0042/plaid-stockings-xl.jpg" alt="" />
          </div>
          <div className='homePageDepTopImg homePageDepTopImgNone'>
            <img src="https://assets.pbimgs.com/pbimgs/rk/images/dp/wcm/202243/0111/pre-lit-flocked-montana-pine-faux-christmas-tree-7-xl.jpg" alt="" />
          </div>
        </div>
        <div className='homePageDepBottom' onClick={()=>navigate('/furniture')}>
          <p>Comfy nights and cozy mornings</p>
          <img src="https://assets.pbimgs.com/pbimgs/rk/images/dp/wcm/202234/0878/harper-tufted-upholstered-tall-bed-z.jpg" alt="" />
        </div>
        <div className='homePageDepTop' onClick={()=>navigate('/furniture')}>
          <div className='homePageDepTopImg'>
            <img src="https://assets.pbimgs.com/pbimgs/rk/images/dp/wcm/202241/0014/stratton-storage-platform-bed-with-drawers-montgomery-head-z.jpg" alt="" />
          </div>
          <div className='homePageDepTopImg'>
            <img src="https://assets.pbimgs.com/pbimgs/rk/images/dp/wcm/202245/0023/chesterfield-tufted-upholstered-bed-z.jpg" alt="" />
          </div>
          <div className='homePageDepTopImg homePageDepTopImgNone'>
            <img src="https://assets.pbimgs.com/pbimgs/rk/images/dp/wcm/202229/0160/farmhouse-canopy-bed-1-z.jpg" alt="" />
          </div>
        </div>
        <div className='homePageDepBottom' onClick={()=>navigate('/pillows-decor')}>
          <p>White and soft as the first snow!</p>
          <img src="https://assets.pbimgs.com/pbimgs/rk/images/dp/wcm/202235/0266/get-the-look-layers-of-blue-1-xl.jpg" alt="" />
        </div>
        <div className='homePageDepTop' onClick={()=>navigate('/pillows-decor')}>
          <div className='homePageDepTopImg'>
            <img src="https://assets.pbimgs.com/pbimgs/rk/images/dp/wcm/202234/1227/belgian-linen-pillow-cover-z.jpg" alt="" />
          </div>
          <div className='homePageDepTopImg'>
            <img src="https://assets.pbimgs.com/pbimgs/ab/images/dp/wcm/202238/0448/stewart-plaid-pillow-cover-xl.jpg" alt="" />
          </div>
          <div className='homePageDepTopImg homePageDepTopImgNone'>
            <img src="https://assets.pbimgs.com/pbimgs/ab/images/dp/wcm/202250/0156/luxe-faux-fur-bean-bag-1-xl.jpg" alt="" />
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default HomePage
