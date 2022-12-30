import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { signInUser } from '../../features/slices/currentUserSlice'
import LoadingPage from '../loading/loadingPage'

const SignIn: React.FC = () => {
  const [fields, setFields] = useState({
    email: '',
    password: '',
  })

  const userStatus = useAppSelector((state) => state.currentUser.status)
  const userError = useAppSelector((state) => state.currentUser.error)
  const currentUser = useAppSelector((state) => state.currentUser.currentUser)
const isAdmin = useAppSelector(state => state.currentUser.isAdmin)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (currentUser) {
        navigate(`/account${isAdmin ? '/admin' : ''}`)  
    }
    if (userStatus === 'failed') {
      toast.error(userError)
    } else if (userStatus === 'succeeded') {
      navigate(`/account${isAdmin ? '/admin' : ''}`)  
    }
  }, [userStatus, currentUser, isAdmin])

  const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(signInUser({ email: fields.email, password: fields.password }))
  }
  
  
  return (
    // userStatus === 'loading' ? <LoadingPage />:
    <div className='sign-form-page'>
      
      <div className='sign-form-header'>
        <h2>Sign In</h2>
        Sign in to your account to see your favorite items and items in your cart.
        <div>
          Still don&apos;t have an account? <Link to='/account/signUp'>Sign up</Link>
        </div>
      </div>
      <div className='sign-form-container'>
        <form onSubmit={handleSignIn}>
          <div>
            <label htmlFor='email'>Email Address</label>
            <input
              id='email'
              type='email'
              required
              value={fields.email}
              onChange={(e) =>
                setFields((prev) => {
                  return { ...prev, email: e.target.value }
                })
              }
            />
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <input
              id='password'
              type='password'
              required
              value={fields.password}
              onChange={(e) =>
                setFields((prev) => {
                  return { ...prev, password: e.target.value }
                })
              }
            />
          </div>
          <button>Sign In</button>
        </form>
      </div>
    </div>
  )
}

export default SignIn
