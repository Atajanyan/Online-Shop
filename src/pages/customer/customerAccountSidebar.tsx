import React, { ReactNode, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { auth } from '../../firebase/auth'
import './styles.css'

import { ISidebarProps } from './types'
import {IoCubeOutline} from 'react-icons/io5'
import {VscAccount, VscSignOut} from 'react-icons/vsc'
import {FiSettings} from 'react-icons/fi'
import {MdOutlineKeyboardArrowRight} from 'react-icons/md'
import {TbAddressBook} from 'react-icons/tb'
import { Link, NavLink } from 'react-router-dom'
import { signOutUser } from '../../features/slices/currentUserSlice'




const CustomerAccountSidebar: React.FC = () => {
  const currentUser = useAppSelector((state) => state.currentUser.currentUser)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if(!currentUser) {
      navigate('/account/signIn')
    }
    if(!auth.currentUser?.emailVerified) {
      navigate('/account/verifyEmail')
    }
  }, [])

  const menuItems = [
    {
        path: '/account/orders',
        name: 'My orders',
        icon: <IoCubeOutline />
    },
    {
      path: '/account/addresses',
      name: 'Address book',
      icon: <TbAddressBook />
  },
    {
        path: '/account/settings',
        name: 'Account settings',
        icon: <FiSettings />
    },
]

const handleSignOut = () => {
  dispatch(signOutUser())
}

  return (
    <div className='customer-page'>
      <div className='sticky-customer-sidebar'>
      <aside>
        {
          menuItems.map(item => {
            return (
              <div key={item.path} className='customer-sidebar-item'>
                <NavLink to={item.path}>
                  {item.icon}
                  <span>{item.name}</span>
                  <span className='customer-sidebar-arrow'>
                  <MdOutlineKeyboardArrowRight />
                  </span>
                </NavLink>
              </div>
            )
          })
        }
        <div className='customer-sidebar-item'>
                <NavLink to='/account/signOut' onClick={handleSignOut}>
                <VscSignOut />
                  <span>Sign out</span>
                  <span className='customer-sidebar-arrow'>
                  <MdOutlineKeyboardArrowRight />
                  </span>
                </NavLink>
              </div>
      </aside>
      </div>
      <div className='main-page-container'>
        <main><Outlet /></main>
      </div>
    </div>
)
}

export default CustomerAccountSidebar
