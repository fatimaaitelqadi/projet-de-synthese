import React, { useState } from 'react';
import { FaCreditCard, FaPaypal, FaMoneyBillWave, FaWallet, FaCheckCircle, FaRegCircle } from 'react-icons/fa'; // Example icons
import './Payment.css';

const Payment = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card'); // 'card', 'paypal', 'cod', 'ewallet'

  // Placeholder - Add state for form inputs later

  return (
    <div className="payment-page-container">
      {/* Header/Search/User Icon - Assuming this is part of a main layout (like NavBar) */}
      
      {/* Checkout Step Indicator */}
      <div className="checkout-steps">
        <div className="step active"><FaRegCircle /><span>Shopping Cart</span></div>
        <div className="step active"><FaRegCircle /><span>Shipping Details</span></div>
        <div className="step current"><FaCheckCircle /><span>Payment and Billing</span></div>
        <div className="step"><FaRegCircle /><span>Order Confirmation</span></div> 
      </div>

      <div className="payment-content-area">
        {/* Left Side: Payment & Billing Details */}
        <div className="payment-details-billing">
          {/* Payment Method Selection */}
          <section className="payment-methods">
            <h3>Payment Details</h3>
            <div className="method-options">
              <button 
                className={`method-btn ${selectedPaymentMethod === 'card' ? 'active' : ''}`}
                onClick={() => setSelectedPaymentMethod('card')}
              >
                <FaCreditCard /> Debit/Credit Cards
              </button>
              <button 
                className={`method-btn ${selectedPaymentMethod === 'paypal' ? 'active' : ''}`}
                onClick={() => setSelectedPaymentMethod('paypal')}
              >
                <FaPaypal /> PayPal
              </button>
              <button 
                className={`method-btn ${selectedPaymentMethod === 'cod' ? 'active' : ''}`}
                onClick={() => setSelectedPaymentMethod('cod')}
              >
                <FaMoneyBillWave /> Cash On Delivery
              </button>
              <button 
                className={`method-btn ${selectedPaymentMethod === 'ewallet' ? 'active' : ''}`}
                onClick={() => setSelectedPaymentMethod('ewallet')}
              >
                <FaWallet /> eWallets
              </button>
            </div>
          </section>

          {/* Conditional Content Based on Method */}
          {selectedPaymentMethod === 'card' && (
            <section className="card-details">
              {/* Card Form Fields - Placeholders for now */}
              <div className="form-group">
                <label htmlFor="cardNumber">Credit Card Number</label>
                <input type="text" id="cardNumber" placeholder="4236 1234 7800 7861" />
              </div>
              <div className="form-group">
                <label htmlFor="cardHolder">Card Holder Name</label>
                <input type="text" id="cardHolder" placeholder="Pratik Shivanand Hegde" />
              </div>
              <div className="form-row">
                <div className="form-group expiry">
                  <label htmlFor="expiryDate">Validity Period</label>
                  <input type="text" id="expiryDate" placeholder="09 / 23" />
                </div>
                <div className="form-group cvv">
                  <label htmlFor="cvv">CVV</label>
                  <input type="text" id="cvv" placeholder="***" />
                </div>
              </div>
              <div className="form-check">
                <input type="checkbox" id="saveCard" />
                <label htmlFor="saveCard">Save card for later</label>
              </div>
            </section>
          )}

          {selectedPaymentMethod === 'paypal' && <p>Redirecting to PayPal...</p>}
          {selectedPaymentMethod === 'cod' && <p>Payment will be collected upon delivery.</p>}
          {selectedPaymentMethod === 'ewallet' && <p>Select your eWallet provider...</p>}
          
          {/* Billing Details Section */}
          <section className="billing-details">
            <h3>Billing Details</h3>
            {/* Billing Form Fields - Placeholders */}
            <div className="form-group">
              <label htmlFor="billingName">Name</label>
              <input type="text" id="billingName" />
            </div>
            {/* Add more billing fields as needed (Address, etc.) */}
          </section>
        </div>

        {/* Right Side: Options & Review */}
        <div className="options-review">
          <div className="option-box">
             <label>EMI Options</label>
             <select><option>Select EMI Option</option></select>
          </div>
           <div className="option-box">
             <label>Gifting Options</label>
             <select><option>Select Gifting Option</option></select>
          </div>
          <div className="option-box coupon-box">
            <label>Apply Coupon</label>
            <input type="text" placeholder="Coupon code..." />
            <span>2 available coupons</span>
          </div>
          <button className="review-order-btn">Review Order</button>
        </div>
      </div>
    </div>
  );
};

export default Payment; 