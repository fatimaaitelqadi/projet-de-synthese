import React from 'react';
import { Link } from 'react-router-dom';
import './Boutique.css';

export default function Gifts() {
  return (
    <div className="gifts-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Find the Perfect Gift</h1>
          <p>Discover exquisite jewelry gifts for every occasion and everyone you love</p>
          <div className="hero-buttons">
            <Link to="/gifts/bestselling" className="btn primary-btn">Shop Bestsellers</Link>
            <Link to="/gifts/services/personal-finder" className="btn secondary-btn">Gift Finder</Link>
          </div>
        </div>
      </section>

      <section className="gift-categories">
        <h2>Shop by Category</h2>
        <div className="category-grid">
          <div className="category-card">
            <Link to="/gifts/for-her">
              <img src="/images/gifts/for-her.jpg" alt="Gifts for Her" />
              <h3>For Her</h3>
            </Link>
          </div>
          <div className="category-card">
            <Link to="/gifts/for-him">
              <img src="/images/gifts/for-him.jpg" alt="Gifts for Him" />
              <h3>For Him</h3>
            </Link>
          </div>
          <div className="category-card">
            <Link to="/gifts/wedding">
              <img src="/images/gifts/wedding.jpg" alt="Wedding Gifts" />
              <h3>Wedding</h3>
            </Link>
          </div>
          <div className="category-card">
            <Link to="/gifts/anniversary">
              <img src="/images/gifts/anniversary.jpg" alt="Anniversary Gifts" />
              <h3>Anniversary</h3>
            </Link>
          </div>
        </div>
      </section>

      <section className="gift-occasions">
        <h2>Shop by Occasion</h2>
        <div className="occasions-grid">
          <div className="occasion-item">
            <Link to="/gifts/birthday">
              <div className="occasion-icon">🎂</div>
              <h3>Birthday</h3>
            </Link>
          </div>
          <div className="occasion-item">
            <Link to="/gifts/graduation">
              <div className="occasion-icon">🎓</div>
              <h3>Graduation</h3>
            </Link>
          </div>
          <div className="occasion-item">
            <Link to="/gifts/wedding">
              <div className="occasion-icon">💍</div>
              <h3>Wedding</h3>
            </Link>
          </div>
          <div className="occasion-item">
            <Link to="/gifts/anniversary">
              <div className="occasion-icon">💝</div>
              <h3>Anniversary</h3>
            </Link>
          </div>
          <div className="occasion-item">
            <Link to="/gifts/holiday">
              <div className="occasion-icon">🎄</div>
              <h3>Holiday</h3>
            </Link>
          </div>
        </div>
      </section>

      <section className="featured-gifts">
        <h2>Featured Gift Collections</h2>
        <div className="featured-grid">
          <div className="featured-card">
            <Link to="/gifts/bestselling">
              <img src="/images/gifts/bestsellers.jpg" alt="Bestselling Gifts" />
              <div className="featured-content">
                <h3>Bestsellers</h3>
                <p>Our most loved gifts</p>
              </div>
            </Link>
          </div>
          <div className="featured-card">
            <Link to="/gifts/romantic">
              <img src="/images/gifts/romantic.jpg" alt="Romantic Gifts" />
              <div className="featured-content">
                <h3>Romantic Gifts</h3>
                <p>Express your love</p>
              </div>
            </Link>
          </div>
          <div className="featured-card">
            <Link to="/gifts/precious">
              <img src="/images/gifts/precious.jpg" alt="Precious Gifts" />
              <div className="featured-content">
                <h3>Precious Gifts</h3>
                <p>Timeless treasures</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="gift-services">
        <h2>Gift Services</h2>
        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon">🎁</div>
            <h3>Gift Wrapping</h3>
            <p>Complimentary elegant gift wrapping with every purchase</p>
          </div>
          <div className="service-card">
            <div className="service-icon">💌</div>
            <h3>Personalized Note</h3>
            <p>Add a personal message to your gift</p>
          </div>
          <div className="service-card">
            <div className="service-icon">🚚</div>
            <h3>Express Delivery</h3>
            <p>Fast shipping options available</p>
          </div>
          <div className="service-card">
            <div className="service-icon">💳</div>
            <h3>Gift Cards</h3>
            <p>Let them choose their perfect gift</p>
            <Link to="/gifts/services" className="btn small-btn">Shop Gift Cards</Link>
          </div>
        </div>
      </section>
    </div>
  );
} 