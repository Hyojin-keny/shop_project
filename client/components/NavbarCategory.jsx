import React from "react";
import { NavLink } from "react-router-dom";
import "./NavbarCategory.css"; // Optional: external styling

const categories = ["T-Shirts", "Pants","Jackets", "Shoes", "Accessories"];

const NavbarCategory = () => {
  return (
    <nav className="category-nav">
      {categories.map((category) => (
        <NavLink
          key={category}
          to={`/category/${category.toLowerCase()}`}
          className={({ isActive }) =>
            isActive ? "category-link active" : "category-link"
          }
        >
          {category}
        </NavLink>
      ))}
    </nav>
  );
};

export default NavbarCategory;
