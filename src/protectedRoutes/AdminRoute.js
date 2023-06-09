import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../context/auth';
import Spinner from '../components/Spinner';

const AdminRoute = () => {
    const [ok, setOk] = useState(false);
    const [auth] = useAuth();

    // calling protected api
    useEffect(() => {
        const authCheck = async () => {
            const { data } = await axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/api/v1/auth/admin`, {
                headers: { authorization: `Bearer ${auth?.token}` }
            })
            if (data?.ok) {
                setOk(true);
            }
            else {
                setOk(false);
            }
        }
        auth?.token && authCheck();
    }, [auth.token])

    return ok ? <Outlet /> : <Spinner />
}

export default AdminRoute