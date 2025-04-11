import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa"
import "../Style/Footer.css"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-top">
          <div className="footer-logo">
            <img src="" alt="EleganceGem Logo" />
            <span className="brand-name">EleganceGem</span>
          </div>
        </div>

        <div className="custom-section">
          <h2 className="custom-title">Vous cherchez une pièce personnalisée ?</h2>
          <p className="custom-description">
            Chez <span className="brand-highlight">EleganceGem</span>, nous croyons que chaque bijou doit être aussi
            unique que vous ! Que vous souhaitiez un gravure spéciale, une pierre précieuse particulière, ou une
            création sur mesure, nous sommes là pour réaliser vos souhaits.
          </p>
          <button className="contact-button">Contactez-nous</button>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <div className="contact-info">
            <h3 className="section-title">Contact & Service Client</h3>
            <div className="contact-item">
              <span className="phone-icon">📞</span>
              <p>+212 0566710083</p>
            </div>
            <div className="contact-item">
              <span className="email-icon">✉️</span>
              <p>Luxueuss@gmail.com</p>
            </div>
          </div>

          <div className="legal-info">
            <h3 className="section-title">Mentions Légales & Copyright</h3>
            <p className="copyright">© 2024 Luxueuss. Tous droits réservés.</p>
          </div>

          <div className="social-links">
            <a href="#" className="social-icon">
              <FaFacebookF />
            </a>
            <a href="#" className="social-icon">
              <FaInstagram />
            </a>
            <a href="#" className="social-icon">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer