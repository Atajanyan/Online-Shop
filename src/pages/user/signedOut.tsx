import React from 'react'
import { Link } from 'react-router-dom'

const SignedOut: React.FC = () => {
  return (
    <div className='signed-out-page'>
      <h3>You have signed out of your account</h3>
      <span>We look forward to your next visit.</span>
      <Link to='/account/signIn'>SIGN IN</Link>
      <Link to='/'>CONTINUE SHOPPING</Link>
    </div>
  )
}

export default SignedOut
