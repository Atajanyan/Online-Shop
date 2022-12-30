import React from 'react'
import { useNavigate } from 'react-router'
import { useAppSelector } from '../../app/hooks'
import { ReactComponent as MastercardLogo } from '../../assets/mastercardLogo.svg'
import { ReactComponent as VisaLogo } from '../../assets/Visa_Inc.-Logo.wine.svg'
import { ReactComponent as MaestroLogo } from '../../assets/Maestro_icon-icons.com_60542.svg'
import { ReactComponent as AmericanExpressLogo } from '../../assets/americanExpressLogo.svg'
import { ICartSummaryProps } from './types'


const CartSummary: React.FC<ICartSummaryProps> = ({submitFunction, submitButtonName}) => {
    
    const currentUser = useAppSelector((state) => state.currentUser.currentUser)
    const localSubtotal = useAppSelector((state) => state.cartItems.subtotal)
  const userCartSubtotal = useAppSelector((state) => state.currentUser.userCartSubTotal)
  const subtotal = currentUser ? userCartSubtotal : localSubtotal

  

  return (
    <div className='cart-summary'>
      <h3>order summary</h3>
      <div className='summary-container'>
        <div>
          Discount
          <span className='apply-discount'>Apply discount</span>
        </div>
        <div>
          Delivery
          <span>FREE</span>
        </div>
        <div className='summary-subtotal'>
          Subtotal:
          <span>${subtotal.toLocaleString()}</span>
        </div>
      </div>
      <div className='checkout'>
        <button className='checkout-btn' onClick={submitFunction}>{`${submitButtonName}`}</button>
      </div>
      <div className='accepted-payments-container'>
        <span>We accept</span>
        <div className='accepted-payments'>
          <ul>
            <li>
              <span>
                <VisaLogo
                  width={50}
                  height={50}
                  title='Visa'
                />
              </span>
            </li>
            <li>
              <span>
                <MastercardLogo
                  width={50}
                  height={50}
                  title='Mastercard'
                />
              </span>
            </li>
            <li>
            <span>
                <MaestroLogo
                  width={50}
                  height={50}
                  title='Maestro'
                />
              </span>
            </li>
            <li>
            <span>
                <AmericanExpressLogo
                  width={50}
                  height={50}
                  title='American Express'
                />
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default CartSummary