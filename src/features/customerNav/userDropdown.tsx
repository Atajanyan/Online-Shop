import React from 'react'
import './userDropdown.css'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { useNavigate } from 'react-router'
import { signOutUser } from '../slices/currentUserSlice'

const UserDropdown = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const currentUser = useAppSelector((state) => state.currentUser.currentUser)

  const handleSignIn = () => {
    navigate('/account/signIn')
  }

  const handleSignOut = () => {
    dispatch(signOutUser())
    navigate('/account/signOut')
  }
  return (
    <div className='user-dropdown'>
      <div className='sign-in-out-button'>
        {currentUser ? (
          <button onClick={handleSignOut}>Sign Out</button>
        ) : (
          <button onClick={handleSignIn}>Sign In / Create Account</button>
        )}
      </div>
    </div>
  )
}

export default UserDropdown
