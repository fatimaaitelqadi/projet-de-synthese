import React from 'react';
import { useCart } from '../context/CartContext';
import { FaPlus } from 'react-icons/fa';
import '../Style/ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product._id, 1);
  };

  // Generate star rating display
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating || 0);
    const hasHalfStar = (rating || 0) % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<span key={i} className="star filled">★</span>);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<span key={i} className="star half">★</span>);
      } else {
        stars.push(<span key={i} className="star">☆</span>);
      }
    }
    return stars;
  };

  // Handle potentially missing image
  const renderImage = () => {
    if (product.image) {
      return (
        <img 
          src={product.image}
          alt={product.name} 
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/placeholder-image.jpg';
          }}
        />
      );
    }
    return <div className="no-image">Pas d'image</div>;
  };

  return (
    <div className="product-card">
      <div className="product-image">
        {renderImage()}
        <button 
          className="quick-add-btn"
          onClick={handleAddToCart}
          aria-label="Add to cart"
        >
          <FaPlus />
        </button>
      </div>
      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>
        <div className="rating">
          {renderStars(product.rating)}
        </div>
        <p className="product-description">{product.description}</p>
        <div className="product-price">
          <span className="current-price">{typeof product.price === 'number' ? product.price.toFixed(2) : product.price}MAD</span>
          {product.oldPrice && (
            <span className="old-price">{product.oldPrice.toFixed(2)}MAD</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 