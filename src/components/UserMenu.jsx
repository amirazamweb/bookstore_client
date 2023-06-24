import React from 'react'
import { Link } from 'react-router-dom'

const UserMenu = ({ idf }) => {
    return (
        <div className='fixed top-28 left-10'>
            <Link to='/dashboard/user/profile' >
                <div className={`mb-4 text-white px-2 py-1 text-sm ${idf === 'profile' ? 'bg-sky-500' : 'bg-slate-500'}`}>Profile</div>
            </Link>

            <Link to='/dashboard/user/orders'>
                <div className={`mb-4 text-white px-2 py-1 text-sm ${idf === 'orders' ? 'bg-sky-500' : 'bg-slate-500'}`}>Orders</div>
            </Link>
        </div>
    )
}

export default UserMenu