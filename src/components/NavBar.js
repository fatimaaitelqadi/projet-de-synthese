import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Style/NavBar.css';
import Panier from '../Image/panier.png';
import Search from '../Image/search.png';
import user from '../Image/user.png'

function NavBar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="navbar">
      <nav>
        <Link to="/" className="logo">
          <img src="your-image-url" alt="Logo" />
        </Link>
      </nav>
      <ul className="nav-list">
        <li><Link to="/" className="nav-item">Home</Link></li>
        <li><Link to="/" className="nav-item">Boutique</Link></li>
        <li 
          className="nav-item dropdown" 
          onMouseEnter={toggleDropdown} 
          onMouseLeave={toggleDropdown}
        >
          NouvelleCollection
          {isDropdownOpen && (
            <ul className="dropdown-menu">
              <li><Link to="/anneaux" className="dropdown-item">Les Anneaux</Link></li>
              <li><Link to="/boucles-oreilles" className="dropdown-item">Les Boucles d'Oreilles</Link></li>
              <li><Link to="/cliers" className="dropdown-item">Les Cliers</Link></li>
              <li><Link to="/braceles" className="dropdown-item">Les Braceles</Link></li>
              <li><Link to="/bijoux-traditionnels" className="dropdown-item">Les Bijoux Traditionnels</Link></li>
            </ul>
          )}
        </li>
        <li><Link to="/" className="nav-item">About</Link></li>
        </ul>
        <ul className='nav-list1'>
        <li><Link to="/Panier" ><img src={Panier} alt='panier' className='Search' /></Link></li>
        <li><Link to="/Panier"><img src={Search} alt='Search' className='Search'/></Link></li>
        <li><Link to="/Panier"><img src={user} alt='user'className='Search'/></Link></li>
       
      

      </ul>

     
    </div>
  );
}

export default NavBar;
