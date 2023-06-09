import { useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useCart } from '../context/cart';

const Card = ({ id, name, author, price, slug, cardInfo }) => {
    const navigate = useNavigate();
    const [cart, setCart] = useCart();

    // details Handler
    const detailsHandler = () => {
        window.scrollTo(0, 0);
        navigate(`/product/${slug}`);
    }

    // add To Cart Handler
    const addToCartHandler = () => {
        cardInfo.itemCount = 1;
        setCart([...cart, cardInfo]);

        // adding data to local storage
        const localStore = JSON.parse(localStorage.getItem('bookstore_cart')) || [];
        localStore.push(cardInfo);
        localStorage.setItem('bookstore_cart', JSON.stringify(localStore));
        toast.success('Product added to cart');
    }

    return (
        <div className='bg-slate-100 rounded hover:bg-slate-200 cursor-pointer group'>
            <div className='w-full'>
                <img
                    src={`${process.env.REACT_APP_SERVER_DOMAIN}/api/v1/product/photo/${id}`}
                    alt="card-img"
                    className='w-full rounded' />
            </div>
            <div className='px-2 text-center py-1'>
                <div className='flex justify-center gap-2 mt-3 text-green-400'>
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                </div>
                <h4 className='font-semibold text-slate-600'>{name.length < 15 ? name : name.substring(0, 15)}....</h4>
                <p className='text-base text-slate-500'>{author.length < 15 ? author : author.substring(0, 15)}....</p>
                <div className='flex justify-around items-center my-2'>
                    <strong className='text-sky-500'>&#8377;{price}</strong>
                    <p className='bg-green-500 rounded text-white px-2 text-sm'>In Stock</p>
                </div>

                <div className='hidden group-hover:block my-1'>
                    <div className='flex justify-around'>
                        <button
                            className='bg-slate-500 rounded px-2 py-1 text-white text-sm'
                            onClick={detailsHandler}>Details</button>
                        <button
                            className='bg-cyan-500 rounded px-2 py-1 text-white text-sm'
                            onClick={addToCartHandler}>Add To Cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card;