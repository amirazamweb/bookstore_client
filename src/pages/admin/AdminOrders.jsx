import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/AdminMenu'

const AdminOrders = () => {
    return (
        <Layout title={'All Orders - Book Store'}>
            <div>
                <h2 className='text-center py-32'>Admin Orders</h2>
                <AdminMenu idf={'orders'} />
            </div>
        </Layout>
    )
}

export default AdminOrders