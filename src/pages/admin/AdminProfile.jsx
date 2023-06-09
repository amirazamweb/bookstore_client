import React from 'react'
import Layout from '../../components/Layout/Layout'
import { useAuth } from '../../context/auth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import AdminMenu from '../../components/AdminMenu';

const AdminProfile = () => {
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();

    // logout handler
    const logoutHandler = () => {
        toast.success('Logout Successfully');
        setAuth({ ...auth, user: null, token: '' });
        localStorage.removeItem('bookstore_auth');
        setTimeout(() => navigate('/login'), 0);
    }

    return (
        <Layout title={'Profile Admin - Book Store'}>
            <div className='w-1/2 m-auto my-6 flex items-center gap-20'>
                <div className='w-1/2 bg-slate-500'>
                    <img
                        src={`${process.env.REACT_APP_SERVER_DOMAIN}/api/v1/auth//profile-image/${auth.user?._id}`}
                        alt="admin-profile"
                        className='w-full h-auto rounded' />
                </div>
                <div>
                    <h1
                        className='text-slate-600 text-2xl font-bold'>Admin:&nbsp;
                        <span className='text-slate-500 font-semibold'>{`${auth.user?.fname} ${auth.user?.lname}`}</span></h1>
                    <p className='my-2'>Email: <span>{auth.user?.email}</span></p>
                    <button
                        className='bg-red-500 text-white px-2 py-1 rounded'
                        onClick={logoutHandler}>Logout</button>
                </div>
                {/* admin menu */}
                <AdminMenu />
            </div>
        </Layout>
    )
}

export default AdminProfile