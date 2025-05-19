import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaMinus, FaPlus, FaArrowLeft } from 'react-icons/fa';
import { productService } from '../services/api';
import StarRating from './StarRating';
import { useCart } from '../context/CartContext';
import '../styles/ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const IMAGE_BASE_URL = 'http://127.0.0.1:8000/storage/';

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        // Get all products and find the one with matching ID
        const products = await productService.getAllProducts();
        const foundProduct = products.find(p => p.id === parseInt(id));
        
        if (foundProduct) {
          setProduct({
            ...foundProduct,
            price: parseFloat(foundProduct.price),
            rating: foundProduct.rating || 4
          });
          setError(null);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        console.error("Error fetching product details:", err);
        setError('Failed to load product details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProductDetails();
    }
  }, [id]);

  const handleQuantityChange = (amount) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 10)) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = async () => {
    if (product) {
      try {
        await addToCart(product.id, quantity);
        // You could add a success notification here
      } catch (error) {
        console.error('Failed to add product to cart:', error);
        // You could add an error notification here
      }
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="error-container">
        <p className="error-message">{error || 'Product not found'}</p>
        <Link to="/" className="back-button">
          <FaArrowLeft /> Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="product-detail-container">
      <Link to="/" className="back-link">
        <FaArrowLeft /> Back to Collection
      </Link>

      <div className="product-detail-content">
        <div className="product-detail-image">
          {product.image ? (
            <img 
              src={`${IMAGE_BASE_URL}${product.image}`} 
              alt={product.name} 
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/placeholder-image.jpg';
              }}
            />
          ) : (
            <div className="product-no-image">No Image Available</div>
          )}
        </div>

        <div className="product-detail-info">
          <h1 className="product-detail-name">{product.name}</h1>
          
          <div className="product-detail-rating">
            <StarRating rating={product.rating} />
          </div>
          
          <div className="product-detail-price">
            {product.price.toFixed(2)} €
          </div>
          
          <div className="product-detail-description">
            <h2>Description</h2>
            <p>{product.description}</p>
          </div>

          {product.material && (
            <div className="product-detail-material">
              <h2>Material</h2>
              <p>{product.material}</p>
            </div>
          )}

          <div className="product-detail-stock">
            <span className={product.stock > 0 ? 'in-stock' : 'out-of-stock'}>
              {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
            </span>
          </div>

          <div className="product-detail-quantity">
            <h2>Quantity</h2>
            <div className="quantity-selector">
              <button 
                className="quantity-btn" 
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                <FaMinus />
              </button>
              <span className="quantity-value">{quantity}</span>
              <button 
                className="quantity-btn" 
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= product.stock}
              >
                <FaPlus />
              </button>
            </div>
          </div>

          <button 
            className="add-to-cart-button"
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 