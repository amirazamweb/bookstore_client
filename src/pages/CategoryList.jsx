import React from 'react'
import Layout from '../components/Layout/Layout';
import { useNavigate } from 'react-router-dom';
import slugify from 'slugify'

const CategoryList = () => {
    const navigate = useNavigate();

    // category Handler
    const categoryHandler = (e) => {
        const slug = slugify(e.target.innerText).toLowerCase()
        navigate(`/product/category/${slug}`);
        window.scrollTo(0, 0);
    }
    return (
        <Layout title={'Category - Book Store'}>
            <div className='grid grid-cols-2 gap-24 w-2/3 m-auto my-16'>
                <div
                    className='bg-slate-500 text-white p-4 rounded cursor-pointer'
                    onClick={categoryHandler}
                >New Arrivals</div>
                <div
                    className='bg-slate-500 text-white p-4 rounded cursor-pointer'
                    onClick={categoryHandler}
                >Stock Market & Investment</div>
                <div
                    className='bg-slate-500 text-white p-4 rounded cursor-pointer'
                    onClick={categoryHandler}
                >Bookshelf of Love & Fantasy</div>
                <div
                    className='bg-slate-500 text-white p-4 rounded cursor-pointer'
                    onClick={categoryHandler}
                >Biographies & Autobiographies</div>
                <div
                    className='bg-slate-500 text-white p-4 rounded cursor-pointer'
                    onClick={categoryHandler}
                >Mystery & Suspense Novels</div>
            </div>
        </Layout>
    )
}

export default CategoryList