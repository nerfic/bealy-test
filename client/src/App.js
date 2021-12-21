import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './views/Login';
import LoginCopy from './views/LoginCopy'
import Home from './views/Home';
import MyRoom from './views/MyRoom';
import FileTransfer from './views/FileTransfer';
import Register from './views/Register'
import Logout from './components/Logout';
import NotFound from './views/NotFound';
import ProtectedRoutes from './components/ProtectedRoutes';

function App() {

  return (
    <Router>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/rooms" element={<MyRoom />} />
          <Route exact path="/transfert/:uuid" element={<FileTransfer />} />
          <Route exact path="/logout" element={<Logout />} />
        </Route>
        <Route exact path="/login" element={<LoginCopy />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
