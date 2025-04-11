import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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

      {/* Style for dropdown */}
      <style jsx>{`
        .navbar {
          font-family: Arial, sans-serif;
          background-color: #333;
          padding: 10px;
        }

        .logo img {
          width: 50px;
          height: 50px;
        }

        .nav-list {
          list-style-type: none;
          padding: 0;
          margin: 0;
          display: flex;
          justify-content: space-around;
        }

        .nav-item {
          color: white;
          text-decoration: none;
          padding: 10px 15px;
          display: block;
        }

        .nav-item:hover {
          background-color: #444;
          border-radius: 4px;
        }

        .dropdown {
          position: relative;
        }

        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          background-color: #fff;
          list-style-type: none;
          padding: 10px;
          margin: 0;
          box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
          display: none;
        }

        .dropdown-menu li {
          padding: 8px 15px;
        }

        .dropdown-item {
          color: #333;
          text-decoration: none;
          display: block;
        }

        .dropdown-item:hover {
          background-color: #f0f0f0;
        }

        .dropdown:hover .dropdown-menu {
          display: block;
        }

        @media (max-width: 768px) {
          .nav-list {
            flex-direction: column;
            align-items: center;
          }

          .nav-item {
            padding: 12px;
          }
        }
      `}</style>
    </div>
  );
}

export default NavBar;
