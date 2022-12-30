import React from 'react'
import '.././styles.css'
import SideBarDepartments from './sideBarDepartments'
import { SlArrowRight } from 'react-icons/sl'
import './styles.css'
import { Outlet } from 'react-router'

const SideBar = function () {
  return (
    <div className='admin-sidebar'>
      <div className='arrow'>
        <SlArrowRight />
      </div>
      <div className='sideNav'>
        <SideBarDepartments />
      </div>
      <Outlet />
    </div>
  )
}

export default SideBar
