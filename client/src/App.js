import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Login from './views/Login';
import Home from './views/Home';
import MyRoom from './views/MyRoom';
import FileTransfer from './views/FileTransfer';
import Register from './views/Register'
import Logout from './components/Logout';
import NotFound from './views/NotFound';
import jwtDecode from "jwt-decode"

function App() {

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

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={tokenIsValid(token) ? <Home /> : <Navigate to="/login" />} />
        <Route exact path="/rooms" element={tokenIsValid(token) ? <MyRoom /> : <Navigate to="/login" />} />
        <Route exact path="/transfert/:uuid" element={tokenIsValid(token) ? <FileTransfer /> : <Navigate to="/login" />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/logout" element={<Logout />} />
        <Route exact path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
