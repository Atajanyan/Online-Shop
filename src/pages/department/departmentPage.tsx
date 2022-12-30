import './styles.css'
import './departmentMedia.css'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  fetchSubdepartments,
  selectSubdepartmentsByDepartment,
  selectSubdepartmentsError,
  selectSubdepartmentsStatus,
} from '../../features/slices/subdepartmentsSlice'

import { selectDepartment } from '../../features/slices/departmentsSlice'
import { SubDepartmentsSkeleton, SubDepartmentsImageSkeleton } from '../../features/skeletons'

const DepartmentPage: React.FC = () => {
  const dispatch = useAppDispatch()

  const { departmentId } = useParams()

  const subdepartments = useAppSelector(selectSubdepartmentsByDepartment)
  const subdepartmentsStatus = useAppSelector(selectSubdepartmentsStatus)
  const error = useAppSelector(selectSubdepartmentsError)
  const department = useAppSelector((state) => {
    if (departmentId) {
      return selectDepartment(state, departmentId)
    }
  })

  useEffect(() => {
    if (departmentId) {
      dispatch(fetchSubdepartments(departmentId))
    }
  }, [departmentId])

  const renderedSubdepartments = subdepartments.map((subdepartment) => {
    return (
      <div
        key={subdepartment.id}
        className='subDepartment'
      >
        <h2 className='subdepartment-name'>{subdepartment.name}</h2>
        <div className='categories-container'>
          {subdepartment.categories.map((category) => {
            return (
              <div
                key={category.id}
                className='category'
              >
                <Link to={`/${departmentId}/${category.id}`}>
                  <img
                    src={category.imageUrl}
                    alt='category'
                    className='category-image'
                  />
                  <span className='category-name'>{category.name}</span>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    )
  })

  return (
    <div className='shop-main-container'>
      <div className='department-page'>
        <div className='department-name-container'>
          <h2 className='department-name'>{department?.name}</h2>
        </div>
        {subdepartmentsStatus === 'loading' ? (
          <SubDepartmentsImageSkeleton />
        ) : (
          <img
            className='department-image'
            src={department?.imageUrl}
            alt={department?.name}
          />
        )}

        {subdepartmentsStatus === 'loading' ? (
          <div className='categorySkeleton'>
            {[...new Array(8)].map((_, ind) => (
              <div
                className='category'
                key={ind}
              >
                <SubDepartmentsSkeleton />
              </div>
            ))}
          </div>
        ) : (
          <div className='content'>{renderedSubdepartments}</div>
        )}
      </div>
    </div>
  )
}

export default DepartmentPage
