import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../app/hooks'
import { getOrders } from '../../../../features/slices/allOrdersSlice'

const Orders = function () {
  const dispatch = useAppDispatch() 
  const orders = useAppSelector((state) => state.allOrders.orders)

  useEffect(() => {
    dispatch(getOrders())
  }, []) 

 


  return (
    <div>
      <table className='productPage'>
        <thead>
          <tr>
            <th>DATE</th>
            <th>USER (ID)</th>
            <th>TOTAL</th>
            <th>STATUS</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((user) => {
            return (
              <tr key={user.id}>
                <td className='productTD'>{user.date}</td>
                <td className='productTD'>{user.userId}</td>
                <td className='productTD'>{user.subtotal}$</td>
                <td className='productTD'>{user.status}</td>
                <td className='icons'>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Orders
