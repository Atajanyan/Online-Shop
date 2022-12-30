import React from 'react'
import { useAppSelector } from '../../app/hooks'


const CustomerSettings = () => {
    const currentUser = useAppSelector(state => state.currentUser.currentUser)

    const settingsItems = [
        {
            title: 'Name',
            content: currentUser?.name
        },
        {
            title: 'Email Address',
            content: currentUser?.email
        },
        {
            title: 'Password',
            content: 'Change password'
        },
    ]
  return (
    <div className='customer-settings-page'>
        <h2>Settings</h2>
        <div className='customer-settings-container'>
           {
            settingsItems.map(item => {
                return (
                    <div key={item.title} className='customer-settings-item'>
                    <div>
                        <span className='customer-settings-item-title'>{item.title}</span>
                        <span>{item.content}</span>
                    </div>
                    <button>Edit</button>
                </div>
                )
            })
           }
        </div>
        {/* <div className='update-profile-form'>
            <form>
           <div>
             <label htmlFor="name">Name</label>
             <input type="text" id='name'  />
           </div>
           <div>
            <label htmlFor="email">Email Address</label>
            <input type="text" id='email' />
           </div>
           <div>
            <label htmlFor="currentPassword">Current Password</label>
            <input type="text" id='currentPassword' />
           </div>
           <div>
            <label htmlFor="newPassword">New Password</label>
            <input type="text" id='newPassword'/>
           </div>
           <div>
            <label htmlFor="confirmNewPassword">Confirm New Password</label>
            <input type="text" id='confirmNewPassword'/>
           </div>
            </form>
        </div> */}
    </div>
  )
}

export default CustomerSettings