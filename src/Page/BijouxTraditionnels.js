import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './BijouxTraditionnels.css'; // Add specific styles if needed
import './Boutique.css'; // Import shared styles
import StarRating from '../components/StarRating';
import { useCart } from '../context/CartContext'; // Import useCart

export default function BijouxTraditionnels() {
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart(); // Get context function

  const API_URL = 'http://localhost:8000/api/produits';
  const IMAGE_BASE_URL = 'http://localhost:8000';

  useEffect(() => {
    const fetchProduits = async () => {
      try {
        setLoading(true);
        const response = await axios.get(API_URL);

        let allProduits = [];
        if (response.data && response.data.data) {
          allProduits = response.data.data;
        } else if (Array.isArray(response.data)) {
          allProduits = response.data;
        } else {
          console.error('BijouxTrad: Invalid data format', response.data);
        }

        const filtered = allProduits.filter(
          (p) => p.name === 'les Bijoux Traditionnels' // Case-sensitive match
        );

        setProduits(filtered);
        setError(null);
      } catch (err) {
        console.error("Error fetching Bijoux Traditionnels:", err);
        setError('Failed to load products.');
        setProduits([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProduits();
  }, []);

  if (loading) return <div className="loading-container">
    <div className="loading-spinner"></div>
    <p>Loading Bijoux Traditionnels...</p>
  </div>;
  
  if (error) return <div className="error-container">
    <p className="error-message">{error}</p>
    <button onClick={() => window.location.reload()} className="retry-button">
      Try Again
    </button>
  </div>;

  return (
    <>
      <section className="relative w-full h-screen bg-black overflow-hidden">
        {/* Video Container */}
        <div className="absolute inset-0 w-full h-full">
          <video
            className="w-full h-full object-cover"
            src="https://cdn.pixabay.com/vimeo/414869041/1080p.mp4" 
            autoPlay
            loop
            muted
            playsInline
          ></video>
        </div>

        {/* Overlay with content */}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center px-4">
          <div className="text-center text-white max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Bijoux Traditionnels</h1>
            <p className="text-xl md:text-2xl mb-8">
              Découvrez notre collection de bijoux traditionnels, témoins de notre riche patrimoine culturel
            </p>
          </div>
        </div>
      </section>
      
      <div className="bijoux-trad-container">
        <h2>Bijoux Traditionnels</h2>
        <div className="product-grid">
          {produits.length > 0 ? (
            produits.map((produit) => (
              <div key={produit.id} className="product-card">
                <div className="product-image-container">
                  {produit.image_url ? (
                    <Link to={`/product/${produit.id}`} className="product-image-link">
                      <img src={`${IMAGE_BASE_URL}${produit.image_url}`} alt={produit.name} className="product-image" />
                    </Link>
                  ) : (
                    <div className="product-no-image">No Image</div>
                  )}
                  <button
                    className="add-to-cart-btn"
                    onClick={() => addToCart(produit)}
                    aria-label={`Add ${produit.name} to cart`}
                  >
                    <FaPlus />
                  </button>
                </div>
                <div className="product-info">
                  <h3>
                    <Link to={`/product/${produit.id}`} className="product-name-link">
                      {produit.name}
                    </Link>
                  </h3>
                  <p>{produit.description}</p>
                  <StarRating rating={produit.rating || 4} />
                  <p className="product-price">{parseFloat(produit.price).toFixed(2)} €</p>
                </div>
              </div>
            ))
          ) : (
            <p>Aucun bijou traditionnel trouvé.</p>
          )}
        </div>
      </div>
    </>
  );
}
