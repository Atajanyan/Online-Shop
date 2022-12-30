import React from 'react'
import {HiPlusSm} from 'react-icons/hi'

const CustomerAddresses = () => {
  return (
    <div>
      <h2>Addresses</h2>
      <div className='add-new-address'>
        <button><HiPlusSm fontSize={18}/>ADD NEW ADDRESS</button>
      </div>
    </div>
  )
}

export default CustomerAddresses