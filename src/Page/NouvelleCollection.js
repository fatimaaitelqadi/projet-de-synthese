import React from 'react';
import dataNouve from '../dataNouve'; // Assure-toi que le chemin vers le fichier est correct
import { FaStar } from 'react-icons/fa'; // Assure-toi d'avoir installé react-icons avec `npm install react-icons`

function NouvelleCollection() {
  return (
    <div className="nouvelle-collection">
      <h2>Nouvelle Collection</h2>
      <div className="bijoux-list">
        {dataNouve.map(bijou => (
          <div key={bijou.id} className="bijou-item">
            <img src={bijou.image} alt={`Bijou ${bijou.id}`} className="bijou-image" />
            <p className="bijou-description">{bijou.description}</p>
            <p className="bijou-price">{bijou.prix} €</p>
            <div className="star">
              <FaStar size={20} color="#FFD700" />
            </div>
            <button className="btn-add">+</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NouvelleCollection;

