import React from 'react'
import { FaHeart } from 'react-icons/fa'

const NoFavorites: React.FC = () => {
  return (
    <div className='noFavorites'>
        <FaHeart fill='#d21414' className='heart'/>
        <h1>You don&apos;t have favorite items yet {':('}</h1> 
        <p>See something you like? Keep track of</p>
        <p>your favorite items and inspiration by selecting the heart icon.</p>
        {/* <h2> You Might Like </h2> */}
        </div>
  )
}

export default NoFavorites