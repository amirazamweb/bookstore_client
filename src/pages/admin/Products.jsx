import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import AdminMenu from '../../components/AdminMenu';
import loadingImg from '../../images/loading.gif'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Products = () => {
    const [productsList, setProductList] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // get all products
    const getAllProducts = async () => {
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

    // changeHandler
    const changeHandler = async (e, slug) => {
        if (e.target.value === 'edit') {
            navigate(`/dashboard/admin/update-product/${slug}`);
            window.scrollTo(0, 0);
        }
        else if (e.target.value === 'delete') {
            const isConfirm = window.confirm('Are you sure want to delete the product?');
            if (!isConfirm) return;
            const { data } = await axios.delete(`${process.env.REACT_APP_SERVER_DOMAIN}/api/v1/product/delete/${slug}`);
            if (data?.success) {
                toast.success('Product deleted sucessfully');
                getAllProducts();
            }
        }
    }

    // useEffect
    useEffect(() => {
        getAllProducts()
    }, [productsList.length]);

    return (
        <Layout title={'Products Admin - Book Store'}>
            <div>
                {loading ?
                    (<div className='w-1/5 m-auto py-32'>
                        <img src={loadingImg} alt="loading img" className='w-full' />
                    </div>) :
                    (
                        <div className='bg-slate-200 py-6'>
                            <h2 className='text-2xl text-slate-500 font-semibold text-center mb-4'>All Products</h2>
                            <table className='w-3/5 m-auto border-2 border-solid border-slate-500 mb-6 bg-white'>
                                <thead className='text-slate-600'>
                                    <tr>
                                        <th className='border-2 border-solid border-slate-500' style={{ width: '10%' }}>#</th>
                                        <th className='border-2 border-solid border-slate-500' style={{ width: '35%' }}>Name</th>
                                        <th className='border-2 border-solid border-slate-500' style={{ width: '25%' }}>Author</th>
                                        <th className='border-2 border-solid border-slate-500' style={{ width: '10%' }}>Price</th>
                                        <th className='border-2 border-solid border-slate-500' style={{ width: '10%' }}>Quantity</th>
                                        <th className='border-2 border-solid border-slate-500' style={{ width: '10%' }}>Update</th>
                                    </tr>
                                </thead>
                                <tbody className='text-slate-600'>
                                    {productsList?.map((p, i) => (
                                        <tr>
                                            <td className='text-center p-1' style={{ border: '1px solid gray' }}>{i + 1}</td>
                                            <td className='p-1' style={{ border: '1px solid gray' }}>
                                                {p.name.length < 36 ? p.name : `${p.name.substring(0, 32)}....`}
                                            </td>
                                            <td className='p-1' style={{ border: '1px solid gray' }}>
                                                {p.author.length < 26 ? p.author : `${p.author.substring(0, 22)}....`}
                                            </td>
                                            <td className='text-center p-1' style={{ border: '1px solid gray' }}>&#8377;{p.price}</td>
                                            <td className='text-center p-1' style={{ border: '1px solid gray' }}>{p.quantity}</td>
                                            <td className='text-center p-1' style={{ border: '1px solid gray' }}>
                                                <select className='cursor-pointer text-sm appearance-none w-full text-center' onChange={(e) => changeHandler(e, p.productSlug)}>
                                                    <option value='edit' selected disabled>select one</option>
                                                    <option value='edit'>edit</option>
                                                    <option value='delete'>delete</option>
                                                </select>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                {/* Admin Menu */}
                <AdminMenu idf={'products'} />
            </div>
        </Layout>
    )
}

export default Products