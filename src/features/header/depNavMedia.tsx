import React from 'react'
import { useNavigate } from 'react-router'
import { ISubdepartment } from '../slices/subdepartmentsSlice'




const DepNavMedia= ({department}:any) => {    
    const navigate = useNavigate()
  return (
    department?.subdepartments?.map((subdepartment:ISubdepartment)=><div onClick={()=>navigate(`${department.id}`)} className='mediaSubDepartment' key={Math.random()}>
    {subdepartment.name}
  </div>)

  )
}

export default DepNavMedia