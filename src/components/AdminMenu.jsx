import React from 'react'
import { Link } from 'react-router-dom'

const AdminMenu = ({ idf }) => {
    return (
        <div className='fixed top-28 left-20'>
            <Link to='/dashboard/admin/profile' >
                <div className={`mb-4 text-white px-2 py-1 text-sm ${idf === 'profile' ? 'bg-sky-500' : 'bg-slate-500'}`}>Profile</div>
            </Link>

            <Link to='/dashboard/admin/create-product'>
                <div className={`mb-4 text-white px-2 py-1 text-sm ${idf === 'create' ? 'bg-sky-500' : 'bg-slate-500'}`}>Create Product</div>
            </Link>

            <Link to='/dashboard/admin/products'>
                <div className={`mb-4 text-white px-2 py-1 text-sm ${idf === 'products' ? 'bg-sky-500' : 'bg-slate-500'}`}>Products</div>
            </Link>
        </div>
    )
}

export default AdminMenu