import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import auth from '../lib/auth-helper';
import tshirtImage from "../assets/images/tshirt.png";
import hoodieImage from "../assets/images/hoodie.png";
import cargoImage from "../assets/images/cargo.png";
import denimImage from "../assets/images/denimjacket.png";
import baseballImage from "../assets/images/baseball.png";
import sneakerImage from "../assets/images/sneaker.png";
import beanieImage from "../assets/images/beanie.png";
import trackpantsImage from "../assets/images/trackpants.png";
import Footer from "../components/Footer";
import { useCart } from "./CartContext";
import "./ProductStyles.css";
import Snackbar from '@mui/material/Snackbar';

const products = [
  { id: 1, name: "T-Shirt", description: "Comfortable cotton t-shirt", price: 20, sizes: ["S", "M", "L"], colors: ["Black", "White", "Blue", "Pink"], category: "T-Shirts", image: tshirtImage },
  { id: 2, name: "Hoodie", description: "Warm and cozy hoodie", price: 40, sizes: ["S", "M", "L"], colors: ["Black", "White", "Blue", "Pink"], category: "Jackets", image: hoodieImage },
  { id: 3, name: "Cargo Pants", description: "Durable cargo pants", price: 35, sizes: ["S", "M", "L"], colors: ["Black", "White", "Blue", "Pink"], category: "Pants", image: cargoImage },
  { id: 4, name: "Baseball Cap", description: "Stylish cotton cap", price: 15, sizes: ["S", "M", "L"], colors: ["Black", "White", "Blue", "Pink"], category: "Accessories", image: baseballImage },
  { id: 5, name: "Denim Jacket", description: "Classic blue denim", price: 60, sizes: ["S", "M", "L"], colors: ["Black", "White", "Blue", "Pink"], category: "Jackets", image: denimImage },
  { id: 6, name: "Sneakers", description: "Comfy and casual footwear", price: 75, sizes: ["S", "M", "L"], colors: ["Black", "White", "Blue", "Pink"], category: "Shoes", image: sneakerImage },
  { id: 7, name: "Scarf", description: "Soft woolen scarf", price: 25, sizes: ["S", "M", "L"], colors: ["Black", "White", "Blue", "Pink"], category: "Accessories", image: hoodieImage },
  { id: 8, name: "Track Pants", description: "Athletic fit joggers", price: 30, sizes: ["S", "M", "L"], colors: ["Black", "White", "Blue", "Pink"], category: "Pants", image: trackpantsImage },
  { id: 9, name: "Beanie", description: "Warm knit beanie", price: 18, sizes: ["S", "M", "L"], colors: ["Black", "White", "Blue", "Pink"], category: "Accessories", image: beanieImage },
];



const ProductsPage = () => {
  const navigate = useNavigate();
  const { justAdded, resetCartMessage } = useCart();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState({});
  const [selectedColor, setSelectedColor] = useState({});

  const categories = ["T-Shirts", "Pants", "Shoes", "Jackets", "Accessories"];

  return (
    <div className="products-page">

      {categories.map((category) => (
        <div key={category} className="category-section">
          <h2>{category}</h2>
          <div className="products-grid">
            {products
              .filter((product) => product.category === category)
              .map((product) => (
                <div className="product-card" key={product.id}>
                  <img src={product.image} alt={product.name} className="product-image" />
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <div className="product-price">${product.price.toFixed(2)}</div>

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
                      if (!auth.isAuthenticated()) {
                        navigate('/signin', {
                          state: {
                            redirectTo: '/products',
                            pendingProduct: product,
                            selectedSize: selectedSize[product.id],
                            selectedColor: selectedColor[product.id],
                          },
                        });
                      } else {
                        addToCart(product, selectedSize[product.id], selectedColor[product.id]);
                      }
                    }}
                    >
          
                    Add to Cart
                  </button>
                </div>
              ))}
          </div>
        </div>
      ))}
      <Snackbar
        open={justAdded}
        autoHideDuration={3000}
        onClose={resetCartMessage}
        message="Added to cart successfully"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />

      <Footer />
    </div>
  );
};

export default ProductsPage;
