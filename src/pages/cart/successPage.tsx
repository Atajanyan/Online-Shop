import React from 'react'
import { Link } from 'react-router-dom'

const SuccessPage = () => {
  return (
    <div className='success-page'>
        <h3>Congrats! You have successfully placed your order.</h3>
        <p>It can take some time to appear in your account.</p>
        <p>Check back later to find it in your orders.</p>
        <Link to='/'>Go back to shopping</Link>
    </div>
  )
}

export default SuccessPage