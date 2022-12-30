import React from 'react'

const Subscribe: React.FC = () => {
  return (
    <li className='footer-li'>
      <form className='subscribe'>
        <div className='email'>
          <input
            type='email'
            placeholder='ENTER YOUR EMAIL'
          />
             <button
            className='submit'
            type='submit'
          >
            Sign UP
          </button>
        </div>
        {/* <div className='submit'> */}
       
        {/* </div> */}
      </form>
    </li>
  )
}

export default Subscribe
