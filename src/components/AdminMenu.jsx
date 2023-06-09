import React from 'react'
import { Link } from 'react-router-dom'

const AdminMenu = () => {
    return (
        <div className='fixed top-20 left-20'>
            <Link to='/dashboard/admin/profile' className='mb-4 bg-slate-500 text-white'><div>Profile</div></Link>
            <Link to='/dashboard/admin/create-product' className='mb-4 bg-slate-500 text-white' ><div>Create Product</div></Link>
        </div>
    )
}

export default AdminMenu