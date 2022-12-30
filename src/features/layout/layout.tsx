import React from 'react'
import Footer from '../footer/footer'
import Header from '../header/header'
import SideBar from '../../pages/admin/adminSidebar/sideBar'
import RecentlyViewed from '../recentlyViewed/recentlyViewed'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

  return (
    <div className='App-wrapper'>
      <Header />
      <div className='all-content'>{children}</div>
      <RecentlyViewed />
      <Footer />
    </div>
  )
}

export default Layout
