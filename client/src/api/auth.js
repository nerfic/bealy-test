import { myFetch } from "../utils/myFetch"

export const SignupApi = (data, callback, errorCallback) => {
    myFetch(
        "http://localhost:8000/api/auth/signup",
        callback,
        errorCallback,
        {
            method: "POST",
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                email: data.email,
                password: data.password,
            })
        }
    )
}

export const LoginApi = (data, callback, errorCallback) => {
    myFetch(
        "http://localhost:8000/api/auth/login",
        callback,
        errorCallback,
        {
            method: "POST",
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                email: data.email,
                password: data.password,
            })
        }
    )
}
