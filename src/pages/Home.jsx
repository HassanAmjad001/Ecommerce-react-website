import React from "react";
import { getProducts } from "../data/products";
import { Link } from "react-router-dom";
import ProductCards from "../components/ProductCards";

const Home = () => {
  const products = getProducts();
  return (
    <div className="page">
      <div className="home-hero">
        <h1 className="home-title">Welcome to ShopHub</h1>
        <p className="home-subtitle">
          Discover amazing products at great price
        </p>
      </div>
      <div className="container">
        <h2 className="page-title">Our Products</h2>
        <div className="product-grid">
          {products.map((products) => (
            <ProductCards products={products} key={products.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
