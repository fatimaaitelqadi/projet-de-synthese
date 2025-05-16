import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom'; // Importation de BrowserRouter et Routes ensemble
import NavBar from './components/NavBar'; // Assure-toi que le chemin est correct
import Home from './Page/Home'; // Assure-toi que le chemin est correct
import Panier from './Page/Panier'; // Assure-toi que le chemin est correct
import Boutique from './Page/Boutique'; // Assure-toi que le chemin est correct
import About from './Page/About'; // Assure-toi que le chemin est correct
import Footer from './components/Footer'; // Assure-toi que le chemin est correct
import Login from './Page/Login'; // Assure-toi que le chemin est correct
import NouvelleCollection from './Page/NouvelleCollection'; // Assure-toi que le chemin est correct
import Search from './Page/Search'; // Assure-toi que le chemin est correct
import RoseGold from './Page/RoseGold';
import Platinum from './Page/Platinum';
import Palladium from './Page/Palladium';
import Silver from './Page/Silver';
import Gold from './Page/Gold';
import Studs from './Page/Studs';
import Hoops from './Page/Hoops';
import Drops from './Page/Drops';
import Chandeliers from './Page/Chandeliers';
import Cuffs from './Page/Cuffs';
import Luxury from './Page/Luxury';
import Sport from './Page/Sport';
import Casual from './Page/Casual';
import Smart from './Page/Smart';
import Vintage from './Page/Vintage';
import Pendants from './Page/Pendants'; 
import Pearls from './Page/Pearls'; 
import Chokers from './Page/Chokers'; 
import Chains from './Page/Chains'; 
import Statement from './Page/Statement'; 
import Bangles from './Page/Bangles'; 
import Tennis from './Page/Tennis'; 
import Charm from './Page/Charm'; 
import Cuff from './Page/Cuff'; 
import Chain from './Page/Chain'; 
import Payment from './Page/Payment';

import Artisanal from './Page/Artisanal'; 
import Heritage from './Page/Heritage'; 
import Wedding from './Page/Wedding'; 
import Ceremonial from './Page/Ceremonial'; // Import the Payment component
import { CartProvider } from './context/CartContext'; // Import the provider

function App() {
  return (
    <CartProvider> {/* Wrap the app with CartProvider */}
      <BrowserRouter>
        <NavBar /> {/* Barre de navigation en haut */}
        <Routes>
          {/* Routes pour chaque page */}
          <Route path="/" element={<Home />} />
          <Route path="/Boutique" element={<Boutique />} />
          <Route path="/Panier" element={<Panier />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/NouvelleCollection" element={<NouvelleCollection />} />
          <Route path="/Search" element={<Search />} />
          <Route path="/boucles-oreilles/Silver" element={<Silver />} />
          <Route path="/anneaux/Gold" element={<Gold />} />
          <Route path="/anneaux/Silver" element={<Silver />} />
          <Route path="/anneaux/Palladium" element={<Palladium />} /><Route path="/anneaux/Silver" element={<Silver />} />
          <Route path="/anneaux/Platinum" element={<Platinum />} /><Route path="/anneaux/Silver" element={<Silver />} />
          <Route path="/anneaux/RoseGold" element={<RoseGold />} />
          <Route path="/boucles-oreilles/Studs" element={<Studs />} />
          <Route path="/boucles-oreilles/Hoops" element={<Hoops />} />
          <Route path="/boucles-oreilles/Drops" element={<Drops />} />
          <Route path="/boucles-oreilles/Chandeliers" element={<Chandeliers />} />
          <Route path="/boucles-oreilles/Cuffs" element={<Cuffs />} />
          <Route path="/watches/Luxury" element={<Luxury />} />
          <Route path="/watches/Sport" element={<Sport />} />
          <Route path="/watches/Casual" element={<Casual />} />
          <Route path="/watches/Smart" element={<Smart />} />
          <Route path="/watches/Vintage" element={<Vintage />} />

          <Route path="/cliers/Pendants" element={<Pendants />} />
          <Route path="/cliers/Chains" element={<Chains />} />
          <Route path="/cliers/Pearls" element={<Pearls />} />
          <Route path="/cliers/Statement" element={<Statement />} />
          <Route path="/cliers/Chokers" element={<Chokers />} />
          
          <Route path="/braceles/Bangles" element={<Bangles />} />
          <Route path="/braceles/Tennis" element={<Tennis />} />
          <Route path="/braceles/Charm" element={<Charm />} />
          <Route path="/braceles/Cuff" element={<Cuff />} />
          <Route path="/braceles/Chain" element={<Chain />} />
          
          <Route path="/bijoux-traditionnels/Artisanal" element={<Artisanal />} />
          <Route path="/bijoux-traditionnels/Heritage" element={<Heritage />} />
          <Route path="/bijoux-traditionnels/Wedding" element={<Wedding />} />
          <Route path="/bijoux-traditionnels/Ceremonial" element={<Ceremonial />} />
          
          <Route path="/payment" element={<Payment />} /> {/* Add Payment route */}
        </Routes>
        <Footer /> {/* Footer en bas */}
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
