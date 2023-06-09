import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Outlet } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { useAuth } from '../context/auth';

const UserRoute = () => {
    const [ok, setOk] = useState(false);
    const [auth] = useAuth();

    // calling protected api
    useEffect(() => {
        const authCheck = async () => {
            const { data } = await axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/api/v1/auth/user`, {
                headers: { authorization: `Bearer ${auth?.token}` }
            })
            if (data?.ok) {
                setOk(true);
            }
            else {
                setOk(false);
            }
        }
        auth.token && authCheck();

    }, [auth.token])

    return ok ? <Outlet /> : <Spinner />
}

export default UserRoute