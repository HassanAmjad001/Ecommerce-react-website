import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { getProductById } from "../data/products";
import { useCart } from "../Context/CartContext";

const ProductsDetail = () => {
  const { id } = useParams();
  const [product, setproduct] = useState(null);
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart();
 

  useEffect(() => {
    const foundProduct = getProductById(id);
    if (!foundProduct) {
      navigate("/");

      return;
    }
    setproduct(foundProduct);
  }, [id]);

  if (!product) {
    return <h1>Loading...</h1>;
  }

   const productInCart = cartItems.find((items) => items.id === product.id);
  const productQuantityLabel = productInCart
    ? `(${productInCart.quantity})`
    : "";

  return (
    <div className="page">
      <div className="container">
        <div className="product-detail">
          <div className="product-detail-image">
            <img src={product?.image} alt={product?.name} />
          </div>
          <div className="product-detail-content">
            <h1 className="product-detail-name">{product.name}</h1>
            <p className="product-detail-price">${product.price}</p>
            <p className="product-detail-description">{product.description}</p>
            <button className="btn btn-primary" onClick={() => addToCart(product.id)}>
              Add to Cart {productQuantityLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsDetail;
