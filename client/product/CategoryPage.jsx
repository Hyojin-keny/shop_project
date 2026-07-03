// src/product/CategoryPage.jsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import allProducts from "./productData"; 
import { useCart } from "./CartContext";
import "./ProductStyles.css";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState({});
  const [selectedColor, setSelectedColor] = useState({});

  const filteredProducts = allProducts.filter(
    (p) => p.category.toLowerCase() === categoryName.toLowerCase()
  );

  return (
    <div className="category-section">
      <h2 className="category-title">{categoryName}</h2>
      <div className="products-grid">
        {filteredProducts.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p className="product-price">${product.price.toFixed(2)}</p>

            <div className="radio-group">
              <strong>Size:</strong>
              {product.sizes.map((size) => (
                <label key={size}>
                  <input
                    type="radio"
                    name={`size-${product.id}`}
                    value={size}
                    checked={selectedSize[product.id] === size}
                    onChange={(e) =>
                      setSelectedSize({ ...selectedSize, [product.id]: e.target.value })
                    }
                  />
                  {size}
                </label>
              ))}
            </div>

            <div className="radio-group">
              <strong>Color:</strong>
              {product.colors.map((color) => (
                <label key={color}>
                  <input
                    type="radio"
                    name={`color-${product.id}`}
                    value={color}
                    checked={selectedColor[product.id] === color}
                    onChange={(e) =>
                      setSelectedColor({ ...selectedColor, [product.id]: e.target.value })
                    }
                  />
                  <span
                    style={{
                      backgroundColor: color.toLowerCase(),
                      width: 18,
                      height: 18,
                      borderRadius: "50%",
                      display: "inline-block",
                      border: "1px solid #999",
                      marginLeft: 6,
                    }}
                  ></span>
                </label>
              ))}
            </div>

            <button
              className="add-to-cart-btn"
              onClick={() => {
              const size = selectedSize[product.id] || "Small";
              const color = selectedColor[product.id] || "Black";
              addToCart(product, size, color);
             }}

            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
