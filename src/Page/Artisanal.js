import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './BouclesOreilles.css'; // Add specific styles if needed
import './Boutique.css'; // Import shared styles
import StarRating from '../components/StarRating'; // Import shared component
import { useCart } from '../context/CartContext'; // Import useCart
// Import shared styles if necessary, e.g., import './Boutique.css';

// Simple component to render stars (Duplicate - consider moving to a shared file)
/*
const StarRating = ({ rating }) => {
  const totalStars = 5;
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = totalStars - fullStars - halfStar;

  return (
    <div className="star-rating">
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={`full-${i}`} />
      ))}
      {halfStar === 1 && <FaStarHalfAlt key="half" />}
      {[...Array(emptyStars)].map((_, i) => (
        <FaRegStar key={`empty-${i}`} />
      ))}
    </div>
  );
};
*/

export default function Artisanal() {
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
          console.error('BouclesOreilles: Invalid data format', response.data);
        }

        const filtered = allProduits.filter(
          (p) => p.name === 'Bijoux Traditionnels Artisanal' // Case-sensitive match
        );

        setProduits(filtered);
        setError(null);
      } catch (err) {
        console.error("Error fetching Boucles Oreilles:", err);
        setError('Failed to load products.');
        setProduits([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProduits();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

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
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Bijoux Traditionnels Artisanal</h1>
            <p className="text-xl md:text-2xl mb-8">
              Des pièces uniques créées par des artisans talentueux selon des techniques ancestrales
            </p>
          </div>
        </div>
      </section>
      
      <div className="boucles-oreilles-container">
        <h2>Bijoux Traditionnels Artisanal</h2>
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
            <p>Aucune boucle d'oreille trouvée.</p>
          )}
        </div>
      </div>
    </>
  );
}
