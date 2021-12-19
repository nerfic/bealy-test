import React, { useState } from 'react'
import { LoginApi } from '../api/auth'
import { useNavigate } from 'react-router-dom';

const initialData = {
    email: '',
    password: '',
    passwordConfirm: '',
}

export default function Login() {

    let navigate = useNavigate();
    const [data, setData] = useState(initialData);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSumbit = () => {

        if (data.email.length > 2) {
            if (data.password.length > 3) {
                setError(null)
                LoginApi(data, (response) => loginUser(response), (response) => setError(response.error));

            } else {
                setError("Password too short")
            }
        } else {
            setError("Email not valid")
        }

    }

    const loginUser = async (response) => {
        setSuccess("Connected");
        await localStorage.setItem("jwt_token", response.token)
        navigate('/')
    }

    return (
        <div className="container">
            <div className="row align-items-center" style={{ minHeight: "100vh" }}>
                <div className="col-12 d-flex justify-content-center">
                    <div className="card" style={{ width: "300px" }}>
                        <div className="card-body">
                            <h3 className="mb-3 fw-normal text-center">Login</h3>
                            {error ? <div className="alert-danger p-2 mb-2">{error}</div> : null}
                            {success ? <div className="alert-success p-2 mb-2">{success}</div> : null}
                            <div className="form-group mb-2">
                                <input type="email" className="form-control" id="email" onChange={(event) => setData({ ...data, email: event.target.value })} placeholder="Email" />
                            </div>
                            <div className="form-group mb-2">
                                <input type="password" className="form-control" id="password" onChange={(event) => setData({ ...data, password: event.target.value })} placeholder="Password" />
                            </div>
                            <button type="sumbit" className="btn btn-primary w-100" onClick={handleSumbit}>Connect</button>
                            <a href="/register">Register here</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
