import React, { useState, useEffect, useRef } from 'react';
import '../Style/About.css';
import image1 from '../Image/f4.jpg'
import i1 from '../Image/image1.png'
import i2 from '../Image/image2.png'
import i3 from '../Image/image3.png'
import i4 from '../Image/image4.png'
import s1 from '../Image/sec2.png'
import s2 from '../Image/images2.png'
import s3 from '../Image/imageSs2.png'
import o1 from '../Image/oo1.png'
import o2 from '../Image/o2.png'
import o3 from '../Image/o3.png'
export default function About() {
  // State for collection slider
  const [activeCollection, setActiveCollection] = useState(0);
  const collectionsRef = useRef(null);
  
  // State for testimonial slider
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  
  // Collections data
  const collections = [
    {
      id: 1,
      name: "Eternal Elegance",
      image: i1,
      description: "Our signature diamond collection featuring timeless designs that celebrate the enduring beauty of exceptional diamonds."
    },
    {
      id: 2,
      name: "Golden Heritage",
      image: i2,
      description: "Exquisite gold pieces inspired by classical artistry, crafted to become heirlooms for generations to come."
    },
    {
      id: 3,
      name: "Azure Dreams",
      image:i3,
      description: "Sapphires and aquamarines in contemporary settings that capture the mesmerizing depths of the ocean."
    },
    {
      id: 4,
      name: "Nature's Embrace",
      image:i4,
      description: "Organic forms celebrating the beauty of the natural world, featuring botanical motifs and flowing lines."
    }
  ];
  
  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Sophie Laurent",
      location: "Paris, France",
      quote: "The craftsmanship of my engagement ring is simply extraordinary. Every time it catches the light, I'm reminded of the special day my partner proposed.",
      avatar:s1
    },
    {
      id: 2,
      name: "James Wilson",
      location: "New York, USA",
      quote: "I've been collecting fine jewelry for years, and Lumière pieces stand out for their exceptional quality and timeless design. True artistry.",
      avatar: s2
    },
    {
      id: 3,
      name: "Elena Moretti",
      location: "Milan, Italy",
      quote: "The sapphire necklace I purchased for my anniversary has become my most treasured piece. The attention to detail is remarkable.",
      avatar: s3
    }
  ];
  
  // Team members data
  const team = [
    {
      name: "Elena Moreau",
      role: "Founder & Creative Director",
      bio: "With over 30 years of experience, Elena's vision and artistic sensibility guide every collection.",
      image: o1
    },
    {
      name: "Marco Rossi",
      role: "Master Goldsmith",
      bio: "Marco's exceptional skill in working with precious metals brings our most intricate designs to life.",
      image: o2
    },
    {
      name: "Sophie Chen",
      role: "Gemologist",
      bio: "Sophie's expertise ensures we source only the finest ethically-sourced gemstones for our creations.",
      image: o3
    }
  ];
  
  // Auto-rotate collections
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCollection((current) => (current + 1) % collections.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [collections.length]);
  
  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((current) => (current + 1) % testimonials.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);
  
  // Scroll animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const elements = document.querySelectorAll('.reveal');
    elements.forEach(el => observer.observe(el));
    
    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);
  
  // Collection slider navigation
  const goToCollection = (index) => {
    setActiveCollection(index);
    if (collectionsRef.current) {
      collectionsRef.current.style.transform = `translateX(-${index * 100}%)`;
    }
  };
  
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Our Story</h1>
          <p className="hero-subtitle">Crafting timeless elegance since 1995</p>
        </div>
      </section>
      
      {/* Introduction Section */}
      <section className="intro-section container">
        <div className="two-column">
          <div className="column reveal">
            <h2 className="section-title">Our Heritage</h2>
            <p>
              Founded in 1995 by master jeweler Elena Moreau, Lumière Jewelry began as a small atelier in Paris. 
              What started as a passion project has evolved into a renowned brand celebrated for its commitment 
              to exceptional craftsmanship and timeless designs.
            </p>
            <p>
              Each piece in our collection tells a story—a narrative of artistry, passion, and the pursuit of 
              perfection. We believe that jewelry is more than an accessory; it's an expression of individuality 
              and a keeper of memories.
            </p>
            <a href="/collections" className="link-with-arrow">
              Explore our collections
              <span className="arrow">→</span>
            </a>
          </div>
          <div className="column reveal">
            <div className="image-container">
              <img 
                src={image1} 
                alt="Our jewelry atelier" 
                className="rounded-image"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Collections Slider */}
      <section className="collections-section">
        <div className="container">
          <div className="section-header reveal">
            <h2 className="section-title">Our Collections</h2>
            <p className="section-subtitle">
              Discover our exquisite pieces, each handcrafted with precision and passion
            </p>
          </div>
          
          <div className="slider-container reveal">
            <div className="slider-wrapper">
              <div 
                className="slider-track" 
                ref={collectionsRef}
                style={{ transform: `translateX(-${activeCollection * 100}%)` }}
              >
                {collections.map((collection) => (
                  <div className="slider-slide" key={collection.id}>
                    <div className="collection-card">
                      <div className="collection-image">
                        <img src={collection.image || "/placeholder.svg"} alt={collection.name} />
                      </div>
                      <div className="collection-info">
                        <h3 className="collection-title">{collection.name}</h3>
                        <p className="collection-description">{collection.description}</p>
                        <a href={`/collections/${collection.id}`} className="btn">View Collection</a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="slider-controls">
              <div className="slider-dots">
                {collections.map((_, index) => (
                  <button 
                    key={index}
                    className={`slider-dot ${index === activeCollection ? 'active' : ''}`}
                    onClick={() => goToCollection(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  ></button>
                ))}
              </div>
              
              <div className="slider-arrows">
                <button 
                  className="slider-arrow prev"
                  onClick={() => goToCollection((activeCollection - 1 + collections.length) % collections.length)}
                  aria-label="Previous collection"
                >
                  ←
                </button>
                <button 
                  className="slider-arrow next"
                  onClick={() => goToCollection((activeCollection + 1) % collections.length)}
                  aria-label="Next collection"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Craftsmanship Section */}
      <section className="craftsmanship-section container">
        <div className="section-header reveal">
          <h2 className="section-title">Artisanal Craftsmanship</h2>
          <p className="section-subtitle">
            Every Lumière piece is meticulously handcrafted by our skilled artisans, 
            combining traditional techniques with modern innovation.
          </p>
        </div>
        
        <div className="three-column">
          {[
            {
              title: "Design",
              description: "Our creative process begins with hand-drawn sketches that capture the essence of our inspiration.",
              image: "https://placeholder.com/600x600?text=Design"
            },
            {
              title: "Creation",
              description: "Master artisans transform precious metals and gemstones into wearable art through meticulous handcrafting.",
              image: "https://placeholder.com/600x600?text=Creation"
            },
            {
              title: "Finishing",
              description: "Each piece undergoes rigorous quality control to ensure it meets our exacting standards of excellence.",
              image: "https://placeholder.com/600x600?text=Finishing"
            }
          ].map((item, index) => (
            <div className="column reveal" key={index} style={{ animationDelay: `${index * 150}ms` }}>
              <div className="craft-card">
                <div className="craft-image">
                  <img src={item.image || "/placeholder.svg"} alt={item.title} />
                </div>
                <h3 className="craft-title">{item.title}</h3>
                <p className="craft-description">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Team Section */}
      <section className="team-section container">
        <div className="section-header reveal">
          <h2 className="section-title">Meet Our Artisans</h2>
          <p className="section-subtitle">
            The talented individuals behind our exquisite creations
          </p>
        </div>
        
        <div className="three-column">
          {team.map((person, index) => (
            <div className="column reveal" key={index} style={{ animationDelay: `${index * 150}ms` }}>
              <div className="team-member">
                <div className="member-image">
                  <img src={person.image || "/placeholder.svg"} alt={person.name} />
                </div>
                <h3 className="member-name">{person.name}</h3>
                <p className="member-role">{person.role}</p>
                <p className="member-bio">{person.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <div className="section-header reveal">
            <h2 className="section-title">Our Values</h2>
            <p className="section-subtitle">
              The principles that guide our craft and business
            </p>
          </div>
          
          <div className="four-column">
            {[
              {
                title: "Excellence",
                description: "We pursue perfection in every detail of our creations."
              },
              {
                title: "Sustainability",
                description: "We source materials ethically and minimize our environmental impact."
              },
              {
                title: "Innovation",
                description: "We blend traditional techniques with contemporary design."
              },
              {
                title: "Integrity",
                description: "We maintain transparency and honesty in all our practices."
              }
            ].map((value, index) => (
              <div className="column reveal" key={index} style={{ animationDelay: `${index * 150}ms` }}>
                <div className="value-card">
                  <h3 className="value-title">{value.title}</h3>
                  <p className="value-description">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials Slider */}
      <section className="testimonials-section container">
        <div className="section-header reveal">
          <h2 className="section-title">Client Testimonials</h2>
          <p className="section-subtitle">
            Hear from our clients about their experience with Lumière Jewelry
          </p>
        </div>
        
        <div className="testimonials-slider reveal">
          <div className="testimonials-container">
            {testimonials.map((testimonial, index) => (
              <div 
                className={`testimonial ${index === activeTestimonial ? 'active' : ''}`} 
                key={testimonial.id}
              >
                <div className="testimonial-content">
                  <div className="quote-icon">"</div>
                  <p className="testimonial-quote">{testimonial.quote}</p>
                  <div className="testimonial-author">
                    <div className="author-image">
                      <img src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                    </div>
                    <div className="author-info">
                      <h4 className="author-name">{testimonial.name}</h4>
                      <p className="author-location">{testimonial.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="testimonial-dots">
            {testimonials.map((_, index) => (
              <button 
                key={index}
                className={`testimonial-dot ${index === activeTestimonial ? 'active' : ''}`}
                onClick={() => setActiveTestimonial(index)}
                aria-label={`View testimonial ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="contact-section container">
        <div className="two-column">
          <div className="column reveal">
            <h2 className="section-title">Visit Our Atelier</h2>
            <p>
              We invite you to experience the world of Lumière Jewelry in person. 
              Visit our atelier to explore our collections and witness our craftspeople at work.
            </p>
            
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon">📍</div>
                <div className="contact-text">
                  <p>16 Rue Saint-Honoré</p>
                  <p>75001 Paris, France</p>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">📞</div>
                <div className="contact-text">
                  <p>+33 1 42 60 82 00</p>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">✉️</div>
                <div className="contact-text">
                  <p>contact@lumierejewelry.com</p>
                </div>
              </div>
            </div>
            
            <a href="/contact" className="btn">Book an Appointment</a>
          </div>
          
          <div className="column reveal">
          <div className="image-container map-frame">
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.999804797964!2d2.292292315674537!3d48.85837307928795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fc7dfb7b1bd%3A0x998e8fdfb80e8e5!2sEiffel%20Tower!5e0!3m2!1sen!2sfr!4v1685112024500!5m2!1sen!2sfr"
    width="100%"
    height="600"
    style={{ border: "4px solid #ccc", borderRadius: "8px" }}
    allowFullScreen=""
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    title="Paris Map"
  ></iframe>
</div>

          </div>
        </div>
      </section>
    </div>
  );
}