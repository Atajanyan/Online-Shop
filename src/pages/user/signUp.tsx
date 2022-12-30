import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './styles.css'
import LoadingPage from '../loading/loadingPage'
import { toast } from 'react-toastify'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { signUpUser } from '../../features/slices/currentUserSlice'

const SignUp: React.FC = () => {
  const [fields, setFields] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const userStatus = useAppSelector((state) => state.currentUser.status)
  const userError = useAppSelector((state) => state.currentUser.error)
  const currentUser = useAppSelector((state) => state.currentUser.currentUser)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (currentUser) {
      navigate('/account')
    }
    if (userStatus === 'failed') {
      toast.error(userError)
    } else if (userStatus === 'succeeded') {
      navigate('/account/verifyEmail')
    }
  }, [userStatus, currentUser])

  const handleCreateAccount = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (fields.password === fields.confirmPassword) {
      dispatch(signUpUser({ email: fields.email, password: fields.password, name: fields.name }))
    } else {
      toast.error('Passwords don\'t match.')
    }
  }

  return (
    <div className='sign-form-page'>
      {userStatus === 'loading' && <LoadingPage />}
      <div className='sign-form-header'>
        <h2>Create Account</h2>
        By creating an account you are gonna be able to make orders and track your order history.
        Save your favorite items to your account.
        <div>
          Already have an account? <Link to='/account/signIn'>Sign In</Link>
        </div>
      </div>
      <div className='sign-form-container'>
        <form onSubmit={handleCreateAccount}>
          <div>
            <label htmlFor='name'>Full Name</label>
            <input
              id='name'
              type='text'
              required
              value={fields.name}
              onChange={(e) =>
                setFields((prev) => {
                  return { ...prev, name: e.target.value }
                })
              }
            />
          </div>
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
          <div>
            <label htmlFor='confirmPassword'>Confirm Password</label>
            <input
              id='confirmPassword'
              type='password'
              required
              value={fields.confirmPassword}
              onChange={(e) =>
                setFields((prev) => {
                  return { ...prev, confirmPassword: e.target.value }
                })
              }
            />
          </div>
          <button>Create Account</button>
        </form>
      </div>
    </div>
  )
}

export default SignUp
