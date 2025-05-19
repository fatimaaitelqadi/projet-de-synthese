import React, { useState, useEffect } from 'react';
import { productService } from '../services/api';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './BouclesOreilles.css';
import './Boutique.css';
import StarRating from '../components/StarRating';
import { useCart } from '../context/CartContext';

export default function Ceremonial() {
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

        // Filter products for Ceremonial category
        const filtered = productsData.filter(
          (p) => p.category === 'Ceremonial' || p.name.includes('Ceremonial')
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
        console.error("Error fetching Ceremonial products:", err);
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
        <p>Loading Ceremonial products...</p>
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
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Ceremonial Collection</h1>
            <p className="text-xl md:text-2xl mb-8">
              Des bijoux exceptionnels pour vos moments les plus précieux
            </p>
          </div>
        </div>
      </section>
      
      <div className="boucles-oreilles-container">
        <h2>Ceremonial Collection</h2>
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
            <p>Aucun produit cérémonial trouvé.</p>
          )}
        </div>
      </div>
    </>
  );
}

