import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/UserMenu';
import loadingImg from '../../images/loading.gif';
import moment from 'moment'
import { useAuth } from '../../context/auth';
import axios from 'axios';

const Orders = () => {
    const [userOrders, setUserOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [auth] = useAuth();

    // getting orders
    const getOrders = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/api/v1/product/single-order/${auth.user?._id}`)
            setUserOrders(data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    // useEffect
    useEffect(() => {
        getOrders();
    }, [])
    return (
        <Layout title={'Orders'}>
            <div>
                {loading ? (
                    <div className='w-1/5 m-auto py-32'>
                        <img src={loadingImg} alt="loading img" className='w-full' />
                    </div>
                ) :
                    (
                        <div className='py-6 bg-slate-200'>
                            <h2 className='text-2xl text-slate-600 font-semibold text-center mb-4'>Admin Orders</h2>
                            {userOrders?.map((o, i) => (
                                <>
                                    <table className='m-auto' style={{ width: '65%' }}>
                                        <thead className='text-slate-600'>
                                            <th style={{ width: '10%', border: '1px solid gray' }}>#</th>
                                            <th style={{ width: '20%', border: '1px solid gray' }}>Order Id</th>
                                            <th style={{ width: '20%', border: '1px solid gray' }}>Status</th>
                                            <th style={{ width: '20%', border: '1px solid gray' }}>Date</th>
                                            <th style={{ width: '15%', border: '1px solid gray' }}>Payment</th>
                                            <th style={{ width: '15%', border: '1px solid gray' }}>Quantity</th>
                                        </thead>
                                        <tbody>
                                            <tr className='text-center text-slate-600'>
                                                <td className='px-2' style={{ border: '1px solid gray' }}>{++i}</td>
                                                <td className='px-2' style={{ border: '1px solid gray' }}>{o._id.slice(-10)}</td>
                                                <td className='px-2' style={{ border: '1px solid gray' }}>{o?.status}</td>
                                                <td className='px-2' style={{ border: '1px solid gray' }}>{moment(o?.createdAt).fromNow()}</td>
                                                <td className='px-2' style={{ border: '1px solid gray' }}>{o?.payment?.success ? 'Success' : 'Failed'}</td>
                                                <td className='px-2' style={{ border: '1px solid gray' }}>{o?.products?.length}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className='m-auto' style={{ width: '65%' }}>
                                        {o?.products?.map((p) => (
                                            <div className='flex my-1 items-center' style={{ border: '1px solid gray' }}>
                                                <div className='w-1/5'>
                                                    <img
                                                        src={`${process.env.REACT_APP_SERVER_DOMAIN}/api/v1/product/photo/${p._id}`}
                                                        alt="produc-img" />
                                                </div>
                                                <div className='w-2/3'>
                                                    <div className='w-2/3 m-auto'>
                                                        <h3 className='font-semibold text-sky-600'>{p.name}</h3>
                                                        <h3 className='my-1'>Author: {p.author}</h3>
                                                        <p>Price: &#8377;{p.price}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ))}
                        </div>
                    )}
                <UserMenu idf={'orders'} />
            </div>
        </Layout>
    )
}

export default Orders