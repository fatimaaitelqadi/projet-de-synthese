import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Pendants from './Pendants.jpg';
import Chokers from './Chokers.jpg';
import Chains from './Chains.jpg';
import Pearls from './Pearls.jpg';
import Statement from './Statement.jpg';
// Removed video import
import './Anneaux.css';

// Add a static necklace image URL
const necklaceHeroImage = 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=1200&h=800&fit=crop&crop=center';

const Coliers = () => {
  const navigate = useNavigate();
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const sliderRef = useRef(null);

  // Enhanced best sellers data with 10 items
  const bestSellers = [
    { 
      id: 1, 
      name: 'Anneau Éternité Or', 
      price: '€299', 
      material: 'gold', 
      isBestSeller: true,
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&h=300&fit=crop&crop=center'
    },
    { 
      id: 2, 
      name: 'Bague Silver Touch', 
      price: '€199', 
      material: 'silver',
      image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=300&h=300&fit=crop&crop=center'
    },
    { 
      id: 3, 
      name: 'Alliance Platine', 
      price: '€499', 
      material: 'platinum', 
      isBestSeller: true,
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop&crop=center'
    },
    { 
      id: 4, 
      name: 'Bague Solitaire', 
      price: '€399', 
      material: 'gold',
      image: 'https://images.unsplash.com/photo-1603561596112-6a132309c76c?w=300&h=300&fit=crop&crop=center'
    },
    { 
      id: 5, 
      name: 'Anneau Rose Gold', 
      price: '€349', 
      material: 'rose-gold', 
      isBestSeller: true,
      image: 'https://images.unsplash.com/photo-1588444650700-6a4d3e013230?w=300&h=300&fit=crop&crop=center'
    },
    { 
      id: 6, 
      name: 'Alliance Moderne', 
      price: '€259', 
      material: 'silver',
      image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=300&h=300&fit=crop&crop=center'
    },
    { 
      id: 7, 
      name: 'Bague Palladium', 
      price: '€449', 
      material: 'palladium',
      image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=300&h=300&fit=crop&crop=center'
    },
    { 
      id: 8, 
      name: 'Anneau Vintage', 
      price: '€329', 
      material: 'gold', 
      isBestSeller: true,
      image: 'https://images.unsplash.com/photo-1614607242094-b1b2cf769ff3?w=300&h=300&fit=crop&crop=center'
    },
    { 
      id: 9, 
      name: 'Alliance Élégante', 
      price: '€279', 
      material: 'platinum',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300&h=300&fit=crop&crop=center'
    },
    { 
      id: 10, 
      name: 'Bague Luxe', 
      price: '€599', 
      material: 'rose-gold', 
      isBestSeller: true,
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&h=300&fit=crop&crop=center'
    }
  ];

  // FAQ data with 6 questions
  const faqData = [
    {
      question: "Comment choisir la bonne taille d'anneau ?",
      answer: "Nous proposons un guide des tailles détaillé et un outil de mesure à imprimer. Vous pouvez également visiter notre boutique pour un essayage personnalisé ou commander notre baguier gratuit à domicile."
    },
    {
      question: "Quels sont les matériaux les plus résistants ?",
      answer: "Le platine et le palladium sont les plus durables et résistants aux rayures, tandis que l'or 18 carats offre un excellent équilibre entre beauté et résistance. L'argent sterling 925 est également très durable avec un entretien approprié."
    },
    {
      question: "Proposez-vous une garantie sur vos Coliers ?",
      answer: "Oui, tous nos Coliers sont garantis 2 ans contre les défauts de fabrication. Nous offrons également un service de polissage gratuit la première année et des réparations à prix préférentiel."
    },
    {
      question: "Puis-je personnaliser mon anneau ?",
      answer: "Absolument ! Nous proposons une large gamme d'options de personnalisation : gravure intérieure ou extérieure, choix de pierres précieuses, modification des dimensions, et création sur mesure selon vos désirs."
    },
    {
      question: "Quels sont les délais de livraison ?",
      answer: "Pour les modèles en stock, la livraison se fait sous 48-72h. Pour les pièces personnalisées, comptez 2-3 semaines. Nous proposons également une livraison express 24h pour les commandes urgentes."
    },
    {
      question: "Comment entretenir mon anneau ?",
      answer: "Chaque anneau est livré avec un guide d'entretien personnalisé selon le matériau. En général, un nettoyage doux avec de l'eau savonneuse et un polissage régulier suffisent. Évitez les produits chimiques agressifs."
    }
  ];

  const testimonials = [
    { id: 1, name: 'Sophie L.', rating: 5, comment: "Mon anneau en or rose est magnifique, je reçois des compliments quotidiennement !" },
    { id: 2, name: 'Thomas P.', rating: 4, comment: "Excellent rapport qualité-prix pour l'anneau en argent." },
  ];

  // Materials data
  const materials = [
    { 
      id: 'Pendants', 
      name: 'Pendants', 
      image: Pendants,
      description: 'Colliers avec pendentifs élégants',
      path: '/cliers/Pendants'
    },
    { 
      id: 'Chokers', 
      name: 'Chokers', 
      image: Chokers,
      description: 'Ras-de-cou sophistiqués',
      path: '/cliers/Chokers'
    },
    { 
      id: 'Chains', 
      name: 'Chains', 
      image: Chains,
      description: 'Chaînes fines et élégantes',
      path: '/cliers/Chains'
    },
    { 
      id: 'Pearls', 
      name: 'Pearls', 
      image: Pearls,
      description: 'Colliers de perles précieuses',
      path: '/cliers/Pearls'
    },
    { 
      id: 'Statement', 
      name: 'Statement', 
      image: Statement,
      description: 'Pièces audacieuses et remarquables',
      path: '/cliers/Statement'
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

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

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

  return (
    <div className="Coliers-page">
      {/* Hero Section */}
      <section className="hero-video">
        <div className="Main">
          <div 
            className="video"
            style={{ 
              backgroundImage: `url(${necklaceHeroImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              width: '100%',
              height: '100%',
              position: 'absolute',
              animation: 'slow-zoom 30s infinite alternate'
            }}
          ></div>
          <div className="content">
            <h1>Collection de Colliers Exclusifs</h1>
            <p>Des créations raffinées pour sublimer votre élégance</p>
          </div>
        </div>
      </section>

      {/* Materials Slider */}
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

      {/* Special Offer */}
      <section className="special-offer">
        <div className="offer-content">
          <h2>Offre Limitée !</h2>
          <p className="discount-code">CODE : Coliers10</p>
          <p>10% de réduction sur tous les Coliers en or aujourd'hui seulement</p>
          <button className="cta-button">Profiter de l'offre</button>
        </div>
      </section>

      {/* FAQ Section with Toggle */}
      <section className="faq-section">
        <h2>Questions Fréquentes</h2>
        <div className="faq-container">
          {faqData.map((faq, index) => (
            <div 
              key={index} 
              className={`faq-item ${openFaqIndex === index ? 'open' : ''}`}
              onClick={() => toggleFaq(index)}
            >
              <div className="faq-question">
                <h3>{faq.question}</h3>
                {openFaqIndex === index ? <ChevronUp /> : <ChevronDown />}
              </div>
              {openFaqIndex === index && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
      <section className="testimonials">
        <h2>Ce Que Disent Nos Clients</h2>
        <div className="testimonials-container">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="rating">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={i < testimonial.rating ? 'star-filled' : 'star-empty'}>
                    ★
                  </span>
                ))}
              </div>
              <p className="comment">"{testimonial.comment}"</p>
              <p className="client-name">— {testimonial.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
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

export default Coliers;