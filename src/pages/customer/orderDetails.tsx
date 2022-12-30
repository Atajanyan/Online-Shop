import React, {useEffect, useState} from 'react'
import {FiCopy} from 'react-icons/fi'
import { toast } from 'react-toastify'
import {AiOutlineCheckCircle} from 'react-icons/ai'
import { useParams } from 'react-router'
import { getOrderByNumber } from '../../firebase/auth'
import { ICustomerOrder } from '../../features/slices/types'


const OrderDetails = () => {
    const {number} = useParams()
    const [order, setOrder] = useState<ICustomerOrder>()
    useEffect(() => {
       
        
        if(number) {
            console.log('use effect');
          getOrderByNumber(+number).then(order => {
            console.log(order, 'order');
            setOrder(order)
          })
          .catch(err => {
            console.log(err);
            
          })
        }
    }, [])
    const handleCopyNumber = () => {
        window.navigator.clipboard.writeText(number as string).then(() => {
            toast.success('Order number copied')
        }).catch((err) => {
            toast.error(err)
        })
    }
  return (
    <div>
        <h2>Order Details</h2>
        <div className='order-details-wrapper'>
            <div className='order-number-date-container'>
                <div>
                    <h4>Order number <FiCopy cursor='pointer' onClick={handleCopyNumber} /></h4>
                    <span className='order-number'>{number}</span>
                </div>
                <div>
                    <h4>Order date</h4>
                    <span>{order?.date}</span>
                </div>
            </div>
            <div className='order-details-container'>
                <div className='order-status-container'>
                    <h4>Delivery Method:</h4><span>Standard delivery</span>
                    <ul className='order-timeline'>
                        <li>
                          <div className='timeline-icon'>
                          <span><AiOutlineCheckCircle /></span>
                          </div>
                          <div className='timeline-content-wrapper'>
                            <div>
                                <h4 className='order-timeline-item-title'>Order received</h4>
                                <p>Great! We&apos;ve got your order.</p>
                            </div>
                            <span className='order-timeline-date'>{order?.date}</span>
                          </div>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    </div>
  )
}

export default OrderDetails