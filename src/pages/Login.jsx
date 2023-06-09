import React, { useState } from 'react'
import Layout from '../components/Layout/Layout'
import loginAnimation from '../images/login-animation.gif';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/auth';

const Login = () => {
    const [userData, setUserData] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const [auth, setAuth] = useAuth();

    // login Handler
    const loginHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/api/v1/auth/login`, userData);
            if (data?.success) {
                setUserData({ ...userData, email: '', password: '' });
                toast.success(data?.message);
                setAuth({ ...auth, user: data?.user, token: data?.token });
                localStorage.setItem('bookstore_auth', JSON.stringify(data));
                if (data?.user.role === 1) {
                    setTimeout(() => navigate('/dashboard/admin/profile'), 0);
                }
                else {
                    setTimeout(() => navigate('/'), 0);
                }
            }
            else {
                toast.error(data?.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong')
        }
    }
    return (
        <Layout title={'Login - Book Store'}>
            <div className='w-full bg-slate-200 md:pt-24 h-screen'>
                <div className='max-w-sm m-auto px-7 py-3 flex flex-col items-center bg-white rounded'>
                    <div className='w-16 md:w-20 rounded-full drop-shadow-md shadow-md overflow-hidden'>
                        <img src={loginAnimation} alt="login-image" className='w-full' />
                    </div>
                    <form action="" className='mt-2' onSubmit={loginHandler}>

                        <label htmlFor="email">Email</label>
                        <input type="email" id='email'
                            className='w-full px-2 py-1 my-1 bg-slate-200 rounded focus-within:outline-slate-300'
                            required onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                            value={userData.email} />

                        <label htmlFor="password">Password</label>
                        <input type="password" id='password'
                            className='w-full px-2 py-1 my-1 bg-slate-200 rounded focus-within:outline-slate-300'
                            required onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                            value={userData.password} />

                        <input type="submit" value='Login'
                            className='w-full px-2 py-1 my-3 bg-red-400 hover:bg-red-500 rounded text-white cursor-pointer' />
                    </form>
                    <p className='text-sm'>Don't have an account? <Link to='/signup' className='text-red-500'>Sign up</Link></p>
                </div>
            </div>
        </Layout>
    )
}

export default Login