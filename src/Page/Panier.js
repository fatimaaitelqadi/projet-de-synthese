import React from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrashAlt, FaPlus, FaMinus, FaShippingFast, FaCreditCard, FaHeadset } from 'react-icons/fa'; // Import icons
import './Panier.css'; // Import the CSS file we will create

// Update the base URL to match your Laravel storage path
const IMAGE_BASE_URL = 'http://localhost:8000/storage/';

const Panier = () => {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    subTotal,
    total, // Using the total calculated in context (currently same as subTotal)
    totalItems // Get totalItems from context
  } = useCart();
  const navigate = useNavigate(); // Initialize navigate

  const handleQuantityChange = (id, amount) => {
    updateQuantity(id, amount);
  };

  const handleRemoveItem = (id) => {
    removeFromCart(id);
  };

  const handleClearCart = () => {
    clearCart();
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  const handleCheckout = () => {
    // Add any pre-navigation logic if needed (e.g., validation)
    navigate('/payment'); // Navigate to the payment page
  };

  return (
    <div className="panier-container">
      <div className="panier-header">
        <h1>Shopping Cart</h1>
        <div className="breadcrumbs">
          <Link to="/">Home</Link> / <span>Shopping Cart</span>
        </div>
      </div>

      {cartItems.length === 0 ? (
        <div className="empty-cart-message">
          <i className="fas fa-shopping-cart"></i>
          <p>Your shopping cart is empty.</p>
          <Link to="/boutique" className="continue-shopping-btn">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="panier-content">
          <div className="cart-items-section">
            {/* Cart Table Header */}
            <div className="cart-table-header">
              <div className="header-product">Product</div>
              <div className="header-price">Price</div>
              <div className="header-quantity">Quantity</div>
              <div className="header-subtotal">Subtotal</div>
            </div>

            {/* Cart Items List */}
            <div className="cart-items-list">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <button 
                    onClick={() => handleRemoveItem(item.id)} 
                    className="remove-item-btn" 
                    aria-label="Remove item"
                  >
                    <FaTrashAlt />
                  </button>
                  <div className="item-product">
                    <img
                      src={item.image ? `${IMAGE_BASE_URL}${item.image}` : '/placeholder.jpg'}
                      alt={item.name}
                      className="item-image"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/placeholder.jpg';
                      }}
                    />
                    <div className="item-details">
                      <span className="item-name">{item.name}</span>
                      <span className="item-category">{item.category}</span>
                    </div>
                  </div>
                  <div className="item-price">{formatPrice(item.price)}</div>
                  <div className="item-quantity">
                    <button 
                      onClick={() => handleQuantityChange(item.id, -1)}
                      disabled={item.quantity <= 1}
                      className="quantity-btn"
                    >
                      <FaMinus />
                    </button>
                    <span className="quantity-number">{item.quantity}</span>
                    <button 
                      onClick={() => handleQuantityChange(item.id, 1)}
                      disabled={item.quantity >= item.stock}
                      className="quantity-btn"
                    >
                      <FaPlus />
                    </button>
                  </div>
                  <div className="item-subtotal">
                    {formatPrice(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            {/* Coupon and Clear Cart Section */}
            <div className="cart-actions">
              <div className="coupon-section">
                <input 
                  type="text" 
                  placeholder="Coupon Code" 
                  className="coupon-input" 
                />
                <button className="apply-coupon-btn">Apply Coupon</button>
              </div>
              <button 
                onClick={handleClearCart} 
                className="clear-cart-btn"
              >
                Clear Shopping Cart
              </button>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="order-summary-section">
            <h2>Order Summary</h2>
            <div className="summary-details">
              <div className="summary-row">
                <span>Items ({totalItems})</span> 
                <span>{formatPrice(subTotal)}</span> 
              </div>
              <div className="summary-row">
                <span>Sub Total</span>
                <span>{formatPrice(subTotal)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>{formatPrice(0)}</span> {/* Placeholder */}
              </div>
              <div className="summary-row">
                <span>Taxes</span>
                <span>{formatPrice(0)}</span> {/* Placeholder */}
              </div>
              <div className="summary-row coupon-discount">
                <span>Coupon Discount</span>
                <span>-{formatPrice(0)}</span> {/* Placeholder */}
              </div>
              <div className="summary-row total-row">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
            <button 
              className="checkout-btn" 
              onClick={handleCheckout}
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      )}

      {/* Bottom Info Boxes */}
      <div className="bottom-info-boxes">
         <div className="info-box">
           <FaShippingFast className="info-box-icon" />
           <div>
             <h3>Free Shipping</h3>
             <p>Free shipping for order above 180€</p>
           </div>
         </div>
         <div className="info-box">
           <FaCreditCard className="info-box-icon" />
           <div>
             <h3>Flexible Payment</h3>
             <p>Multiple secure payment options</p>
           </div>
         </div>
         <div className="info-box">
           <FaHeadset className="info-box-icon" />
           <div>
             <h3>24x7 Support</h3>
             <p>We support online all days.</p>
           </div>
         </div>
      </div>

    </div>
  );
};

export default Panier;
