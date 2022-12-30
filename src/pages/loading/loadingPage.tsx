import React from 'react'
import { DepartmentNavSkeleton } from '../../features/skeletons'

const LoadingPage = () => {
  return <div className='departments-list'>
    <DepartmentNavSkeleton/>
    <DepartmentNavSkeleton/>
    <DepartmentNavSkeleton/>
    <DepartmentNavSkeleton/>
    <DepartmentNavSkeleton/>
    <DepartmentNavSkeleton/> 
  </div>
}

export default LoadingPage
