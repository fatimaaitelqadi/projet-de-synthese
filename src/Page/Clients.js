import React, { useState, useEffect, useRef } from 'react';
import '../Style/Anneaux.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import goldeimage from '../Image/goldeanneaux.png'
import silverimage from '../Image/imagesilver.png'
import imagePlatine from '../Image/imagePalt.png'
import imagePallad from '../Image/imagePallad.png.png'
import RoseImage from '../Image/Roseimage.png'

const Anneaux = () => {
  const navigate = useNavigate();
  const [activeMaterial, setActiveMaterial] = useState('gold');
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  // Données simulées
  const bestSellers = [
    { id: 1, name: 'Anneau Éternité Or', price: '€299', material: 'gold', isBestSeller: true },
    { id: 2, name: 'Bague Silver Touch', price: '€199', material: 'silver' },
    { id: 3, name: 'Alliance Platine', price: '€499', material: 'platinum', isBestSeller: true },
  ];

  const testimonials = [
    { id: 1, name: 'Sophie L.', rating: 5, comment: "Mon anneau en or rose est magnifique, je reçois des compliments quotidiennement !" },
    { id: 2, name: 'Thomas P.', rating: 4, comment: "Excellent rapport qualité-prix pour l'anneau en argent." },
  ];

  // Données pour le slider des matériaux
  const materials = [
    { 
      id: 'gold', 
      name: 'Or', 
      image: goldeimage,
      description: 'Or 18 carats de la plus haute qualité',
      path: '/anneaux/gold'
    },
    { 
      id: 'silver', 
      name: 'Argent', 
      image: silverimage,
      description: 'Argent sterling 925',
      path: '/anneaux/silver'
    },
    { 
      id: 'platinum', 
      name: 'Platine', 
      image: imagePlatine,
      description: 'Platine pur 950',
      path: '/anneaux/platinum'
    },
    { 
      id: 'palladium', 
      name: 'Palladium', 
      image: imagePallad,
      description: 'Palladium de qualité joaillerie',
      path: '/anneaux/palladium'
    },
    { 
      id: 'rose-gold', 
      name: 'Or Rose', 
      image: RoseImage,
      description: 'Or rose 18 carats',
      path: '/anneaux/RoseGold'
    },
  ];

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -320,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: 320,
        behavior: 'smooth'
      });
    }
  };

  const handleMaterialClick = (path) => {
    console.log('Navigating to:', path); // Debug log
    navigate(path);
  };

  return (
    <div className="anneaux-page">
      {/* Section 1: Vidéo de Présentation */}
      <section className="hero-video">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          onPlay={() => setIsVideoPlaying(true)}
          onPause={() => setIsVideoPlaying(false)}
        >
          <source src="/videos/anneaux-presentation.mp4" type="video/mp4" />
          Votre navigateur ne supporte pas les vidéos HTML5.
        </video>
        <div className={`video-overlay ${isVideoPlaying ? 'playing' : ''}`}>
          <h1>Nos Anneaux Exceptionnels</h1>
          <p>Découvrez des créations uniques pour chaque occasion</p>
        </div>
      </section>

      {/* Section 2: Slider des Matériaux */}
      <section className="materials-section">
        <h2>Nos Matériaux</h2>
        <div className="materials-slider-container" ref={sliderRef}>
          <div className="materials-slider">
            {materials.map((material, index) => (
              <div 
                key={index} 
                className="material-slide" 
                style={{ backgroundImage: `url(${material.image})` }}
                onClick={() => handleMaterialClick(material.path)}
              >
                <div className="material-content">
                  <h3>{material.name}</h3>
                  <p>{material.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button className="scroll-nav prev" onClick={scrollLeft}>
          <ChevronLeft />
        </button>
        <button className="scroll-nav next" onClick={scrollRight}>
          <ChevronRight />
        </button>
      </section>

      {/* Section 3: Meilleures Ventes */}
      <section className="best-sellers">
        <h2>Nos Best-Sellers</h2>
        <div className="products-grid">
          {bestSellers.map((product) => (
            <div key={product.id} className="product-card">
              {product.isBestSeller && <span className="best-seller-badge">TOP</span>}
              <div className="product-image" style={{ backgroundColor: getMaterialColor(product.material) }}></div>
              <h3>{product.name}</h3>
              <p>{product.price}</p>
              <button className="cta-button">Voir les détails</button>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: Avis Clients */}
      <section className="testimonials">
        <h2>Ce Que Disent Nos Clients</h2>
        <div className="testimonials-container">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="rating">
                {'★'.repeat(testimonial.rating)}{'☆'.repeat(5 - testimonial.rating)}
              </div>
              <p className="comment">"{testimonial.comment}"</p>
              <p className="client-name">— {testimonial.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 5: Offres Spéciales */}
      <section className="special-offer">
        <div className="offer-content">
          <h2>Offre Limitée !</h2>
          <p className="discount-code">CODE : ANNEAUX10</p>
          <p>10% de réduction sur tous les anneaux en or aujourd'hui seulement</p>
          <button className="cta-button">Profiter de l'offre</button>
        </div>
      </section>

      {/* Section 6: Personnalisation */}
      <section className="customization">
        <h2>Personnalisez Votre Anneau</h2>
        <div className="customization-preview">
          <div className="ring-base"></div>
          <div className="ring-details"></div>
        </div>
        <button className="cta-button-outline">Commencer la personnalisation →</button>
      </section>

      {/* Section 7: FAQ */}
      <section className="faq">
        <h2>Questions Fréquentes</h2>
        <div className="faq-item">
          <h3>Comment choisir la bonne taille d'anneau ?</h3>
          <p>Nous proposons un guide des tailles détaillé et un outil de mesure à imprimer.</p>
        </div>
        <div className="faq-item">
          <h3>Quels sont les matériaux les plus résistants ?</h3>
          <p>Le platine et le palladium sont les plus durables, tandis que l'or 18 carats offre un bon équilibre.</p>
        </div>
      </section>

      {/* Section 8: Newsletter */}
      <section className="newsletter">
        <h2>Restez Informé</h2>
        <p>Abonnez-vous pour recevoir nos nouveautés et offres exclusives</p>
        <form className="newsletter-form">
          <input type="email" placeholder="Votre email" required />
          <button type="submit" className="cta-button">S'abonner</button>
        </form>
        <p className="small-text">En vous inscrivant, vous recevrez un guide d'entretien gratuit.</p>
      </section>
    </div>
  );
};

// Fonction utilitaire pour la couleur des matériaux
const getMaterialColor = (material) => {
  const colors = {
    gold: '#FFD700',
    silver: '#C0C0C0',
    platinum: '#E5E4E2',
    palladium: '#B4B4B4',
    'rose-gold': '#E0BFB8'
  };
  return colors[material] || '#333';
};

export default Anneaux;