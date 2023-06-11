import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout';
import bookAnimation from '../../images/book-animation.gif';
import { Select } from 'antd';
import { Option } from 'antd/es/mentions';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import AdminMenu from '../../components/AdminMenu';

const UpdateProduct = () => {
    const { slug } = useParams();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [author, setAuthor] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [category, setCategory] = useState('');
    const [cover, setCover] = useState('');
    const [id, setId] = useState('6482f482d1548bfc1a843135');
    const navigate = useNavigate();

    // get single product
    const getProductDetails = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/api/v1/product/single-product/${slug}`);
            if (data?.success) {
                setName(data?.product?.name);
                setDescription(data?.product?.description);
                setAuthor(data?.product?.author);
                setPrice(data?.product?.price);
                setQuantity(data?.product?.quantity);
                setCategory(data?.product?.category);
                setId(data?.product?._id);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // useEffect
    useEffect(() => {
        getProductDetails();
    }, [])

    // update Product Handler
    const updateProductHandler = async (e) => {
        e.preventDefault();
        let formDetails = new FormData();
        if (name) {
            formDetails.append('name', name);
        }
        if (author) {
            formDetails.append('author', author);
        }
        if (description) {
            formDetails.append('description', description);
        }
        if (price) {
            formDetails.append('price', price);
        }
        if (quantity) {
            formDetails.append('quantity', quantity);
        }
        formDetails.append('category', category);
        if (cover) {
            formDetails.append('cover', cover);
        }

        // calling api
        const { data } = await axios.put(`${process.env.REACT_APP_SERVER_DOMAIN}/api/v1/product/update/${slug}`, formDetails);
        if (data?.success) {
            toast.success('Product updated successfully');
            setTimeout(() => navigate('/dashboard/admin/products'));
            window.scrollTo(0, 0);
        }
    }

    return (
        <Layout title={'Update Product - Book Store'}>
            <div className='w-full bg-slate-200 py-6'>
                <div className='w-1/3 m-auto px-4 py-1 bg-white rounded'>
                    <div className='w-1/2 m-auto'>
                        <img className='w-full' src={bookAnimation} alt="create-product" />
                    </div>
                    <form className='mt-2' onSubmit={updateProductHandler}>

                        <label htmlFor="category" className='font-semibold'>Category</label>
                        <Select
                            id='category'
                            placeholder={'Category'}
                            showSearch
                            bordered={false}
                            value={category}
                            className='w-full py-1 my-2 bg-slate-200 rounded'
                            onChange={(value) => setCategory(value)}>
                            <Option value="New Arrivals">New Arrivals</Option>
                            <Option value="Stock Market & Investment">Stock Market & Investment</Option>
                            <Option value="Bookshelf of Love & Fantasy">Bookshelf of Love & Fantasy</Option>
                            <Option value="Biographies & Autobiographies">Biographies & Autobiographies</Option>
                            <Option value="Mystery & Suspense Novels">Mystery & Suspense Novels</Option>
                        </Select>

                        <label htmlFor="file">
                            <p
                                className='w-full px-2 py-2 my-2 bg-slate-200 rounded text-center text-slate-500 text-sm cursor-pointer'>
                                {cover?.name ? cover?.name : 'Upload Cover Image'}</p>
                            <input type="file" accept='image/*' hidden onChange={(e) => setCover(e.target.files[0])} id='file' />
                        </label>

                        <div className='w-1/3 m-auto'>
                            {cover ? (
                                <img src={URL.createObjectURL(cover)} alt="cover-photo" className='w-full' />
                            ) :
                                (
                                    <img src={`${process.env.REACT_APP_SERVER_DOMAIN}/api/v1/product/photo/${id}`} alt="cover-photo" className='w-full' />
                                )}
                        </div>

                        <label htmlFor="name" className='font-semibold'>Name</label>
                        <input type="text" id='name'
                            className='w-full px-2 py-2 my-2 bg-slate-200 rounded focus-within:outline-slate-300'
                            placeholder='Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)} />

                        <label htmlFor="author" className='font-semibold'>Author</label>
                        <input type="text" id='author'
                            className='w-full px-2 py-2 my-2 bg-slate-200 rounded focus-within:outline-slate-300'
                            required
                            placeholder='Author'
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)} />

                        <label htmlFor="description" className='font-semibold'>Description</label>
                        <textarea
                            id='description'
                            className='w-full px-2 py-2 my-2 bg-slate-200 rounded focus-within:outline-slate-300'
                            placeholder='Description'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}>
                        </textarea>

                        <label htmlFor="price" className='font-semibold'>Price</label>
                        <input type="number" id='price'
                            className='w-full px-2 py-2 my-2 bg-slate-200 rounded focus-within:outline-slate-300'
                            placeholder='Price'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)} />

                        <label htmlFor="quantity" className='font-semibold'>Quantity</label>
                        <input type="number" id='quantity'
                            className='w-full px-2 py-2 my-2 bg-slate-200 rounded focus-within:outline-slate-300'
                            placeholder='Quantity'
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)} />

                        <input type="submit" value='Update Product'
                            className='w-full px-2 py-2 my-3 bg-red-400 hover:bg-red-500 rounded text-white cursor-pointer' />
                    </form>
                </div>
                <AdminMenu />
            </div>
        </Layout>
    )
}

export default UpdateProduct