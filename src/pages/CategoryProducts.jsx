import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { useParams } from 'react-router-dom';
import Card from '../components/Card';
import axios from 'axios';
import notFoundAnimation from '../images/not-found-animation.gif';

const CategoryProducts = () => {
    const { slug } = useParams();
    const [products, setProducts] = useState([]);

    // get category product
    const getCategoryProduct = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/api/v1/product/category/${slug}`);
            setProducts(data?.products);
        } catch (error) {
            console.log(error);
        }
    }

    // useEffect
    useEffect(() => {
        getCategoryProduct();
    }, []);

    return (
        <Layout>
            {
                products.length > 0 ?
                    (<div>
                        <h2
                            className='text-center text-3xl font-semibold text-slate-500 my-8'
                        >{products[0]?.category}</h2>
                        <div className='grid grid-cols-5 gap-12 px-24'>
                            {
                                products.map((el) => (
                                    <Card
                                        key={el._id}
                                        name={el.name}
                                        author={el.author}
                                        price={el.price}
                                        id={el._id}
                                        slug={el.productSlug}
                                        cardInfo={el}
                                    />
                                ))
                            }
                        </div>
                    </div>) :

                    (
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

export default CategoryProducts