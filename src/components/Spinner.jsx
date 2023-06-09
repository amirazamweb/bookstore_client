import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'

const Spinner = ({ value }) => {
    const navigate = useNavigate();
    const [count, setCount] = useState(2);

    useEffect(() => {
        let id = setInterval(() => {
            setCount((val) => val - 1);
        }, 1000);

        count === 0 && navigate('/login');

        return () => {
            clearInterval(id);
        }

    }, [count]);

    return (
        <div className="lds-dual-ring"></div>
    )
}

export default Spinner