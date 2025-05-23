import React, { useState, useEffect, useContext } from 'react';
import { productService } from '../services/api';
import { Link } from 'react-router-dom';
import '../Style/Boutique.css'; // Assuming you might want some styles
import { FaPlus, FaSync } from 'react-icons/fa'; // Import icons
import StarRating from '../components/StarRating'; // Import the StarRating component
import { useCart } from '../context/CartContext'; // Import useCart hook

export default function Boutique() {
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const { addToCart } = useCart(); // Get addToCart from context

  const IMAGE_BASE_URL = 'http://127.0.0.1:8000/storage/';

  // Helper function to get image URL
  const getImageUrl = (product) => {
    // First try to use the full URL if available
    if (product.image_full_url) {
      return product.image_full_url;
    }
    
    // Fall back to constructing the URL from the image path
    if (product.image_url || product.image) {
      const imagePath = product.image_url || product.image;
      if (!imagePath) return null;
      
      // Remove any leading slashes to avoid double slashes in the URL
      const cleanPath = imagePath.startsWith('/') ? imagePath.substring(1) : imagePath;
      return `${IMAGE_BASE_URL}${cleanPath}`;
    }
    
    return null;
  };

  const fetchProduits = async () => {
    try {
      setLoading(true);
      console.log('Fetching products for Boutique page... (Attempt: ' + (retryCount + 1) + ')');
      const productsData = await productService.getAllProducts();
      console.log('API Response:', productsData);

      if (!productsData || !Array.isArray(productsData)) {
        throw new Error('Invalid data format received from API');
      }

      // Transform the data to match the expected format
      const transformedProducts = productsData.map(product => ({
        id: product.id,
        name: product.name || product.nom || 'Unnamed Product',
        description: product.description || '',
        price: parseFloat(product.price || product.prix || 0),
        image_url: product.image || product.image_url || '',
        image_full_url: product.image_full_url || null,
        category: product.category || product.categorie || 'Uncategorized',
        stock: product.stock || product.stock_quantity || 0,
        rating: product.rating || 4
      }));

      console.log('Transformed Products:', transformedProducts);
      setProduits(transformedProducts);
      setError(null);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(err.message || 'Failed to load products. Please try again later.');
      setProduits([]);
    } finally {
      setLoading(false);
    }
  };

  // Retry mechanism
  const handleRetry = () => {
    setRetryCount(prevCount => prevCount + 1);
    fetchProduits();
  };

  useEffect(() => {
    fetchProduits();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button onClick={handleRetry} className="retry-button">
          <FaSync className="retry-icon" /> Try Again
        </button>
        <p className="error-help-text">
          Make sure the backend server is running at http://127.0.0.1:8000
        </p>
      </div>
    );
  }

  // If we have no products but also no error
  if (produits.length === 0) {
    return (
      <div className="empty-state-container">
        <h2>No products found</h2>
        <p>There are currently no products available in the store.</p>
        <button onClick={handleRetry} className="retry-button">
          <FaSync className="retry-icon" /> Refresh
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="boutique-container">
        <h1>Boutique</h1>
        <div className="product-grid">
          {produits.map((produit) => (
            <div key={produit.id} className="product-card">
              <div className="product-image-container">
                {getImageUrl(produit) ? (
                  <Link to={`/product/${produit.id}`} className="product-image-link">
                    <img
                      src={getImageUrl(produit)}
                      alt={produit.name}
                      className="product-image"
                      onError={(e) => {
                        console.log('Image failed to load:', e.target.src);
                        e.target.onerror = null;
                        e.target.src = '/placeholder-image.jpg';
                      }}
                    />
                  </Link>
                ) : (
                  <div className="product-no-image">No Image</div>
                )}
                {/* Add to Cart Button Overlay */}
                <button
                  className="add-to-cart-btn"
                  onClick={async () => {
                    try {
                      await addToCart(produit.id, 1);
                      // You could add a success notification here
                    } catch (error) {
                      console.error('Failed to add product to cart:', error);
                      // You could add an error notification here
                    }
                  }}
                  aria-label={`Add ${produit.name} to cart`}
                >
                  <FaPlus /> {/* Using react-icons */}
                </button>
              </div>
              {/* Wrap text content */}
              <div className="product-info">
                <h3>
                  <Link to={`/product/${produit.id}`} className="product-name-link">
                    {produit.name}
                  </Link>
                </h3>
                <p>{produit.description}</p>
                <StarRating rating={produit.rating} /> 
                <p className="product-price">{parseFloat(produit.price).toFixed(2)} €</p>
                <p className="product-stock">En stock: {produit.stock}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
