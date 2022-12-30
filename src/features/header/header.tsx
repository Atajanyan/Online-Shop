import React, { useEffect, useState } from 'react'
import './styles.css'
import './headerMedia.css'

import { Link, NavLink } from 'react-router-dom'
import CustomerNav from '../customerNav/customerNav'
import DepartmentsNav from '../departmentsNav/departmentsNav'
import SearchField from '../search/searchField'
import { BsSearch } from 'react-icons/bs'
import { useAppSelector } from '../../app/hooks'
import { selectAllDepartments } from '../slices/departmentsSlice'
import DepNavMedia from './depNavMedia'
import { IDepartment } from '../../firebase/queries'

const Header = () => {
  const [toggleClass, setToggleClass] = useState(false)
  const [isSearch,setIsSearch] = useState(false)
  const [isShow,setIsShow] = useState(false)
  const [subDep,setSubDep] = useState<IDepartment>()

  const handleSpan = (e:IDepartment) => {
    setIsShow(!isShow)
    setSubDep(e)
  }


  const departments = useAppSelector((state) => selectAllDepartments(state))

  const toggle = () => {
    setToggleClass(!toggleClass)
  }

  const hideSearch = () => {
    setIsSearch(!isSearch)
  }

  return (
    <div className='sticky-header'>
      <div onClick={toggle} className={`${!toggleClass?'divOverley':'divOverleyActive'}`}></div>
      <header>
        <div className='search-logo-customer'>
          <div
            className='menu_counteyner'
          >
            <div
              className='my_menu'
              onClick={toggle}
            >
              <span className={`line ${toggleClass ? 'line1_active' : 'line1'}`}></span>
              <span className={`line ${toggleClass ? 'line2_active' : 'line2'}`}></span>
              <span className={`line ${toggleClass ? 'line3_active' : 'line3'}`}></span>
            </div>
            <div className={`${toggleClass ? 'burgerMenu' : 'burgerMenu_active'}`}>
              <div className='customer-nav-container-media'>
                <CustomerNav />
              </div>
              <div className='department_media'>
                {departments.map((department:IDepartment) => (
                  <div className='mediaDep' key={department.id}>
                  <li>
                    <NavLink className='depName' to={`/${department.id}`}>{department.name}</NavLink>
                    <span onClick={()=>handleSpan(department)}>{'>'}</span>
                  </li>
                  <div className='mediaSubDep'>  
                  {
                   subDep?.id===department.id?<DepNavMedia department = {subDep}/>:null
                  }  
                  </div>
                  </div>
                ))}
                 
              </div>
            </div>
          </div>
          <div className='search_div'>
          <SearchField />
          </div>
          <div className='brand-logo'>
            <Link to='/'>C&apos;est la Home</Link>
          </div>
          <div className='search-media'>
            <div className='search-media-container'>
              <BsSearch className='search' onClick={hideSearch}/>
              <div className={`${isSearch?'media-search-hover-active':'media-search-hover'}`}>
               <SearchField />
              </div>
            </div>
          </div>
          <div className='customer-nav-container'>
            <CustomerNav />
          </div>
        </div>
        <div className='nav-container'>
          <DepartmentsNav />
        </div>
      </header>
    </div>
  )
}

export default Header
