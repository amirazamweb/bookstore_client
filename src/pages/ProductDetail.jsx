import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { useParams } from 'react-router-dom';
import { GrFormAdd, GrFormSubtract } from 'react-icons/gr';
import Card from '../components/Card';
import axios from 'axios';
import notFoundAnimation from '../images/not-found-animation.gif';
import { useCart } from '../context/cart';
import toast from 'react-hot-toast';

const ProductDetail = () => {
    const { slug } = useParams();
    const [productInfo, setProductInfo] = useState({});
    const [similarProducts, setSimilarProducts] = useState([]);
    const [count, setCount] = useState(2);
    const [cart, setCart] = useCart();

    // decreament Handler
    const decreamentHandler = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    }

    // increament Handler
    const increamentHandler = () => {
        if (count > 0 && count < 10) {
            setCount(count + 1);
        }
    }

    // get single product details
    const getProductDetails = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/api/v1/product/single-product/${slug}`);
            setProductInfo(data?.product)
        } catch (error) {
            console.log(error);
        }
    }

    // add To CartHandler
    const addToCartHandler = () => {
        productInfo.itemCount = count;
        setCart([...cart, productInfo]);

        // addind data to local storage
        const localStore = JSON.parse(localStorage.getItem('bookstore_cart')) || [];
        localStore.push(productInfo);
        localStorage.setItem('bookstore_cart', JSON.stringify(localStore));
        toast.success('Product added to cart');
    }

    // get similar products
    const getSimilarProducts = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/api/v1/product/similar-products/${slug}`);
            setSimilarProducts(data?.products);
        } catch (error) {
            console.log(error);
        }
    }

    // useEffect
    useEffect(() => {
        getProductDetails();
        getSimilarProducts();
    }, [slug])

    return (
        <Layout title={slug}>
            <div className='flex gap-20 w-3/4 m-auto mt-12'>
                <div className='w-1/3'>
                    <img src={`${process.env.REACT_APP_SERVER_DOMAIN}/api/v1/product/photo/${productInfo?._id}`}
                        alt="product-details" className='w-full' />
                </div>
                <div className='w-2/3'>
                    <h1 className='text-4xl font-semi-bold text-slate-500'>{productInfo?.name}</h1>
                    <p
                        className='border-solid border-2 border-slate-300 w-1/3 rounded px-2 py-1 my-4 text-slate-500'>English</p>
                    <div className='flex items-center my-5'>
                        <p className='text-slate-500 font-bold text-xl me-8'>Quantity: </p>
                        <div className='flex items-center w-1/5 justify-between text-2xl font-bold'>
                            <GrFormSubtract
                                className='outline outline-2 outline-slate-300 rounded hover:bg-red-500 w-8 h-8 cursor-pointer'
                                onClick={decreamentHandler} />
                            <span>{count}</span>
                            <GrFormAdd
                                className='outline outline-2 outline-slate-300 rounded hover:bg-green-500 w-8 h-8 cursor-pointer'
                                onClick={increamentHandler} />
                        </div>
                    </div>
                    <div className='border-solid border-2 border-slate-300 w-1/3 rounded px-3 py-1 my-4'>
                        <h4 className='text-slate-500'>Paperback</h4>
                        <p>
                            <span className='text-red-500 font-bold text-xl'>&#8377;{productInfo?.price}</span>
                            <del className='text-slate-400 mx-1'>&#8377;123</del>
                            <span className='text-green-500'>10% OFF</span>
                        </p>
                    </div>
                    <div className='my-2'>
                        <button
                            className='bg-red-500 text-white rounded px-3 py-2 font-semibold'
                            onClick={addToCartHandler}>GO TO CART</button>
                    </div>
                    <div>
                        <h3 className='text-xl font-semibold text-salte-600 my-2'>Description</h3>
                        <p className='text-sm text-slate-500'>{productInfo?.description}</p>
                    </div>
                </div>
            </div>

            {/* similar products */}
            <hr className='my-3' />
            <div>
                <h2 className='text-center text-3xl font-semibold text-slate-500 my-4'>Similar Products</h2>
                <div className='grid grid-cols-5 gap-12 px-24'>
                    {
                        similarProducts.length > 0 ?
                            (
                                similarProducts.map((elm) => (
                                    <Card
                                        key={elm._d}
                                        name={elm.name}
                                        author={elm.author}
                                        price={elm.price}
                                        id={elm._id}
                                        slug={elm.productSlug}
                                        cardInfo={elm}
                                    />
                                ))
                            ) :
                            (
                                <div className='w-1/3 m-auto my-12'>
                                    <img src={notFoundAnimation} alt="not found" />
                                </div>
                            )
                    }
                </div>
            </div>
        </Layout>
    )
}

export default ProductDetail