import React, { useState } from 'react'
import Layout from '../components/Layout/Layout'
import { useCart } from '../context/cart'
import { useAuth } from '../context/auth';
import CartItem from '../components/CartItem';
import emptyCartImg from '../images/empty-cart.png';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useEffect } from 'react';
import DropIn from "braintree-web-drop-in-react";

const Cart = () => {
    const [cart, setCart] = useCart();
    const [auth] = useAuth();
    const navigate = useNavigate();
    const [clientToken, setClientToken] = useState('');
    const [instance, setInstance] = useState('');

    const toTalSum = () => {
        let sum = 0;
        cart.map((el) => {
            sum += (el.price * el.itemCount)
        })
        return sum
    }

    // call gateway token
    const gateWayToken = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/api/v1/product/braintree/token`);
            setClientToken(data?.clientToken);
        } catch (error) {

        }
    }

    // handle payments
    const handlePayment = async () => {
        try {
            const { nonce } = await instance.requestPaymentMethod();
            await axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/api/v1/product/braintree/payment`, {
                nonce, cart, _id: auth.user._id
            })
            localStorage.removeItem('bookstore_cart');
            setCart([]);
            toast.success('Payment Completed Successfully');
            setTimeout(() => navigate('/dashboard/user/orders'), 0);
        } catch (error) {
            console.log(error);
        }
    }

    // login Checkout Handler
    const loginCheckoutHandler = () => {
        navigate('/login');
        window.scrollTo(0, 0);
    }

    // useEffect
    useEffect(() => {
        gateWayToken();
    }, [])

    return (
        <Layout title={'Cart - Book Store'}>
            <div>
                {
                    cart?.length > 0 ?
                        (
                            <>
                                <h1 className='text-center text-3xl font-semibold text-slate-500 my-4'>Cart</h1>
                                <hr />
                                <div className='flex gap-20 px-36 my-6'>
                                    <div className='w-1/2 overflow-auto' style={{ maxHeight: '70vh' }}>
                                        {/* mapping cart item */}
                                        {cart.map((e) => {
                                            return (
                                                <CartItem
                                                    key={e._id}
                                                    id={e._id}
                                                    name={e._name}
                                                    author={e.author}
                                                    price={e.price}
                                                    itemCount={e.itemCount}
                                                />
                                            )
                                        })
                                        }
                                    </div>
                                    <div className='w-1/2 bg-slate-200 text-center py-6 rounded'>
                                        <h1 className='text-2xl font-semibold text-sky-500 mb-2'>Cart Summary</h1>
                                        <h2 className='text-base font-semibold text-slate-500 mb-2'>Total | Checkout | Payment</h2>
                                        <hr className='bg-slate-300 w-full h-1 my-2' />
                                        <h2 className='text-xl font-semibold text-slate-500'>Total: &#8377;{toTalSum()}</h2>
                                        {
                                            auth?.token ?
                                                (<div>
                                                    {
                                                        !clientToken ? (
                                                            <div>
                                                                <h4>Loading........</h4>
                                                            </div>) :
                                                            (
                                                                <div className='w-3/4 m-auto'>
                                                                    <DropIn
                                                                        options={{ authorization: clientToken }}
                                                                        onInstance={(instance) => setInstance(instance)}
                                                                    />
                                                                    <button
                                                                        className='bg-green-500 text-white px-2 py-1 rounded text-base'
                                                                        onClick={handlePayment}>Checkout</button>
                                                                </div>
                                                            )
                                                    }
                                                </div>) :

                                                (<>
                                                    <button className='bg-red-500 text-white px-2 py-1 rounded text-base' onClick={loginCheckoutHandler}>Please Login to Checkout</button>
                                                </>)
                                        }
                                    </div>
                                </div>
                            </>
                        ) :
                        (
                            <div className='w-1/2 m-auto my-4'>
                                <img src={emptyCartImg} alt="empty-cart" className='w-full' />
                            </div>
                        )
                }
            </div>
        </Layout>
    )
}

export default Cart;