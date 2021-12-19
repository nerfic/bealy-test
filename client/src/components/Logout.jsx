import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Logout() {

    let navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem("jwt_token")
        navigate('/login');
    }, [navigate])

    return (
        <div>
            <p>Logout</p>
        </div>
    )
}
