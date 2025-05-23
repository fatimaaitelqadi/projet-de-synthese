import React, { useState, useEffect, useContext } from 'react';
import { productService } from '../services/api';
import { Link } from 'react-router-dom';
import '../Style/Boutique.css'; // Assuming you might want some styles
import { FaPlus } from 'react-icons/fa'; // Import a plus icon
import StarRating from '../components/StarRating'; // Import the StarRating component
import { useCart } from '../context/CartContext'; // Import useCart hook

export default function Boutique() {
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart(); // Get addToCart from context

  const IMAGE_BASE_URL = 'http://127.0.0.1:8000/storage/';

  useEffect(() => {
    const fetchProduits = async () => {
      try {
        setLoading(true);
        const productsData = await productService.getAllProducts();
        console.log('API Response:', productsData);

        // Transform the data to match the expected format
        const transformedProducts = productsData.map(product => ({
          id: product.id,
          name: product.name,
          description: product.description,
          price: parseFloat(product.price),
          image_url: product.image,
          category: product.category,
          stock: product.stock,
          rating: product.rating || 4
        }));

        console.log('Transformed Products:', transformedProducts);
        setProduits(transformedProducts);
        setError(null);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError('Failed to load products. Please try again later.');
        setProduits([]);
      } finally {
        setLoading(false);
      }
    };

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
        <button onClick={() => window.location.reload()} className="retry-button">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <>
     
      
      <div className="boutique-container">
        <h1>Boutique</h1>
        <div className="product-grid">
          {produits.length > 0 ? (
            produits.map((produit) => (
              <div key={produit.id} className="product-card">
                <div className="product-image-container"> {/* New container */}
                  {produit.image_url ? (
                    <Link to={`/product/${produit.id}`} className="product-image-link">
                      <img
                        src={`${IMAGE_BASE_URL}${produit.image_url}`}
                        alt={produit.name}
                        className="product-image"
                        onError={(e) => {
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
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </div>
    </>
  );
}
