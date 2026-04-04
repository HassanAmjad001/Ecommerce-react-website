import React from "react";
import { Link } from "react-router-dom";

const ProductCards = ({ products }) => {
  return (
    <div className="product-card">
      <img
        src={products.image}
        className="product-card-image"
        alt={products.name}
      />
      <div className="product-card-content">
        <h3 className="product-card-name">{products.name}</h3>
        <p className="product-card-price">${products.price}</p>
        <div className="product-card-actions">
          <Link className="btn btn-secondary">View Details</Link>
          <button className="btn btn-primary">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCards;
