import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Luxury from './Luxury.jpg';
import Sport from './Sport.jpg';
import Casual from './Casual.jpg';
import Smart from './Smart.jpg';
import Vintage from './Vintage.jpg';
import './Anneaux.css';
import './Watches.css';

// Using a direct URL to the watch image shared by the user
const watchHeroImage = 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=1200&h=800&fit=crop&crop=center';

const Watches = () => {
  const navigate = useNavigate();
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const sliderRef = useRef(null);

  // Enhanced best sellers data with watch-specific items
  const bestSellers = [
    { 
      id: 1, 
      name: 'Chronographe Elite', 
      price: '€1299', 
      material: 'gold', 
      isBestSeller: true,
      image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=300&h=300&fit=crop&crop=center'
    },
    { 
      id: 2, 
      name: 'Classique Argenté', 
      price: '€899', 
      material: 'silver',
      image: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=300&h=300&fit=crop&crop=center'
    },
    { 
      id: 3, 
      name: 'Tourbillon Prestige', 
      price: '€2499', 
      material: 'platinum', 
      isBestSeller: true,
      image: 'https://images.unsplash.com/photo-1539874754764-5a96559165b0?w=300&h=300&fit=crop&crop=center'
    },
    { 
      id: 4, 
      name: 'Automatique Saphir', 
      price: '€1599', 
      material: 'gold',
      image: 'https://images.unsplash.com/photo-1548169874-53e85f753f1e?w=300&h=300&fit=crop&crop=center'
    },
    { 
      id: 5, 
      name: 'Squelette Rose', 
      price: '€1849', 
      material: 'rose-gold', 
      isBestSeller: true,
      image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=300&h=300&fit=crop&crop=center'
    },
    { 
      id: 6, 
      name: 'Sport Élégance', 
      price: '€1259', 
      material: 'silver',
      image: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=300&h=300&fit=crop&crop=center'
    },
    { 
      id: 7, 
      name: 'Plongeur Pro', 
      price: '€1449', 
      material: 'palladium',
      image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=300&h=300&fit=crop&crop=center'
    },
    { 
      id: 8, 
      name: 'Vintage Héritage', 
      price: '€1729', 
      material: 'gold', 
      isBestSeller: true,
      image: 'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=300&h=300&fit=crop&crop=center'
    },
    { 
      id: 9, 
      name: 'Moonphase Élite', 
      price: '€2279', 
      material: 'platinum',
      image: 'https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?w=300&h=300&fit=crop&crop=center'
    },
    { 
      id: 10, 
      name: 'Chronometer Luxe', 
      price: '€2599', 
      material: 'rose-gold', 
      isBestSeller: true,
      image: 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=300&h=300&fit=crop&crop=center'
    }
  ];

  // FAQ data with watch-specific questions
  const faqData = [
    {
      question: "Comment choisir une montre adaptée à mon style ?",
      answer: "Pour choisir une montre qui vous correspond, tenez compte de votre style vestimentaire quotidien, de vos activités et de vos préférences esthétiques. Nos conseillers peuvent vous guider vers des modèles classiques, sportifs ou contemporains selon votre personnalité."
    },
    {
      question: "Quelle est la différence entre un mouvement automatique et quartz ?",
      answer: "Le mouvement automatique est mécanique et se remonte grâce aux mouvements du poignet, offrant une précision artisanale et une valeur horlogère supérieure. Le mouvement à quartz fonctionne avec une pile, offrant une grande précision et nécessitant moins d'entretien."
    },
    {
      question: "Proposez-vous une garantie sur vos montres ?",
      answer: "Oui, toutes nos montres sont garanties 3 ans contre les défauts de fabrication. Nous offrons également un service de révision gratuit la première année et des réparations par nos horlogers certifiés à prix préférentiel."
    },
    {
      question: "Comment entretenir ma montre de luxe ?",
      answer: "Pour préserver l'éclat et la précision de votre montre, nous recommandons un nettoyage régulier avec un chiffon doux, une révision tous les 3-5 ans, et d'éviter les champs magnétiques puissants et l'exposition prolongée au soleil."
    },
    {
      question: "Quels sont les délais de livraison ?",
      answer: "Pour les modèles en stock, la livraison se fait sous 48-72h avec un service de conciergerie. Pour les pièces personnalisées ou sur commande, comptez 4-6 semaines. Nous proposons également une livraison express sécurisée pour les pièces d'exception."
    },
    {
      question: "Peut-on faire personnaliser une montre ?",
      answer: "Absolument ! Notre service de personnalisation vous permet de créer une pièce unique avec gravure au dos du boîtier, choix de bracelet, sertissage de pierres précieuses, et même des cadrans sur mesure pour certaines collections exclusives."
    }
  ];

  const testimonials = [
    { id: 1, name: 'Laurent M.', rating: 5, comment: "Ma Chronographe Elite est d'une précision remarquable et son design attire tous les regards. Un investissement que je ne regrette pas !" },
    { id: 2, name: 'Isabelle D.', rating: 4, comment: "Excellente qualité pour ma Moonphase Élite, le service client est impeccable et l'emballage luxueux." },
  ];

  // Materials data
  const materials = [
    { 
      id: 'goLuxuryld', 
      name: 'Luxury', 
      image: Luxury,
      description: 'Luxury 18 carats de la plus haute qualité',
      path: '/Watches/Luxury'
    },
    { 
      id: 'Sport', 
      name: 'Sport', 
      image: Sport,
      description: 'Sport inoxydable de qualité horlogère',
      path: '/Watches/Sport'
    },
    { 
      id: 'Casual', 
      name: 'Casual', 
      image: Casual,
      description: 'Casual pur 950',
      path: '/Watches/Casual'
    },
    { 
      id: 'Smart', 
      name: 'Smart', 
      image: Smart,
      description: 'Smart grade 5 ultra-résistant',
      path: '/Watches/Smart'
    },
    { 
      id: 'Vintage', 
      name: 'Vintage', 
      image: Vintage,
      description: 'Vintage 18 carats',
      path: '/Watches/Vintage'
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

  return (
    <div className="anneaux-page watches-page">
      {/* Hero Section */}
      <section className="hero-video watches-hero">
        <div className="Main">
          <div 
            className="video watches-background"
            style={{ 
              backgroundImage: `url(${watchHeroImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              width: '100%',
              height: '100%',
              position: 'absolute',
              animation: 'slow-zoom 30s infinite alternate'
            }}
          ></div>
          <div className="content watches-content">
            <h1>Montres d'Exception</h1>
            <p>L'art horloger suisse au service de l'élégance intemporelle</p>
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
          <h2>Offre Exclusive</h2>
          <p className="discount-code">CODE : HORLOGERIE25</p>
          <p>25% de réduction sur la révision complète de votre montre de luxe</p>
          <button className="cta-button">Réserver maintenant</button>
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
        <p>Abonnez-vous pour recevoir nos nouveautés et invitations aux événements horlogers</p>
        <form className="newsletter-form">
          <input type="email" placeholder="Votre email" required />
          <button type="submit" className="cta-button">S'abonner</button>
        </form>
        <p className="small-text">En vous inscrivant, vous recevrez notre guide d'entretien horloger gratuit.</p>
      </section>
    </div>
  );
};

export default Watches;