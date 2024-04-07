import './App.css';
import Navbar from './Pages/Navbar/Navbar'
import Home from './Pages/Home/Home'
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register'
import Favourite from './Pages/Favourite/Favourite';

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";



function App() {
  return (
    <div className="App">
      <Router> {/* Make sure to wrap your App component inside the Router component */}
        <RouterContent />
      </Router>
    </div>
  );
}

function RouterContent() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/Signin/Signin' || location.pathname === '/Signup/Signup';

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/Home' element={<Home />} />
        <Route path='/Favourite' element={<Favourite />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Register' element={<Register />} />
      </Routes>
    </>
  );
}

export default App
