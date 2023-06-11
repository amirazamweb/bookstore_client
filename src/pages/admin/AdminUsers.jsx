import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/AdminMenu'

const AdminUsers = () => {
    return (
        <Layout title={'All Users - Book Store'}>
            <div>
                <h2 className='text-center py-32'>Admin Users</h2>
                <AdminMenu idf={'users'} />
            </div>
        </Layout>
    )
}

export default AdminUsers