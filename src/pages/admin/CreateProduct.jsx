import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout';
import bookAnimation from '../../images/book-animation.gif';
import { Select } from 'antd';
import { Option } from 'antd/es/mentions';
import toast from 'react-hot-toast';
import axios from 'axios';
import AdminMenu from '../../components/AdminMenu';

const CreateProduct = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [author, setAuthor] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [cover, setCover] = useState('');

    // create Product Handler
    const createProductHandler = async (e) => {
        e.preventDefault();
        console.log(cover);
        if (cover && category) {
            let formDetails = new FormData();
            formDetails.append('name', name);
            formDetails.append('author', author);
            formDetails.append('description', description);
            formDetails.append('price', price);
            formDetails.append('category', category);
            formDetails.append('cover', cover);

            // calling api
            const { data } = await axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/api/v1/product/create`, formDetails);
            if (data?.success) {
                toast.success(data?.message);
                setName('');
                setDescription('');
                setPrice('');
                setCover('');
                setAuthor('');
                setCategory('');
            }
            else {
                toast.error(data?.message);
            }
        }
        else if (!category) {
            toast.error('Category is required');
        }
        else if (!cover) {
            toast.error('Cover image is required');
        }
    }

    return (
        <Layout title={'Create Product - Book Store'}>
            <div className='w-full bg-slate-200 py-6'>
                <div className='w-1/3 m-auto px-4 py-1 bg-white rounded'>
                    <div className='w-1/2 m-auto'>
                        <img className='w-full' src={bookAnimation} alt="create-product" />
                    </div>
                    <form className='mt-2' onSubmit={createProductHandler}>

                        <Select
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
                            {cover && (
                                <img src={URL.createObjectURL(cover)} alt="cover-photo" className='w-full' />
                            )}
                        </div>

                        <input type="text"
                            className='w-full px-2 py-2 my-2 bg-slate-200 rounded focus-within:outline-slate-300'
                            required
                            placeholder='Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)} />

                        <input type="text"
                            className='w-full px-2 py-2 my-2 bg-slate-200 rounded focus-within:outline-slate-300'
                            required
                            placeholder='Author'
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)} />

                        <textarea
                            className='w-full px-2 py-2 my-2 bg-slate-200 rounded focus-within:outline-slate-300 resize-none'
                            placeholder='Description'
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}>
                        </textarea>

                        <input type="number"
                            className='w-full px-2 py-2 my-2 bg-slate-200 rounded focus-within:outline-slate-300'
                            required
                            placeholder='Price'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)} />

                        <input type="submit" value='Create Product'
                            className='w-full px-2 py-2 my-3 bg-red-400 hover:bg-red-500 rounded text-white cursor-pointer' />
                    </form>
                </div>
                {/* admin menu */}
                <AdminMenu />
            </div>
        </Layout>
    )
}

export default CreateProduct