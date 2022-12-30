import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { placeOrder } from '../../features/slices/ordersSlice'
import { IAddressInfo } from '../../features/slices/types'
import { deleteUserCart } from '../../firebase/auth'
import CardForm from './cardForm'
import CartSummary from './cartSummary'
import { ICardForm } from './types'

const Checkout = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const currentUser = useAppSelector(state => state.currentUser.currentUser)
//   const ordersStatus = useAppSelector(state => state.customerOrders.status)

  interface IAddressForm {
    fullName: string;
    address: string;
    apt: string;
    city: string;
    zip: string;
    phone: string
  }

  const [shippingAddressInfo, setShippingAddressInfo] = useState<IAddressForm>({
    fullName: '',
    address: '',
    apt: '',
    city: '',
    zip: '',
    phone: '',
  })
  const [billingAddressInfo, setBillingAddressInfo] = useState<IAddressForm>({
    fullName: '',
    address: '',
    apt: '',
    city: '',
    zip: '',
    phone: '',
  })
  const [isSameAddress, setIsSameAddress] = useState(true)


  const areInputsFilled = () => {
    const isShippingFormFilled = Object.values(shippingAddressInfo).every(field => field.trim().length > 0)
    const isBillingFormFilled = isSameAddress ? true : Object.values(billingAddressInfo).every(field => field.trim().length > 0)
    // const isCardFormFilled = Object.keys(cardInfo).every(field => field.trim().length > 0)
    return isShippingFormFilled && isBillingFormFilled
  }

  const handleCompletePurchase = () => {
    if(areInputsFilled()) {
        let billingInfo
        const shippingInfo: IAddressInfo = {
            fullName: shippingAddressInfo.fullName,
            address: shippingAddressInfo.address,
            apt: shippingAddressInfo.apt,
            city: shippingAddressInfo.city,
            zip: +shippingAddressInfo.zip,
            phone: +shippingAddressInfo.phone
        }
        if(isSameAddress) {
       billingInfo = shippingInfo
        } else {
            billingInfo = {
                fullName: billingAddressInfo.fullName,
                address: billingAddressInfo.address,
                apt: billingAddressInfo.apt,
                city: billingAddressInfo.city,
                zip: +billingAddressInfo.zip,
                phone: +billingAddressInfo.phone
            }
        }
        dispatch(placeOrder({shippingInfo, billingInfo}))
        navigate('/checkout/success')
      if(currentUser) {
        deleteUserCart(currentUser?.uid).then(() => {
          console.log('cart cleared');
        })
      }
    } else {
        toast.error('Please fill out the form')
    }
   
  }
  

  const formInputs = [
    {
      type: 'text',
      placeholder: 'Full Name',
      value: 'fullName',
    },
    {
      type: 'text',
      placeholder: 'Address',
      value: 'address',
    },
    {
      type: 'text',
      placeholder: 'Apt, Suite, Building',
      value: 'apt',
    },
    {
      type: 'text',
      placeholder: 'City',
      value: 'city',
    },
    {
      type: 'text',
      placeholder: 'ZIP',
      value: 'zip',
    },
    {
      type: 'tel',
      placeholder: 'Phone',
      value: 'phone',
    },
  ]

  return (
    <div className='checkout-page'>
      <div className='form'>
        <div className='checkout-form-container'>
          <div className='shipping-form'>
            <h3>Shipping Information</h3>

            {formInputs.map((field) => {
              return (
                <input
                  required
                  key={field.value}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={shippingAddressInfo[field.value as keyof typeof shippingAddressInfo]}
                  onChange={(e) =>
                    setShippingAddressInfo((prev) => {
                      return { ...prev, [field.value]: e.target.value }
                    })
                  }
                />
              )
            })}
            <p>
              <input
                type='checkbox'
                checked={isSameAddress}
                onChange={() => {
                  setIsSameAddress(!isSameAddress)
                }}
              />
              Use this address as my billing information
            </p>
          </div>
          {isSameAddress || (
            <div className='billing-form'>
              <h3>Billing Information</h3>
              {formInputs.map((field) => {
              return (
                <input
                  required
                  key={field.value}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={billingAddressInfo[field.value as keyof typeof billingAddressInfo]}
                  onChange={(e) =>
                    setBillingAddressInfo((prev) => {
                      return { ...prev, [field.value]: e.target.value }
                    })
                  }
                />
              )
            })}
            </div>
          )}
          <h3>Credit Card Information</h3>
          <CardForm />
        </div>
        <div className='order-summary-wrapper'>
          <CartSummary
            submitFunction={handleCompletePurchase}
            submitButtonName='complete purchase'
          />
        </div>
      </div>
    </div>
  )
}

export default Checkout
