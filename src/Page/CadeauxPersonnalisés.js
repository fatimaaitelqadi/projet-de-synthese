import React, { useState, useEffect } from 'react';
import { productService } from '../services/api';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './BouclesOreilles.css';
import './Boutique.css';
import StarRating from '../components/StarRating';
import { useCart } from '../context/CartContext';

export default function CadeauxPersonnalisés() {
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  const IMAGE_BASE_URL = 'http://127.0.0.1:8000/storage/';

  useEffect(() => {
    const fetchProduits = async () => {
      try {
        setLoading(true);
        console.log('Starting to fetch cadeau products...');
        
        const productsData = await productService.getCadeauProducts();
        console.log('Received products data:', productsData);

        if (!Array.isArray(productsData)) {
          throw new Error('Invalid data format received from API');
        }

        // Filter products for personalized gifts
        const filtered = productsData.filter(p => {
          console.log('Checking product:', p); // Debug log
          return p.name  === 'personnalise' || 
          (p.nom && p.nom.toLowerCase().includes('personnalise')) ||
          (p.type && p.type.toLowerCase().includes('personnalise'));
        });

        console.log('Filtered products:', filtered);

        if (filtered.length === 0) {
          console.warn('No personalized gifts found after filtering');
        }

        // Transform the data to match the expected format
        const transformedProducts = filtered.map(product => {
          console.log('Transforming product:', product); // Debug log
          return {
            id: product.id,
            name: product.nom || 'Sans nom',
            description: product.description || 'Pas de description',
            price: parseFloat(product.prix || 0),
            image_url: product.image || '',
            category: product.categorie || 'Non catégorisé',
            stock: parseInt(product.stock || 0),
            rating: parseInt(product.rating || 4)
          };
        });

        console.log('Final transformed products:', transformedProducts);
        setProduits(transformedProducts);
        setError(null);
      } catch (err) {
        console.error("Detailed error in fetchProduits:", {
          message: err.message,
          stack: err.stack,
          response: err.response
        });
        
        let errorMessage = 'Erreur lors du chargement des cadeaux. ';
        if (err.message.includes('No response received')) {
          errorMessage += 'Le serveur ne répond pas. Veuillez vérifier que le serveur est en cours d\'exécution.';
        } else if (err.message.includes('404')) {
          errorMessage += 'L\'endpoint API n\'existe pas. Veuillez vérifier la configuration.';
        } else if (err.message.includes('401') || err.message.includes('403')) {
          errorMessage += 'Accès non autorisé. Veuillez vérifier vos permissions.';
        } else {
          errorMessage += err.message;
        }
        
        setError(errorMessage);
        setProduits([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProduits();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Chargement des cadeaux d'anniversaire...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button 
          onClick={() => {
            console.log('Retrying fetch...');
            window.location.reload();
          }} 
          className="retry-button"
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <>
      
      
      <div className="boucles-oreilles-container">
        <h2>Cadeaux Personnalisés</h2>
        <div className="product-grid">
          {produits.length > 0 ? (
            produits.map((produit) => (
              <div key={produit.id} className="product-card">
                <div className="product-image-container">
                  {produit.image_url ? (
                    <Link to={`/product/${produit.id}`} className="product-image-link">
                      <img
                        src={`${IMAGE_BASE_URL}${produit.image_url}`}
                        alt={produit.name}
                        className="product-image"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/placeholder-image.jpg';
                        }}
                      />
                    </Link>
                  ) : (
                    <div className="product-no-image">Pas d'image</div>
                  )}
                  <button
                    className="add-to-cart-btn"
                    onClick={async () => {
                      try {
                        await addToCart(produit.id, 1);
                      } catch (error) {
                        console.error('Failed to add product to cart:', error);
                      }
                    }}
                    aria-label={`Ajouter ${produit.name} au panier`}
                  >
                    <FaPlus />
                  </button>
                </div>
                <div className="product-info">
                  <h3>
                    <Link to={`/product/${produit.id}`} className="product-name-link">
                      {produit.name}
                    </Link>
                  </h3>
                  <p>{produit.description}</p>
                  <StarRating rating={produit.rating} />
                  <p className="product-price">{parseFloat(produit.price).toFixed(2)} €</p>
                  <p className="product-stock">En stock: {produit.stock}</p>
                </div>
              </div>
            ))
          ) : (
            <p>Aucun cadeau personnalisé trouvé.</p>
          )}
        </div>
      </div>
    </>
  );
}
