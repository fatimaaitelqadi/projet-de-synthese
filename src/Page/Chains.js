import React, { useState, useEffect } from 'react';
import { productService } from '../services/api';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './BouclesOreilles.css';
import './Boutique.css';
import StarRating from '../components/StarRating';
import { useCart } from '../context/CartContext';

export default function Chains() {
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

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

  useEffect(() => {
    const fetchProduits = async () => {
      try {
        setLoading(true);
        console.log('Fetching products for Chains category...');
        const productsData = await productService.getAllProducts();
        console.log('Raw API Response:', productsData);

        if (!productsData || !Array.isArray(productsData)) {
          throw new Error('Invalid data format received from API');
        }

        // Filter products for Chains category - handle different field names
        const filtered = productsData.filter(p => {
          const category = p.category || p.categorie;
          const name = p.name || p.nom;
          return category === 'Chains' || 
                 (name && name.toLowerCase().includes('chains')) ||
                 (category && category.toLowerCase().includes('chain'));
        });

        console.log('Filtered products:', filtered);

        // Transform the data to match the expected format, handling different field names
        const transformedProducts = filtered.map(product => ({
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
        console.error("Error fetching Chains products:", err);
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
        <p>Loading Chains products...</p>
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
        <h2>Chains Collection</h2>
        <div className="product-grid">
          {produits.length > 0 ? (
            produits.map((produit) => (
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
            <p>Aucune chaîne trouvée.</p>
          )}
        </div>
      </div>
    </>
  );
}

