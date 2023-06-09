import React, { useContext, useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout';
import ImageSlider from '../components/ImageSlider';
import { Select } from 'antd';
import { Option } from 'antd/es/mentions';
import Card from '../components/Card';
import axios from 'axios';
import notFoundAnimation from '../images/not-found-animation.gif'

const Home = () => {
    const [products, setProducts] = useState([]);

    // get products
    const getProductsList = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/api/v1/product/all`);
            if (data?.success) {
                setProducts(data?.products);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // get filter product
    const filterProductHandler = async (category) => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/api/v1/product/filter/${category}`);
            if (data?.success) {
                setProducts(data?.products);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // useeffect
    useEffect(() => {
        getProductsList();
    }, [])

    return (
        <Layout title={'Book Store'}>
            {/* image slider */}
            <ImageSlider />
            {/* title with filteration */}
            <div className='relative my-8'>
                <div>
                    <h2 className='font-bold text-3xl text-center my-6 text-slate-600'>Your Favourite Books Collection</h2>
                </div>

                <Select
                    placeholder={'Filter By Category'}
                    bordered
                    showSearch
                    className='absolute right-24 top-1 w-60'
                    onChange={(value) => filterProductHandler(value)}>
                    <Option value="New Arrivals">New Arrivals</Option>
                    <Option value="Stock Market & Investment">Stock Market & Investment</Option>
                    <Option value="Bookshelf of Love & Fantasy">Bookshelf of Love & Fantasy</Option>
                    <Option value="Biographies & Autobiographies">Biographies & Autobiographies</Option>
                    <Option value="Mystery & Suspense Novels">Mystery & Suspense Novels</Option>
                </Select>

                {/* <Select
                    placeholder={'Filter By Price'}
                    bordered
                    showSearch
                    className='absolute right-24 top-1 w-60'>
                    <Option value="">&#8377; 1 to 200</Option>
                    <Option value="">&#8377; 201 to 400</Option>
                    <Option value="">&#8377; 401 to 600</Option>
                    <Option value="">&#8377; 601 to 800</Option>
                    <Option value="">&#8377; 801 to 1000</Option>
                    <Option value="">more than &#8377; 1000</Option>
                </Select> */}
            </div>

            {/*display card */}

            {
                products.length > 0 ? (
                    <div className='grid grid-cols-5 gap-12 px-24'>
                        {products?.map((e) => {
                            return (
                                <Card
                                    key={e._id}
                                    name={e.name}
                                    author={e.author}
                                    price={e.price}
                                    id={e._id}
                                    slug={e.productSlug}
                                    cardInfo={e}
                                />
                            )
                        })}
                    </div>
                ) : (
                    <div className='text-center my-8'>
                        <h2 className='text-xl font-semibold text-slate-500'>No product found</h2>
                        <div className='w-1/3 m-auto my-4'>
                            <img src={notFoundAnimation} alt="not product found" className='w-full' />
                        </div>
                    </div>
                )
            }



        </Layout>
    )
}

export default Home