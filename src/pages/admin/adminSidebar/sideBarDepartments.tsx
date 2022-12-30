import React from 'react'
import '.././styles.css'
import { BsTruck } from 'react-icons/bs'
import { useNavigate } from 'react-router'
import {BsBoxSeam} from 'react-icons/bs'
import {FiUsers} from 'react-icons/fi'

const SideBarDepartments = function () {
  const navigate = useNavigate()

  return (
    <div className='listedDeps'>
      <div className='items' onClick={()=>navigate('/account/admin/products')}>
        <div>
          <BsBoxSeam />
        </div>
        <div> Products </div>
      </div>
      <div className='items' onClick={()=>navigate('/account/admin/users')}>
        <div>
          <FiUsers />
        </div>
        <div> Users</div>
      </div>
      <div className='items' onClick={()=>navigate('/account/admin/orders')}>
        <div>
          <BsTruck />
        </div>
        <div>Orders</div>
      </div>
    </div>
  )
}
export default SideBarDepartments
