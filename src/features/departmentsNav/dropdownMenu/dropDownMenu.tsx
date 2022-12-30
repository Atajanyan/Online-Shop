import React from 'react'
import { Link } from 'react-router-dom'
import { IDepartment } from '../../../firebase/queries'
import './styles.css'

interface IDropdownProps {
  department: IDepartment
}

const DropDownNav: React.FC<IDropdownProps> = ({ department }) => {
  return (
    <div className='dropdown-menu'>
      <div className='dropdown-content'>
        {department.subdepartments.map((subdepartment) => {
          return (
            <div
              key={subdepartment.id}
              className='dropdown-column'
            >
              <div className='dropdown-column-header'>{subdepartment.name}</div>
              <ul className='dropdown-category-list'>
                {subdepartment.categories.map((category) => {
                  return (
                    <li key={category.id}>
                      <Link to={`/${department.id}/${category.id}`}>{category.name}</Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default DropDownNav
