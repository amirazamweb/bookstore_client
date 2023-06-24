import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/AdminMenu';
import axios from 'axios';
import { Select } from 'antd';
import { Option } from 'antd/es/mentions';
import moment from 'moment';
import toast from 'react-hot-toast';
import loadingImg from '../../images/loading.gif';

const AdminOrders = () => {
    const [allOrders, setAllOrders] = useState([]);
    const orderStatus = ['Not Process', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
    const [loading, setLoading] = useState(true);

    // getting all orders
    const getAllOrders = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/api/v1/product/all-orders/`)
            setAllOrders(data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    // upadating order status
    const updateOrderStatus = async (status, id) => {
        try {
            const { data } = await axios.put(`${process.env.REACT_APP_SERVER_DOMAIN}/api/v1/product/update-order/${id}`, {
                status
            })
            getAllOrders();
            toast.success('Order status updated successfully')
        } catch (error) {
            console.log(error);
        }
    }

    // useEffect
    useEffect(() => {
        getAllOrders();
    }, [])
    return (
        <Layout title={'All Orders - Book Store'}>
            <div>
                {loading ? (
                    <div className='w-1/5 m-auto py-32'>
                        <img src={loadingImg} alt="loading img" className='w-full' />
                    </div>
                ) :
                    (
                        <div className='py-6 bg-slate-200'>
                            <h2 className='text-2xl text-slate-600 font-semibold text-center mb-4'>Admin Orders</h2>
                            {allOrders?.map((o, i) => (
                                <>
                                    <table className='m-auto' style={{ width: '65%' }}>
                                        <thead className='text-slate-600'>
                                            <th style={{ width: '7%', border: '1px solid gray' }}>#</th>
                                            <th style={{ width: '20%', border: '1px solid gray' }}>Order Id</th>
                                            <th style={{ width: '20%', border: '1px solid gray' }}>Status</th>
                                            <th style={{ width: '20%', border: '1px solid gray' }}>Buyer</th>
                                            <th style={{ width: '13%', border: '1px solid gray' }}>Date</th>
                                            <th style={{ width: '10%', border: '1px solid gray' }}>Payment</th>
                                            <th style={{ width: '10%', border: '1px solid gray' }}>Quantity</th>
                                        </thead>
                                        <tbody>
                                            <tr className='text-center text-slate-600'>
                                                <td className='px-2' style={{ border: '1px solid gray' }}>{++i}</td>
                                                <td className='px-2' style={{ border: '1px solid gray' }}>{o._id.slice(-10)}</td>
                                                <td className='px-2' style={{ border: '1px solid gray' }}>
                                                    <Select bordered={false}
                                                        defaultValue={o?.status}
                                                        onChange={(status) => updateOrderStatus(status, o?._id)}>
                                                        {orderStatus?.map((s) => (
                                                            <Option value={s}>{s}</Option>
                                                        ))}
                                                    </Select>
                                                </td>
                                                <td className='px-2' style={{ border: '1px solid gray' }}>{`${o?.buyer?.fname} ${o?.buyer?.lname}`}</td>
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
                <AdminMenu idf={'orders'} />
            </div>
        </Layout>
    )
}

export default AdminOrders