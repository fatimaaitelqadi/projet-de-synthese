import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Style/NavBar.css';
import Panier from '../Image/panier.png';
import Search from '../Image/search.png';
import user from '../Image/user.png';
// Import icons for mega menu (example)
import { GiGoldBar, GiSilverBullet, GiCrystalShine, GiEmerald, GiDiamondRing, GiSparklingSabre, GiThorHammer, GiMetalPlate, GiStoneBlock } from 'react-icons/gi'; 
import { FaGem, FaShoppingBag } from 'react-icons/fa'; // Generic Gem, placeholder image

function NavBar() {
  // State to track which main menu item's dropdown is open (e.g., 'collection')
  const [openMenu, setOpenMenu] = useState(null);
  // State to track which sub-menu's mega menu is open (e.g., 'rings')
  const [openMegaMenu, setOpenMegaMenu] = useState(null);

  const handleMenuEnter = (menu) => {
    setOpenMenu(menu);
  };

  const handleMenuLeave = () => {
    setOpenMenu(null);
    setOpenMegaMenu(null); // Close mega menu when leaving main menu
  };

  const handleMegaMenuEnter = (megaMenu) => {
    setOpenMegaMenu(megaMenu);
  };

  const handleMegaMenuLeave = () => {
    // Keep mega menu open while mouse is potentially moving to it
    // It will close via handleMenuLeave when mouse leaves the main menu item
  };

  return (
    <div className="navbar">
      <nav>
        <Link to="/" className="logo">
          {/* Use your actual logo image path */}
          <img src="/path/to/your/logo.png" alt="Logo" style={{ height: '40px'}} />
        </Link>
      </nav>
      <ul className="nav-list">
        <li><Link to="/Home" className="nav-item">Home</Link></li>
        <li><Link to="/Boutique" className="nav-item">Boutique</Link></li>
        
        {/* Collection Dropdown (Main Trigger) */}
        <li 
          className="nav-item dropdown" 
          onMouseEnter={() => handleMenuEnter('collection')}
          onMouseLeave={handleMenuLeave}
        >
          Collection
          {/* Main Dropdown (Level 1) */}
          {openMenu === 'collection' && (
            <div className="dropdown-menu collection-dropdown-grid">
              {/* Row 1 */}
              <div className="dropdown-row">
                {/* Column 1.1: Anneaux */}
                <div className="dropdown-column">
                  <h4><Link to="/anneaux">Les Anneaux</Link></h4>
                  <ul>
                    <li><Link to="/anneaux/gold">Gold</Link></li>
                    <li><Link to="/anneaux/silver">Silver</Link></li>
                    <li><Link to="/anneaux/palladium">Palladium</Link></li>
                    <li><Link to="/anneaux/platinum">Platinum</Link></li>
                    <li><Link to="/anneaux/RoseGold">Rose Gold</Link></li>
                  </ul>
                </div>

                {/* Column 1.2: Boucles d'oreilles */}
                <div className="dropdown-column">
                   <h4><Link to="/boucles-oreilles">Les Boucles d'Oreilles</Link></h4>
                   <ul>
                     <li><Link to="/boucles-oreilles/studs">Studs</Link></li>
                     <li><Link to="/boucles-oreilles/hoops">Hoops</Link></li>
                     <li><Link to="/boucles-oreilles/drops">Drops</Link></li>
                     <li><Link to="/boucles-oreilles/chandeliers">Chandeliers</Link></li>
                     <li><Link to="/boucles-oreilles/cuffs">Cuffs</Link></li>
                   </ul>
                </div>

                {/* Column 1.3: Watches */}
                <div className="dropdown-column">
                  <h4><Link to="/watches">Watches</Link></h4>
                  <ul>
                    <li><Link to="/watches/luxury">Luxury</Link></li>
                    <li><Link to="/watches/sport">Sport</Link></li>
                    <li><Link to="/watches/casual">Casual</Link></li>
                    <li><Link to="/watches/smart">Smart</Link></li>
                    <li><Link to="/watches/vintage">Vintage</Link></li>
                  </ul>
                </div>

                {/* Column 1.4: Cliers */}
                <div className="dropdown-column">
                  <h4><Link to="/cliers">Les Cliers</Link></h4>
                  <ul>
                     <li><Link to="/cliers/pendants">Pendants</Link></li>
                     <li><Link to="/cliers/chokers">Chokers</Link></li>
                     <li><Link to="/cliers/chains">Chains</Link></li>
                     <li><Link to="/cliers/pearls">Pearls</Link></li>
                     <li><Link to="/cliers/statement">Statement</Link></li>
                  </ul>
                </div>
              </div>

              {/* Separator (Optional) */}
              <hr className="dropdown-separator" />

              {/* Row 2 */}
              <div className="dropdown-row">
                 {/* Column 2.1: Braceles */}
                 <div className="dropdown-column">
                   <h4><Link to="/braceles">Les Braceles</Link></h4>
                   <ul>
                      <li><Link to="/braceles/bangles">Bangles</Link></li>
                      <li><Link to="/braceles/tennis">Tennis</Link></li>
                      <li><Link to="/braceles/charm">Charm</Link></li>
                      <li><Link to="/braceles/cuff">Cuff</Link></li>
                      <li><Link to="/braceles/chain">Chain</Link></li>
                   </ul>
                 </div>

                 {/* Column 2.2: Bijoux Traditionnels */}
                 <div className="dropdown-column">
                   <h4><Link to="/bijoux-traditionnels">Les Bijoux Traditionnels</Link></h4>
                   <ul>
                      <li><Link to="/bijoux-traditionnels/wedding">Wedding</Link></li>
                      <li><Link to="/bijoux-traditionnels/ceremonial">Ceremonial</Link></li>
                      <li><Link to="/bijoux-traditionnels/heritage">Heritage</Link></li>
                      <li><Link to="/bijoux-traditionnels/artisanal">Artisanal</Link></li>
                   </ul>
                 </div>

                 {/* Add empty columns if needed to fill space, or adjust flex properties */}
                 <div className="dropdown-column"></div>
                 <div className="dropdown-column"></div>

              </div>
            </div>
          )}
        </li>
        <li><Link to="/About" className="nav-item">About</Link></li>
      </ul>
      <ul className='nav-list1'>
        <li><Link to="/Panier" ><img src={Panier} alt='panier' className='Search' /></Link></li>
        <li><Link to="/Search"><img src={Search} alt='Search' className='Search'/></Link></li>
        <li><Link to="/login"><img src={user} alt='user'className='Search'/></Link></li>
      </ul>
    </div>
  );
}

export default NavBar;