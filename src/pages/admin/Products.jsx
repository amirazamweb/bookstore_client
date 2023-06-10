import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import AdminMenu from '../../components/AdminMenu';
import loadingImg from '../../images/loading.gif'
import { FaLessThanEqual } from 'react-icons/fa';

const Products = () => {
    const [productsList, setProductList] = useState([]);
    const [loading, setLoading] = useState(true);

    // get all products
    const getAllProducts = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/api/v1/product/all`);
            if (data?.success) {
                setProductList(data?.products);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    // useEffect
    useEffect(() => {
        getAllProducts()
    }, [])

    return (
        <Layout title={'Products Admin - Book Store'}>
            <div>
                {loading ?
                    (<div className='w-1/5 m-auto py-32'>
                        <img src={loadingImg} alt="loading img" className='w-full' />
                    </div>) :
                    (
                        <>
                            <h2 className='text-2xl text-slate-500 font-semibold text-center my-6'>All Products</h2>
                            <table className='w-3/5 m-auto border-2 border-solid border-slate-500 mb-6'>
                                <thead>
                                    <tr>
                                        <th className='border-2 border-solid border-slate-500' style={{ width: '10%' }}>#</th>
                                        <th className='border-2 border-solid border-slate-500' style={{ width: '35%' }}>Name</th>
                                        <th className='border-2 border-solid border-slate-500' style={{ width: '25%' }}>Author</th>
                                        <th className='border-2 border-solid border-slate-500' style={{ width: '10%' }}>Price</th>
                                        <th className='border-2 border-solid border-slate-500' style={{ width: '10%' }}>Quantity</th>
                                        <th className='border-2 border-solid border-slate-500' style={{ width: '10%' }}>Update</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productsList?.map((p, i) => (
                                        <tr>
                                            <td className='text-center p-1' style={{ border: '1px solid gray' }}>{i + 1}</td>
                                            <td className='p-1' style={{ border: '1px solid gray' }}>
                                                {p.name.length < 37 ? p.name : `${p.name.substring(0, 33)}....`}
                                            </td>
                                            <td className='p-1' style={{ border: '1px solid gray' }}>
                                                {p.author.length < 26 ? p.author : `${p.author.substring(0, 22)}....`}
                                            </td>
                                            <td className='text-center p-1' style={{ border: '1px solid gray' }}>&#8377;{p.price}</td>
                                            <td className='text-center p-1' style={{ border: '1px solid gray' }}>{p.quantity}</td>
                                            <td className='text-center p-1' style={{ border: '1px solid gray' }}>
                                                <select className='cursor-pointer appearance-none w-full text-center'>
                                                    <option>edit</option>
                                                    <option>delete</option>
                                                </select>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    )}
                {/* Admin Menu */}
                <AdminMenu idf={'products'} />
            </div>
        </Layout>
    )
}

export default Products