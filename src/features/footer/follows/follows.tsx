import React from 'react'
import { FaFacebook, FaYoutube, FaInstagram } from 'react-icons/fa'

import Subscribe from '../subscribe/subscribe'

const Follows: React.FC = () => {
  return (
    <ul className='footer-column'>
      <h3>Subscribe and stay notified</h3>
      <Subscribe />
      <li>
        <div className='social-icons'>
          <h3>Follow Us</h3>
          <ul>
            <li>
              <a href='https://www.facebook.com/lacasa.homeluxury/' target='_blank' rel='noopener noreferrer'>
                <i className='media-icon'>
                  <FaFacebook />
                </i>
              </a>
            </li>
            <li>
              <a href='https://www.instagram.com/la.casa.decor/' target='_blank' rel='noopener noreferrer'>
                <i className='media-icon'>
                  <FaInstagram />
                </i>
              </a>
            </li>
            <li>
              <a href='https://youtu.be/1q_dtXbFaZE' target='_blank' rel='noopener noreferrer'>
                <i className='media-icon'>
                  <FaYoutube />
                </i>
              </a>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  )
}

export default Follows
