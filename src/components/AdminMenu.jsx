import React from 'react'
import { Link } from 'react-router-dom'

const AdminMenu = () => {
    return (
        <div className='fixed top-20 left-20'>
            <Link to='/dashboard/admin/profile'><div>Profile</div></Link>
            <Link to='/dashboard/admin/create-product'><div>Create Product</div></Link>
        </div>
    )
}

export default AdminMenu