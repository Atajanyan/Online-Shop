import React from 'react'
import './zoomTheImage.css'
import {IoMdClose} from 'react-icons/io'


interface IZoomingIMG {
    imgUrl:string
    zoomed:boolean
    setZoomed: React.Dispatch<React.SetStateAction<boolean>>
  }

export const ZoomTheImgae = ({imgUrl,setZoomed,zoomed}:IZoomingIMG) => {
  return (
    <div className='popUp'>
       <div className='container'>
       <i className='closeButtonDiv' onClick={()=>(setZoomed(!zoomed))}>
        <IoMdClose/>
       </i>
        <img className='zoomedImg' src={imgUrl} alt='zoomedPhoto'/>
       </div>
    </div>
  )
}
