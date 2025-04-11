import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './components/NavBar'; // Export par défaut
import Home from './Page/Home'; // Export par défaut
import Panier from './Page/Panier'; // Export par défaut
import Boutique from './Page/Boutique'; // Export par défaut
import About from './Page/About.js'; // Export par défaut
import Footer from './components/Footer';
import Login from './Page/Login';
import NouvelleCollection from './Page/NouvelleCollection.js';
import Search from './Page/Search.js';

function App() {
  return (
     <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Boutique" element={<Boutique />} />
        <Route path="/Panier" element={<Panier />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/NouvelleCollection" element={<NouvelleCollection />} />
        <Route path="/Search" element={<Search />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;