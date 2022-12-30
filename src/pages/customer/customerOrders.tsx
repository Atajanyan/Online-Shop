import React from 'react'
import {MdOutlineKeyboardArrowRight} from 'react-icons/md'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'

const CustomerOrders = () => {
    const currentUserOrders = useAppSelector(state => state.currentUser.orders)
    // const orders = [
    //     {
    //         number: 12334,
    //         status: 'Delivered',
    //         date: new Date(),
    //         subtotal: 100,
    //         items: [{
    //             product: {id: '1',imageUrls: ['https://assets.pbimgs.com/pbimgs/rk/images/dp/wcm/202239/0089/faux-frosted-christmas-tree-xl.jpg'], title: 'Christmas Tree'},
    //             qty: 1
    //         }]
    //     }
    // ]
    console.log(currentUserOrders, 'current u o');
    
  return (
    <div className='customer-orders-page'>
        <h2>My Purchases</h2>
        <div className='customer-orders-container'>
           {
            currentUserOrders ?
            currentUserOrders.map(order => {
                return (
                   <Link to={`/account/orders/purchase/${order.orderNumber}`} key={order.orderNumber}>
                     <div  className='customer-order'>
                         <h3>{order.status}</h3>
                         <div className='qty-date-subtotal'>
                         <span>{order.items.length} {order.items.length > 1 ? 'items' : 'item'}</span>
                             <span>{order.date}</span>
                             <span>${order.subtotal.toLocaleString()}</span>
                         </div>
                         <div className='items-arrow'>
                             <div className='customer-orders-items'>
                                 {order.items.map(item => {
                                     return (
                                         <div key={item.product.id} className='customer-order-item'>
                                             <img src={item.product.imageUrls[0]} alt="product" />
                                         </div>
                                     )
                                 })}
                             </div>
                             <span>
                                 <MdOutlineKeyboardArrowRight />
                             </span>
                         </div>
                     </div>
                   </Link>
                )
            })
            :
            <p>Hmm.. Looks like you haven&apos;t placed any orders yet.</p>
           }
        </div>
    </div>
  )
}

export default CustomerOrders