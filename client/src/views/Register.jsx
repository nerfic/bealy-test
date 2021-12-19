import React, { useState } from 'react'
import { SignupApi } from '../api/auth'
import { useNavigate } from 'react-router-dom';

const initialData = {
    email: '',
    password: '',
    passwordConfirm: '',
}

export default function Register() {

    let navigate = useNavigate();
    const [data, setData] = useState(initialData);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSumbit = () => {
        if (data.password.length > 3) {
            console.log(data.password)
            setError(null)
            if (data.password === data.passwordConfirm) {
                setError(null)
                if (data.email.length > 2) {
                    setError(null)
                    SignupApi(data, (response) => setSuccess("User create, please login") & setData(initialData) & setTimeout(() => {
                        navigate('/login');
                    }, 4000), (response) => setError(response.error) & console.log(response));
                } else {
                    setError("Email too short")
                }
            } else {
                setError("Password and password confirm not ok")
            }
        } else {
            setError("Password too short")
        }
    }

    return (
        <div className="container">
            <div className="row align-items-center" style={{ minHeight: "100vh" }}>
                <div className="col-12 d-flex justify-content-center">
                    <div className="card" style={{ width: "300px" }}>
                        <div className="card-body">
                            <h3 className="mb-3 fw-normal text-center">Register</h3>
                            {error ? <div className="alert-danger p-2 mb-2">{error}</div> : null}
                            {success ? <div className="alert-success p-2 mb-2">{success}</div> : null}
                            <div className="form-group mb-2">
                                <input type="email" className="form-control" id="email" onChange={(event) => setData({ ...data, email: event.target.value })} placeholder="Email" />
                            </div>
                            <div className="form-group mb-2">
                                <input type="password" className="form-control" id="password" onChange={(event) => setData({ ...data, password: event.target.value })} placeholder="Password" />
                                <div id="emailHelp" className="form-text">4 characters min</div>
                            </div>

                            <div className="form-group mb-4">
                                <input type="password" className="form-control" id="password" onChange={(event) => setData({ ...data, passwordConfirm: event.target.value })} placeholder="Password Confirm" />
                            </div>
                            <button type="sumbit" className="btn btn-primary w-100" onClick={handleSumbit}>Register</button>
                            <a href="/login">Login here</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
