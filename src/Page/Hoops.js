import React, { useState, useEffect } from 'react';
import { productService } from '../services/api';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './BouclesOreilles.css';
import './Boutique.css';
import StarRating from '../components/StarRating';
import { useCart } from '../context/CartContext';

export default function Hoops() {
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  const IMAGE_BASE_URL = 'http://127.0.0.1:8000/storage/';

  useEffect(() => {
    const fetchProduits = async () => {
      try {
        setLoading(true);
        const productsData = await productService.getAllProducts();
        console.log('API Response:', productsData);

        // Filter products for Chains category
        const filtered = productsData.filter(
          (p) => p.category === 'Hoops' || p.name.includes('Hoops')
        );

        // Transform the data to match the expected format
        const transformedProducts = filtered.map(product => ({
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
        console.error("Error fetching Hoops products:", err);
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
        <p>Loading Hoops products...</p>
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
    
      
      <div className="boucles-oreilles-container">
        <h2>Hoops Collection</h2>
        <div className="product-grid">
          {produits.length > 0 ? (
            produits.map((produit) => (
              <div key={produit.id} className="product-card">
                <div className="product-image-container">
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
                  <StarRating rating={produit.rating} />
                  <p className="product-price">{parseFloat(produit.price).toFixed(2)} €</p>
                  <p className="product-stock">En stock: {produit.stock}</p>
                </div>
              </div>
            ))
          ) : (
            <p>Aucune créole trouvée.</p>
          )}
        </div>
      </div>
    </>
  );
}

