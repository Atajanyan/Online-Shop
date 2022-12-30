import React from 'react'
import { useAppSelector } from '../../app/hooks'

const CustomerAccount = () => {
    const currentUser = useAppSelector(state => state.currentUser.currentUser)
  return (
    <div>
         <h2 className='customer-page-header'>Hello, {currentUser?.name}</h2>
         <div className='customer-account-welcome-message'>
        You can track your orders, manage your rewards, credit cards, addresses and other account information.
       <span>Happy Shopping!</span>
         </div>
    </div>
  )
}

export default CustomerAccount