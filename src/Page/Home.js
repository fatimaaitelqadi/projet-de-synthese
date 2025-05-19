import React, { useState,useEffect}  from 'react';
import '../Style/Home.css';
import ProductImage from '../Image/Image.jpg'; // Placeholder for product images
import ProductImage2 from '../Image/Image1.jpg'; // Placeholder for product images
import Icon from '../Image/cart.png'; // For shipping icons
import Or from '../Image/Image10.jpg';
import Argent from '../Image/Image12.jpg';
import Pierre from '../Image/Image13.jpg';
import Plaquer from '../Image/Image14.jpg';
import { Link } from 'react-router-dom'; // For navigation links
import Gold from '../Image/Image16.jpg';
import Gold2 from '../Image/Image17.jpg'; 
import Gold3 from '../Image/Image18.jpg'; 
import FeatureIcon from '../Image/des-pierres.png'; // For feature icons
import FeatureIcon2 from '../Image/couronne (6).png'; // For
import FeatureIcon3 from '../Image/favori.png';
import FeatureIcon4 from '../Image/Image20.jpg'; // For feature icons
import FeatureIcon5 from '../Image/Image21.jpg'; // For
import FeatureIcon6 from '../Image/Image22.jpg'; // For
import FeatureIcon7 from '../Image/Image23.jpg'; 
import FeatureIcon8 from '../Image/Image24.jpg'; // For
import FeatureIcon9 from '../Image/Image25.jpg'; // 
import SocialIcon from '../Image/cart.png'; // For social media icons
import SecurityIcon from '../Image/cart.png'; // For security/certificate icons
import CategoryIcon from '../Image/cart.png'; // For category navigation icons
import Icon2 from '../Image/etat-civil.png';

