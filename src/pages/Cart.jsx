import React from 'react'
import Layout from '../components/Layout/Layout'
import { useCart } from '../context/cart'
import { useAuth } from '../context/auth';
import CartItem from '../components/CartItem';
import emptyCartImg from '../images/empty-cart.png';
import userAnimation from '../images/login-animation.gif'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'

const Cart = () => {
    const [cart, setCart] = useCart();
    const [auth] = useAuth();
    const navigate = useNavigate();

    const toTalSum = () => {
        let sum = 0;
        cart.map((el) => {
            sum += (el.price * el.itemCount)
        })
        return sum


    }

    // checkout Handler
    const checkoutHandler = () => {
        setCart([]);
        localStorage.removeItem('bookstore_cart');
        toast.success('Your order has been placed successfully')
        setTimeout(() => navigate('/'), 0);
    }

    // login Checkout Handler
    const loginCheckoutHandler = () => {
        navigate('/login');
        window.scrollTo(0, 0);
    }

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
                                        {
                                            auth?.token ?
                                                (<div>
                                                    <div className='flex gap-12 items-center'>
                                                        <div className='w-1/5 mx-10 rounded-full overflow-hidden drop-shadow-md shadow-md'>
                                                            <img src={userAnimation} alt="user" className='w-full' />
                                                        </div>
                                                        <div className='text-xl font-semibold text-slate-500 mb-2'>Hello! {auth?.user?.fname}</div>
                                                    </div>
                                                    <hr className='bg-slate-300 w-full h-1 my-2' />
                                                    <h2 className='text-xl font-semibold text-slate-500 mb-2'>Total: &#8377;{toTalSum()}</h2>
                                                    <div>
                                                        <button className='bg-slate-500 text-white px-2 py-1 rounded text-base' onClick={checkoutHandler}>Proceed to Checkout</button>
                                                    </div>
                                                </div>) :

                                                (<>
                                                    <h2 className='text-xl font-semibold text-slate-500 mb-2'>Total: &#8377;{toTalSum()}</h2>
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