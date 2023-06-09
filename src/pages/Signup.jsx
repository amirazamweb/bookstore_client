import React, { useState } from 'react'
import Layout from '../components/Layout/Layout';
import loginAnimation from '../images/login-animation.gif';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Signup = () => {
    const [userData, setUserData] = useState({
        fname: '',
        lname: '',
        email: '',
        password: '',
        confirmPassword: '',
        profileImg: ''
    })

    const navigate = useNavigate();

    // signup Handler
    const signupHandler = async (e) => {
        e.preventDefault();
        try {
            if (userData.password === userData.confirmPassword && userData.profileImg) {
                let formData = new FormData();
                formData.append('fname', userData.fname);
                formData.append('lname', userData.lname);
                formData.append('email', userData.email);
                formData.append('password', userData.password);
                formData.append('profileImg', userData.profileImg);
                const { data } = await axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/api/v1/auth/signup`, formData);
                console.log(data);
                if (data?.success) {
                    setUserData({ ...userData, fname: '', lname: '', email: '', password: '', confirmPassword: '', profileImg: '' })
                    toast.success(data?.message);
                    setTimeout(() => { navigate('/login') }, 0)
                }
                else {
                    toast.error(data?.message);
                }
            }
            else if (userData.password !== userData.confirmPassword) {
                toast.error('Confirm password not matched');
            }
            else if (!userData.profileImg) {
                toast.error('Profile image is required');
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    }

    const handleUploadProfileImage = (e) => {
        setUserData({ ...userData, profileImg: e.target.files[0] });
    }
    return (
        <Layout title={'Signup - Book Store'}>
            <div className='w-full bg-slate-200 md:py-11 h-screen'>
                <div className='max-w-sm m-auto px-7 py-3 flex flex-col items-center bg-white rounded'>
                    <div className='w-16 md:w-16 h-16 rounded-full drop-shadow-md shadow-md overflow-hidden relative'>
                        <img src={userData.profileImg ? URL.createObjectURL(userData.profileImg) : loginAnimation} alt="login-image" className='w-full h-full' />
                        <label htmlFor="profileImage">
                            <div className='absolute bottom-0 h-1/3 w-full bg-slate-600 text-center text-xs cursor-pointer bg-opacity-70 text-white'>Upload</div>
                            <input type="file" id='profileImage' accept='image/*' hidden onChange={handleUploadProfileImage} />
                        </label>
                    </div>
                    <form action="" className='mt-2' onSubmit={signupHandler}>
                        <label htmlFor="firstname">First Name</label>
                        <input type="text" id='firstname' className='w-full px-2 py-1 my-1 bg-slate-200 rounded focus-within:outline-slate-300' required onChange={(e) => setUserData({ ...userData, fname: e.target.value })} value={userData.fname} />

                        <label htmlFor="lastname">Last Name</label>
                        <input type="text" id='lastname' className='w-full px-2 py-1 my-1 bg-slate-200 rounded focus-within:outline-slate-300' required onChange={(e) => setUserData({ ...userData, lname: e.target.value })} value={userData.lname} />

                        <label htmlFor="email">Email</label>
                        <input type="email" id='email' className='w-full px-2 py-1 my-1 bg-slate-200 rounded focus-within:outline-slate-300' required onChange={(e) => setUserData({ ...userData, email: e.target.value })} value={userData.email} />

                        <label htmlFor="password">Password</label>
                        <input type="password" id='password' className='w-full px-2 py-1 my-1 bg-slate-200 rounded focus-within:outline-slate-300' required onChange={(e) => setUserData({ ...userData, password: e.target.value })} value={userData.password} />

                        <label htmlFor="confirm-password">Confirm Password</label>
                        <input type="password" id='confirm-password' className='w-full px-2 py-1 my-1 bg-slate-200 rounded focus-within:outline-slate-300' required onChange={(e) => setUserData({ ...userData, confirmPassword: e.target.value })} value={userData.confirmPassword} />

                        <input type="submit" value='Sign up' className='w-full px-2 py-1 my-3 bg-red-400 hover:bg-red-500 rounded text-white cursor-pointer' />
                    </form>
                    <p className='text-sm'>Already have an account? <Link to='/login' className='text-red-500'>Login</Link></p>
                </div>
            </div>
        </Layout>
    )
}

export default Signup