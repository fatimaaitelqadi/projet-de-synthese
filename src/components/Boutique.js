import React, { useState, useEffect } from 'react';
import { productService } from '../services/api';
import '../Style/Boutique.css';

const Boutique = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await productService.getAllProducts();
                setProducts(data);
                setLoading(false);
            } catch (err) {
                setError('Erreur lors du chargement des produits');
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <div className="loading">Chargement des produits...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="boutique-container">
            <h1>Notre Boutique</h1>
            <div className="products-grid">
                {products.map((product) => (
                    <div key={product.id} className="product-card">
                        {product.image && (
                            <img 
                                src={`http://127.0.0.1:8000/storage/${product.image}`} 
                                alt={product.name} 
                                className="product-image"
                            />
                        )}
                        <div className="product-info">
                            <h3>{product.name}</h3>
                            <p className="product-description">{product.description}</p>
                            <p className="product-category">Catégorie: {product.category}</p>
                            <p className="product-price">{product.price} €</p>
                            <p className="product-stock">En stock: {product.stock}</p>
                            <button className="add-to-cart-btn">Ajouter au panier</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Boutique; 