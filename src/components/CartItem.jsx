import React, { useState } from 'react'
import { useCart } from '../context/cart';
import toast from 'react-hot-toast';

const CartItem = ({ id, name, author, price, itemCount }) => {
    const [cart, setCart] = useCart();
    const [count, setCount] = useState(itemCount);

    // setting count
    const decHandler = () => {
        if (count > 1) {
            setCount(count - 1)
            let items = [...cart];
            let filteredItems = items.map((el) => {
                if (el._id === id) {
                    el.itemCount = count - 1;
                    return el;
                }
                else {
                    return el;
                }
            })

            setCart(filteredItems);
            localStorage.setItem('bookstore_cart', JSON.stringify(filteredItems));
        }
    }

    const incHandler = () => {
        if (count < 10) {
            setCount(count + 1);
            let items = [...cart];
            let filteredItems = items.map((el) => {
                if (el._id === id) {
                    el.itemCount = count + 1;
                    return el;
                }
                else {
                    return el;
                }
            })

            setCart(filteredItems);
            localStorage.setItem('bookstore_cart', JSON.stringify(filteredItems));
        }
    }

    // remove Item Handler
    const removeItemHandler = () => {
        let items = [...cart];
        let filteredItems = items.filter((item) => {
            return item._id !== id
        })
        setCart(filteredItems);
        localStorage.setItem('bookstore_cart', JSON.stringify(filteredItems));
        toast.success('Item deleted successfully');
    }

    return (
        <div className='amir flex gap-6 border-b-2 border-t-2 border-solid border-slate-300 bg-slate-200'>
            <div className='w-1/4'>
                <img src={`${process.env.REACT_APP_SERVER_DOMAIN}/api/v1/product/photo/${id}`} alt="cart-image" className='w-full' />
            </div>
            <div className='w-3/4 p-2'>
                <h2 className='text-xl font-semibold text-slate-600'>Name: {name}</h2>
                <h3 className='text-base font-semibold text-slate-500 my-2'>Author: {author}</h3>
                <div className='flex justify-between items-center my-4'>
                    <div className='flex w-1/3 justify-between border-2 border-solid border-slate-300 py-0.5 px-2 font-semibold'>
                        <span onClick={decHandler}><i class="fa-solid fa-minus cursor-pointer"></i></span>
                        <span>{count}</span>
                        <span onClick={incHandler}><i class="fa-solid fa-plus cursor-pointer"></i></span>
                    </div>
                    <div className='text-indigo-500 font-bold'>&#8377;{price}</div>
                    <div className='hover:text-red-500 cursor-pointer'>
                        <i class="fa-solid fa-trash-can" onClick={removeItemHandler}></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItem