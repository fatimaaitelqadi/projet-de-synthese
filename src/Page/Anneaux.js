// src/Page/Anneaux.js
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios'; // Make sure axios is installed
import { FaStar, FaStarHalfAlt, FaRegStar, FaPlus } from 'react-icons/fa'; // Added for star rating and plus icon
import './Anneaux.css'; // Assuming you want styles specific to this page
import './Boutique.css'; // Import shared styles
import StarRating from '../components/StarRating'; // Import shared component
import { useCart } from '../context/CartContext'; // Import useCart

// Simple component to render stars (Duplicate from Boutique.js - consider moving to a shared file)
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

function Anneaux() {
  const [anneauxProduits, setAnneauxProduits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart(); // Get context function

  // Define API URL (adjust if your backend runs elsewhere)
  const API_URL = 'http://localhost:8000/api/produits';
  const IMAGE_BASE_URL = 'http://localhost:8000'; // Base URL for images

  useEffect(() => {
    const fetchAnneaux = async () => {
      try {
        setLoading(true);
        const response = await axios.get(API_URL);
        console.log('API Response (Anneaux):', response.data);

        let allProduits = [];
        if (response.data && response.data.data) {
          allProduits = response.data.data;
        } else {
          allProduits = response.data || [];
          console.warn('API response structure might differ from expected pagination format.');
        }

        // Filter products where name is exactly "Anneaux"
        const filteredProduits = allProduits.filter(
          (produit) => produit.name === 'Anneaux' // Case-sensitive match
          // Use produit.name.toLowerCase() === 'anneaux' for case-insensitive
        );

        setAnneauxProduits(filteredProduits);
        setError(null);
      } catch (err) {
        console.error("Error fetching anneaux products:", err);
        setError('Failed to load products. Please try again later.');
        setAnneauxProduits([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAnneaux();
  }, []);

  if (loading) {
    return <div>Loading anneaux...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>Error: {error}</div>;
  }

  return (
    <div className="anneaux-container">
      <h2>Les Anneaux</h2>
      <div className="product-grid">
        {anneauxProduits.length > 0 ? (
          anneauxProduits.map((produit) => (
            <div key={produit.id} className="product-card">
              <div className="product-image-container">
                {produit.image_url ? (
                  <img
                    src={`${IMAGE_BASE_URL}${produit.image_url}`}
                    alt={produit.name}
                    className="product-image"
                  />
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
              {/* Wrap text content */}
              <div className="product-info">
                <h3>{produit.name}</h3>
                <p>{produit.description}</p>
                <StarRating rating={produit.rating || 4} />
                <p className="product-price">{parseFloat(produit.price).toFixed(2)} €</p>
              </div>
            </div>
          ))
        ) : (
          <p>Aucun anneau trouvé.</p>
        )}
      </div>
    </div>
  );
}

export default Anneaux;