import Icon1 from '../Image/etat-civil.png';
export default function Home() {
  const [email, setEmail] = useState('');

  // Product data
  const bestSellers = [
    { name: "18k Hoop Earrings", price: "1000 MAD", rating: 4.8 , image: ProductImage2},
    { name: "Gold Plated Ring", price: "500 MAD", rating: 4.9 , image: Gold},
    { name: "Diamond Necklace", price: "2500 MAD", rating: 5.0 , image: Gold2},
    { name: "Silver Bracelet", price: "350 MAD", rating: 4.7 , image: Gold3 }
  ];
  const images = [FeatureIcon7, FeatureIcon8, FeatureIcon9, FeatureIcon4, FeatureIcon5, FeatureIcon6];
  // Traditional jewelry features
  const features = [
    { 
      title: "Artisanat Traditionnel", 
      description: "Chaque bijou est fabriqué à la main par nos artisans selon des techniques traditionnelles transmises de génération en génération." ,
      image:FeatureIcon2
    },
    { 
      title: "Matériaux Authentiques", 
      description: "Nous utilisons uniquement des matériaux authentiques et de haute qualité, choisis avec soin pour leur beauté et leur durabilité." ,
      image:FeatureIcon
  
    },
    { 
      title: "Designs Uniques", 
      description: "Nos designs s'inspirent du riche patrimoine culturel tout en apportant une touche contemporaine pour la femme moderne." ,
      image:FeatureIcon3
    }
  ];

  // Quality materials data
  const materials = [
    { name: "Or 18K", description: "Luxe et éclat durable.", image: Or},
    { name: "Argent 925", description: "Brillance pure et élégante.", image: Argent },
    { name: "Pierres Naturelles", description: "Authentiques et uniques", image: Pierre },
    { name: "Plaqué Or", description: "Finition dorée, style chic.", image: Plaquer }
];
  // Category icons
  const categories = [
    { name: "Bagues", icon: "💍" },
    { name: "Colliers", icon: "📿" },
    { name: "Bracelets", icon: "🔗" },
    { name: "Coffrets Cadeaux", icon: "🎁" },
  ];

  // Brand commitments
  const commitments = [
    { title: "Satisfait ou remboursé", description: "Retours faciles sous 14 jours", icon: "✨" },
    { title: "Livraison rapide", description: "Suivie par email & SMS", icon: "🚚" },
    { title: "Service client", description: "Réactif 7j/7", icon: "📞" },
    { title: "Éco-responsable", description: "Emballages recyclables", icon: "♻️" }
  ];

  // Collections
  const collections = [
    { name: "Colliers", image: ProductImage },
    { name: "Bagues", image: ProductImage },
    { name: "Bracelets", image: ProductImage },
    { name: "Boucles d'oreilles", image: ProductImage },
  ];

  // Customer reviews
  const reviews = [
    { name: "Sophie L.", text: "Des bijoux magnifiques et de grande qualité. Je suis ravie de mon achat!", rating: 5 },
    { name: "Marie T.", text: "Le service client est exceptionnel et les bijoux sont superbes. Je recommande!", rating: 5 },
    { name: "Léa D.", text: "J'ai offert un collier à ma mère, elle l'adore! Merci pour la livraison rapide.", rating: 4 }
  ];

  // Social Media Links
  const socialMedia = [
    { name: "Instagram", icon: SocialIcon, link: "#" },
    { name: "Facebook", icon: SocialIcon, link: "#" },
    { name: "TikTok", icon: SocialIcon, link: "#" },
    { name: "Pinterest", icon: SocialIcon, link: "#" }
  ];

  // Newsletter subscription handler
  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Merci de vous être inscrit avec l'email: ${email}`);
    setEmail('');
  };

  // Render stars for ratings
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={i < Math.floor(rating) ? "star filled" : "star"}>
          ★
        </span>
      );
    }
    return stars;
  };
  
  return (
    <div className="container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Bienvenue sur L'ÉléganceGem</h1>
          <p className="hero-text">
            Découvrez notre collection exclusive de bijoux traditionnels et modernes
            créés pour sublimer votre beauté
          </p>
          <Link to="/boutique"> <button className="cta-button">Commencez à Acheter</button> </Link>
        </div>
      </section>
      
      {/* Quick Category Navigation */}
      <section className="category-navigation">
        <h2 className="section-title">Explorez nos collections</h2>
        <div className="icon-categories">
          {categories.map((category, index) => (
            <div key={index} className="icon-category">
              <div className="category-icon">{category.icon}</div>
              <p className="category-name-small">{category.name}</p>
            </div>
          ))}
        </div>
      </section>
      
      {/* Immersive Video Section */}
      
      {/* Collection Navigation */}
      <section className="collection-nav">
        <h2 className="section-title">Nos Collections</h2>
        <div className="category-grid">
          {collections.map((collection, index) => (
            <div key={index} className="category-card">
              <div className="category-name">{collection.name}</div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Traditional Jewelry */}
      <section className="traditional-section">
        <h2 className="section-title">Bijoux Traditionnels</h2>
        <div className="traditional-banner">
          <div className="traditional-content">
            <h3 className="traditional-title">L'héritage culturel en bijouterie</h3>
            <p className="traditional-text">
              Découvrez notre collection exclusive de bijoux traditionnels, fabriqués à la main
              selon des méthodes ancestrales. Chaque pièce raconte une histoire et porte en elle
              un savoir-faire transmis de génération en génération.
            </p>
            <button className="traditional-button">Explorer la Collection</button>
          </div>
        </div>
        
        <div className="traditional-features">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <img src={feature.image}  className="feature-icon" />
              <h4 className="feature-title">{feature.title}</h4>
              <p className="feature-text">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
      
      {/* Materials Showcase */}
      <section className="materials-section">
        <h2 className="section-title">Des Matériaux d'Exception</h2>
        <p className="materials-intro">Sélectionnés avec soin pour leur qualité et leur beauté</p>
        
        <div className="materials-grid">
          {materials.map((material, index) => (
            <div key={index} className="material-card">
              <img src={material.image} className="material-icon" />
              <h4 className="material-name">{material.name}</h4>
              <p className="material-description">{material.description}</p>
            </div>
          ))}
        </div>
      </section>
      
      {/* Best Sellers */}
     {/* <section className="best-sellers">
        <h2 className="section-title">Magasinez les meilleures ventes</h2>
        <div className="product-grid">
          {bestSellers.map((product, index) => (
            <div key={index} className="product-card">
              <img className="product-image" src={product.image}/>
              <div className="product-details">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">{product.price}</p>
                <div className="product-rating">
                  {renderStars(product.rating)}
                  <span className="rating-value">({product.rating})</span>
                </div>
                <button className="product-button">Acheter</button>
              </div>
            </div>
          ))}
        </div>
      </section>*/}
      
      {/* Gift Section */}
      <section className="gift-section">
        <div className="gift-content">
          <h2 className="gift-title">Offrir un bijou</h2>
          <p className="gift-text">
            Le cadeau parfait pour toutes les occasions spéciales : 
            anniversaires, fiançailles, mariages ou simplement pour dire "merci".
          </p>
          <p className="gift-highlight">
            Une carte personnalisée offerte avec chaque commande
          </p>
          <button className="gift-button">Idées Cadeaux</button>
        </div>
        <div className="gift-image-placeholder"></div>
      </section>
      
      {/* Sale Section */}
      <section className="sale-section">
        <h2 className="section-title">Solde Exceptionnel</h2>
        <div className="sale-grid">
          <div className="sale-item large-sale">
            <img src={ProductImage} alt="Jewelry on sale" className="sale-image" />
            <div className="discount-badge">20%</div>
            <div className="countdown-container">
              <p className="countdown-text">Se termine dans</p>
              <div className="countdown">2j 05h 37m</div>
            </div>
          </div>
          <div className="sale-item">
            <img src={ProductImage} alt="Jewelry on sale" className="sale-image" />
            <div className="sale-overlay">
              <p>Jusqu'à 30% sur les collections d'été</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Loyalty Program */}
      <section className="loyalty-section">
        <div className="loyalty-content">
          <h2 className="loyalty-title">Programme Fidélité</h2>
          <div className="loyalty-features">
            <div className="loyalty-feature">
              <h3>Cumulez des points</h3>
              <p>À chaque achat et obtenez des réductions exclusives</p>
            </div>
            <div className="loyalty-feature">
              <h3>Parrainez un ami</h3>
              <p>Recevez 10% de réduction sur votre prochaine commande</p>
            </div>
          </div>
          <button className="loyalty-button">Rejoindre le Programme</button>
        </div>
      </section>
      
      {/* Customer Reviews */}
      <section className="reviews-section">
        <h2 className="section-title">Ce que nos clients disent</h2>
        <div className="reviews-container">
          {reviews.map((review, index) => (
            <div key={index} className="review-card">
              <div className="review-stars">
                {renderStars(review.rating)}
              </div>
              <p className="review-text">"{review.text}"</p>
              <p className="review-author">— {review.name}</p>
            </div>
          ))}
        </div>
      </section>
      
      {/* About Us Short */}
      <section className="about-section">
        <h2 className="section-title">À propos de nous</h2>
        <p className="about-text">
          Notre passion est de sublimer chaque moment avec des bijoux faits avec amour et précision.
          Depuis notre création, nous nous engageons à offrir des pièces uniques qui racontent
          une histoire et incarnent l'élégance intemporelle.
        </p>
        <button className="about-button">En savoir plus</button>
      </section>
      
      {/* Brand Commitments */}
      <section className="commitments-section">
        <h2 className="section-title">Pourquoi choisir notre boutique ?</h2>
        <div className="commitments-grid">
          {commitments.map((commitment, index) => (
            <div key={index} className="commitment-card">
              <div className="commitment-icon">{commitment.icon}</div>
              <h3 className="commitment-title">{commitment.title}</h3>
              <p className="commitment-text">{commitment.description}</p>
            </div>
          ))}
        </div>
      </section>
      
      {/* Security & Certificates */}
      <section className="security-section">
        <div className="security-badges">
          <div className="security-badge">
            <img src={SecurityIcon} alt="SSL Secure" className="security-icon" />
            <span>Paiement Sécurisé SSL</span>
          </div>
          <div className="security-badge">
            <img src={SecurityIcon} alt="Quality Guarantee" className="security-icon" />
            <span>Garantie Qualité</span>
          </div>
          <div className="security-badge">
            <img src={SecurityIcon} alt="Artisan Label" className="security-icon" />
            <span>Label Artisanal</span>
          </div>
        </div>
      </section>
      
      {/* Instagram Gallery */}
      <section className="instagram-section">
        <h2 className="section-title">Nos bijoux portés par vous</h2>
        <p className="instagram-text">Partagez votre style avec #BijouxByMalak</p>
        <div className="instagram-grid">
  {images.map((image, index) => (
    <div key={index} className="instagram-item">
      <img
        src={image}
        alt={`Instagram post ${index + 1}`}
        className="instagram-image"
      />
    </div>
  ))}
</div>
        <a href="#" className="instagram-link">Voir plus sur Instagram</a>
      </section>
      
      {/* Newsletter Subscription */}
      <section className="newsletter-section">
        <div className="newsletter-content">
          <h2 className="newsletter-title">Restez informé</h2>
          <p className="newsletter-text">
            Recevez des offres exclusives et nos nouveautés en avant-première
          </p>
          <form onSubmit={handleSubscribe} className="newsletter-form">
            <input 
              type="email" 
              placeholder="Votre adresse e-mail" 
              className="newsletter-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="newsletter-button">S'abonner</button>
          </form>
        </div>
      </section>
      

     
     
      
      {/* Shipping Benefits */}
      <section className="benefits">
        <div className="benefit-card">
          <img src={Icon} alt="Shipping" className="benefit-icon" />
          <p>Livraison offerte</p>
        </div>
        <div className="benefit-card">
          <img src={Icon} alt="Return" className="benefit-icon" />
          <p>Satisfait ou remboursé<br />sous 30 jours</p>
        </div>
        <div className="benefit-card">
          <img src={Icon} alt="Payment" className="benefit-icon" />
          <p>Paiement<br />100% sécurisé</p>
        </div>
      </section>
      
      {/* Floating Cart Button */}
      <div className="floating-cart">
        <div className="cart-icon">🛍️</div>
        <span className="cart-count">0</span>
      </div>
    </div>
  );
}