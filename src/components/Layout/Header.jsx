import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FaUserAlt } from 'react-icons/fa';
import { BsCartFill } from 'react-icons/bs';
import toast from 'react-hot-toast';
import logo from '../../images/logo.png'
import { useAuth } from '../../context/auth';
import { useSearch } from '../../context/search';
import axios from 'axios';
import { useCart } from '../../context/cart';

const Header = () => {

    const [auth, setAuth] = useAuth();
    const [search, setSearch] = useSearch();
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');
    const [cart] = useCart();

    // search handler
    const searchHandler = async () => {
        if (!keyword) {
            return toast.error('Input Value cannot be empty');
        }
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/api/v1/product/search/`, {
                keyword
            })
            setSearch(data);
            navigate(`/product/search/${keyword}`);
            window.scrollTo(0, 0);
        } catch (error) {
            console.log(error);
        }
    }

    // dashboard handler
    const dashboardHandler = () => {
        window.scrollTo(0, 0);
        if (auth.user?.role === 1) {
            navigate('/dashboard/admin/profile');
        }
        else {
            navigate('/dashboard/user/profile');
        }
    }

    // logout handler
    const logoutHandler = () => {
        setAuth({ ...auth, user: null, token: '' });
        localStorage.removeItem('bookstore_auth');
        toast.success('Logout sucessfully');
        setTimeout(() => navigate('/login'), 0);
    }

    return (
        <header className='sticky shadow-md h-12 md:h-16 w-full px-1 md:px-8 top-0 bg-white z-10'>
            <div className='flex items-center h-full justify-between'>
                <div className='h-6 md:h-12'>
                    <Link to='/'><img src={logo} alt="logo" className='h-full' /></Link>
                </div>
                <div className='flex items-center'>
                    <input type="text"
                        className='bg-slate-200 px-2 py-2 focus-within:outline-slate-400 rounded text-sm w-64'
                        placeholder='Search books, authers, publishers...'
                        onChange={(e) => setKeyword(e.target.value)} />
                    <button
                        className='bg-sky-600 text-sm py-2 px-2.5 ml-2 rounded text-white'
                        onClick={searchHandler}>Search</button>
                </div>
                <div className='flex items-center gap-3 md:gap-8'>
                    <nav className='text-sm md:text-base flex items-center gap-2 md:gap-10'>
                        <NavLink to='/'>Home</NavLink>
                        <NavLink to='/product/category'>Category</NavLink>
                        <NavLink to='/about'>About</NavLink>
                        <NavLink to='/contact'>Contact</NavLink>
                    </nav>
                    <div className='text-slate-600 relative md:text-lg cursor-pointer'
                        onClick={() => navigate('/cart')}>
                        <BsCartFill />
                        {cart.length > 0 && (
                            <div className='absolute -top-2 -right-2 bg-red-500 text-white m-0 p-0 rounded-full h-4 w-4 text-xs text-center'>{cart?.length}</div>
                        )}
                    </div>
                    <div className='text-slate-600 text-xs cursor-pointer relative'>
                        {auth?.token ? (
                            <img
                                src={`${process.env.REACT_APP_SERVER_DOMAIN}/api/v1/auth//profile-image/${auth.user?._id}`}
                                alt='profile-image'
                                className='w-6 h-6 rounded-full'
                                onClick={() => setShowMenu(showMenu === true ? false : true)} />
                        ) :
                            (
                                <Link to='/login'><FaUserAlt className='w-5 h-5' /></Link>
                            )}
                        {showMenu && <div className='absolute top-7 right-0 whitespace-nowrap drop-shadow-md shadow-md bg-white px-1 text-sm rounded'>

                            {auth?.token &&
                                (<>
                                    <p className='hover:text-red-500 text-center font-bold'
                                        onClick={dashboardHandler}>Dashboard</p>
                                    <p className='my-2 bg-red-500 px-2 text-white'
                                        onClick={logoutHandler}>Logout</p>
                                </>)
                            }

                        </div>}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header