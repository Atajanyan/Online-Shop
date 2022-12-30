import React, { useEffect, useState } from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri'

import { useAppDispatch, useAppSelector } from '../../../../app/hooks'
import { fetchUsers } from '../../../../features/slices/usersSlice'
import { deleteUser } from '../../../../features/slices/usersSlice'

import { LoadMoreBtn } from '../../../../features/loadMoreBtn/loadMoreBtn'

const Users = function () {
  const dispatch = useAppDispatch()
  const users = useAppSelector((state) => state.users.users)
  const needLoad = useAppSelector((state) => state.users.needLoad)
  const [pages, setPages] = useState(10)

  useEffect(() => {
    dispatch(fetchUsers({ pages }))
  }, [pages])

  const handleDeleteUser = (userId: string) => {
    dispatch(deleteUser(userId))
  }

  const handlePages = () => {
    setPages(pages + 10)
  }

  return (
    <div>
      <table className='productPage'>
        <thead>
          <tr>
            <th>PHOTO</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>DELETE</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => {
            return (
              <tr key={user.id}>
                <td className='productTD'>
                  <img
                    className='photoInTable'
                    src='https://stonegatesl.com/wp-content/uploads/2021/01/avatar-300x300.jpg'
                  />
                </td>
                <td className='productTD'>{user.name}</td>
                <td className='productTD'>{user.email}</td>
                <td className='icons'>
                  <RiDeleteBin6Line onClick={() => handleDeleteUser(user.id)} />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      {needLoad && <LoadMoreBtn handlePagination={handlePages} />}
    </div>
  )
}

export default Users
