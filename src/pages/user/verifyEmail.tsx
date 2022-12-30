import { onAuthStateChanged, sendEmailVerification } from 'firebase/auth'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { auth } from '../../firebase/auth'

const VerifyEmail: React.FC = () => {
  const navigate = useNavigate()

  useEffect(() => {
    if (!auth.currentUser) {
        navigate('/account/signIn')
      } else if (auth.currentUser.emailVerified) {
        navigate('/account')
      } else if(!auth.currentUser.emailVerified) {
        sendEmailVerification(auth.currentUser)
        .then(() => {
          toast.success('Email verification sent!')
        })
        .catch((err) => {
          toast.error(err)
        })
      }
  }, [])

  const handleVerificationChange = () => {
    console.log(auth.currentUser, 'current')

    onAuthStateChanged(auth, (user) => {
      if (user) {
        user.reload()
        if (user.emailVerified) {
          clearInterval(intervalId)
          navigate('/account')
        }
      } else {
        clearInterval(intervalId)
      }
    })
  }

  const intervalId = setInterval(() => {
    handleVerificationChange()
  }, 3000)

 

  const handleResendBtn = () => {
    if (auth.currentUser) {
      sendEmailVerification(auth.currentUser)
        .then(() => {
          toast.success('Email verification sent!')
        })
        .catch((err) => {
          toast.error(err)
        })
    }
  }

  return (
    <div>
      {!auth.currentUser?.emailVerified && (
        <div>
          <span className='check-email-message'>
            Please check your email to verify your account.
          </span>
          <span>Didn&apos;t get the email? It may take a few minutes. Be sure to check your junk or spam folder.</span>
          <button
            onClick={handleResendBtn}
            className='resend-btn'
          >
            Resend email
          </button>
        </div>
      )}
    </div>
  )
}

export default VerifyEmail
