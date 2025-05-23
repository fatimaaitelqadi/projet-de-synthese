import React, { useState, useEffect, useRef } from 'react';
import { productService } from '../services/api';
import { FaPlus } from 'react-icons/fa';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import './BouclesOreilles.css';
import './Boutique.css';
import StarRating from '../components/StarRating';
import { useCart } from '../context/CartContext';

export default function Bangles() {
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();
  const sliderRef = useRef(null);
  const navigate = useNavigate();

  const IMAGE_BASE_URL = 'http://127.0.0.1:8000/storage/';

  // Materials data
  const materials = [
    { 
      id: 'gold', 
      name: 'Or', 
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&h=300&fit=crop&crop=center',
      description: 'Bracelets en or 18 carats',
      path: '/Bangles/gold'
    },
    { 
      id: 'silver', 
      name: 'Argent', 
      image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=300&h=300&fit=crop&crop=center',
      description: 'Bracelets en argent sterling 925',
      path: '/Bangles/silver'
    },
    { 
      id: 'diamond', 
      name: 'Diamant', 
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300&h=300&fit=crop&crop=center',
      description: 'Bracelets ornés de diamants',
      path: '/Bangles/diamond'
    },
    { 
      id: 'rose-gold', 
      name: 'Or Rose', 
      image: 'https://images.unsplash.com/photo-1588444650700-6a4d3e013230?w=300&h=300&fit=crop&crop=center',
      description: 'Bracelets en or rose 18 carats',
      path: '/Bangles/rose-gold'
    },
  ];

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  const handleMaterialClick = (path) => {
    navigate(path);
  };

  useEffect(() => {
    const fetchProduits = async () => {
      try {
        setLoading(true);
        const productsData = await productService.getAllProducts();
        console.log('API Response:', productsData);

        // Filter products for Bangles category
        const filtered = productsData.filter(
          (p) => p.category === 'Bangles' || p.name.includes('Bangles')
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
        console.error("Error fetching Bangles products:", err);
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
        <p>Loading Bangles products...</p>
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
            src="https://cdn.pixabay.com/vimeo/328218895/1080p.mp4" 
            autoPlay
            loop
            muted
            playsInline
          ></video>
        </div>

        {/* Overlay with content */}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center px-4">
          <div className="text-center text-white max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Bangles Collection</h1>
            <p className="text-xl md:text-2xl mb-8">
              Elegant bracelets to adorn your wrists with timeless beauty
            </p>
          </div>
        </div>
      </section>
      
      {/* Materials Slider Section */}
      <section className="materials-section py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Nos Matériaux</h2>
          <div className="materials-slider-container relative" ref={sliderRef}>
            <div className="materials-slider flex overflow-x-auto scrollbar-hide gap-6 pb-4">
              {materials.map((material, index) => (
                <div 
                  key={index} 
                  className="material-slide flex-shrink-0 w-80 h-64 rounded-lg overflow-hidden shadow-lg cursor-pointer transform transition hover:scale-105"
                  onClick={() => handleMaterialClick(material.path)}
                >
                  <div 
                    className="h-full w-full bg-cover bg-center relative"
                    style={{ backgroundImage: `url(${material.image})` }}
                  >
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-end p-6 hover:bg-opacity-20 transition">
                      <h3 className="text-white text-xl font-bold">{material.name}</h3>
                      <p className="text-white text-sm mt-2">{material.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center mt-6 gap-4">
            <button 
              className="bg-gray-800 text-white p-3 rounded-full hover:bg-gray-700 transition"
              onClick={scrollLeft}
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              className="bg-gray-800 text-white p-3 rounded-full hover:bg-gray-700 transition"
              onClick={scrollRight}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>
      
      <div className="boucles-oreilles-container">
        <h2>Bangles Collection</h2>
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
            <p>Aucun produit trouvé.</p>
          )}
        </div>
      </div>
    </>
  );
}
