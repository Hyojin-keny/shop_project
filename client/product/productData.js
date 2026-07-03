// src/product/productData.js
import tshirtImage from "../assets/images/tshirt.png";
import hoodieImage from "../assets/images/hoodie.png";
import cargoImage from "../assets/images/cargo.png";
import denimImage from "../assets/images/denimjacket.png";
import baseballImage from "../assets/images/baseball.png";
import sneakerImage from "../assets/images/sneaker.png";
import beanieImage from "../assets/images/beanie.png";
import trackpantsImage from "../assets/images/trackpants.png";

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

export default products;
