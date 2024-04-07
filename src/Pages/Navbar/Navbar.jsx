import React, { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import './Navbar.css'
import logo from '../Assets/recipe_logo.png'
import logout from '../Assets/logout.jpg'
import { Link } from 'react-router-dom';


const Navbar = () => {

    const [menuOpen, setMenuOpen] = useState(false);


  
  return (
    <div className='container-fluid nav-container'>
     <div><img src={logo} className='logo-nav-small' to='/Login'/></div>
        <div className='navbar'>
            <div>
                <img src={logo} className='logo'/>
               
            </div>

            <div className="nav-toggle-create" onClick={() => {setMenuOpen(!menuOpen);}}>
                <span/>
                <span/>
                <span/>
            </div>

            <div className={menuOpen ? "open" : ""} id= 'nav-all-buttons'>
                <Link className='nav-buttons' to='/Home'>HOME</Link>
                <Link className='nav-buttons' to='/Favourite'>FAVOURITE</Link>
               <img src={logout} className='logout-in' to='/Login' />
            </div>
            
            <div>
                <img src={logout} className='logout'/>
            </div>
        </div>
    </div>
  )
}

export default Navbar