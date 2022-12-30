import React from 'react'
import { useNavigate } from 'react-router-dom'

import ContactUs from './contuctUs/contuctUs'
import Follows from './follows/follows'

import './footer.css'
import './footerMedia.css'

const Footer: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className='footerContainer'>
      <div className='footer'>
        <div className="futter-container">
        <ul className='footer-column'>
          <li className='footer-heading'>About US</li>
          <li
            className='liClass'
            onClick={() => navigate('/about')}
          >
            Our Story
          </li>
          <li
            className='liClass'
            onClick={() => navigate('/location')}
          >
            Location
          </li>
        </ul>
        {/* <div className='footer-bottom-box'> */}
        <ContactUs />
        <Follows />
        {/* </div> */}
        </div>
        <div className='footer-bottom'>
          <p>© 2022 SAVILLA, Inc. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  )
}

export default Footer
