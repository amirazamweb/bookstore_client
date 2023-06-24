import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import AdminMenu from '../../components/AdminMenu';
import loadingImg from '../../images/loading.gif';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/auth';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [auth] = useAuth();

    // get all products
    const getAllUsers = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/api/v1/auth/all-users/${auth.user?._id}`);
            if (data?.success) {
                setUsers(data?.users);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    // useEffect
    useEffect(() => {
        getAllUsers()
    }, [users.length]);


    // role handler
    const roleHandler = async (e, existingRole, userId) => {
        if (e.target.value === existingRole) {
            return
        }
        const confirm = window.confirm('Are you sure want to update the user?');
        if (!confirm) return;
        try {
            const { data } = await axios.put(`${process.env.REACT_APP_SERVER_DOMAIN}/api/v1/auth/update/${userId}`, { role: e.target.value });
            if (data?.success) {
                toast.success('User upadated successfully');
                getAllUsers();
            }
        } catch (error) {
            console.log(error);

        }
    }

    return (
        <Layout title={'Products Admin - Book Store'}>
            <div>
                {loading ?
                    (<div className='w-1/5 m-auto py-32'>
                        <img src={loadingImg} alt="loading img" className='w-full' />
                    </div>) :
                    (
                        <div className='bg-slate-200 py-6'>
                            <h2 className='text-2xl text-slate-500 font-semibold text-center mb-4'>All Users</h2>
                            <table className='w-3/5 m-auto border-2 border-solid border-slate-500 mb-6 bg-white'>
                                <thead className='text-slate-600'>
                                    <tr>
                                        <th className='border-2 border-solid border-slate-500' style={{ width: '10%' }}>#</th>
                                        <th className='border-2 border-solid border-slate-500' style={{ width: '20%' }}>First Name</th>
                                        <th className='border-2 border-solid border-slate-500' style={{ width: '20%' }}>Last Name</th>
                                        <th className='border-2 border-solid border-slate-500' style={{ width: '35%' }}>Email</th>
                                        <th className='border-2 border-solid border-slate-500' style={{ width: '15%' }}>Role</th>
                                    </tr>
                                </thead>
                                <tbody className='text-slate-600'>
                                    {users.map((user, i) => (
                                        <tr>
                                            <td className='text-center px-2' style={{ border: '1px solid gray' }}>{i + 1}</td>
                                            <td className='px-2' style={{ border: '1px solid gray' }}>
                                                {user.fname}
                                            </td>
                                            <td className='px-2' style={{ border: '1px solid gray' }}>
                                                {user.lname}
                                            </td>
                                            <td className='px-2' style={{ border: '1px solid gray' }}>{user.email}</td>
                                            <td className='text-center p-1' style={{ border: '1px solid gray' }}>
                                                <select name="" id="" value={user.role} className='w-4/5 text-center cursor-pointer appearance-none' onChange={(e) => roleHandler(e, user.role, user._id)}>
                                                    <option value="1">Admin</option>
                                                    <option value="0">User</option>
                                                </select>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                {/* Admin Menu */}
                <AdminMenu idf={'users'} />
            </div>
        </Layout>
    )
}

export default AdminUsers;