import { Navigate, Outlet } from "react-router-dom";
import jwtDecode from "jwt-decode"

const token = localStorage.getItem("jwt_token")

function tokenIsValid(token) {
    if (token) {
        const { exp } = jwtDecode(token);

        if (exp * 1000 > new Date().getTime()) {
            return true
        }
        return false;
    }
    return false
}

const ProtectedRoutes = () => {
    return tokenIsValid(token) ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
