import React from "react";
import { Typography, Box, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DesignImage from "./../assets/images/design1.png"; 
import design from "./../assets/images/design.png";
import Footer from "../components/Footer";
import Menu from "../components/Menu";
import NavbarCategory from "../components/NavbarCategory";
import products from "../product/productData"; // Add this import at the top
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Link } from "react-router-dom";

const Home = () => {
  const theme = useTheme();

  return (  
    <div>

      {/* Main Content */}
      <Box sx={{ maxWidth: 1000, margin: "auto", p: 3 }}>
        
        {/* Banner Image */}
        <img 
          src={DesignImage}
          alt="How we design our products"
          style={{ width: "100%", borderRadius: "10px", marginBottom: "30px" }}
        />

        

        {/* Image left - Text right (same row) */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            gap: 4,
            mt: 2,
            mb: 6,
          }}
        >
          <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
              Welcome to <strong>Blossom Co.</strong> — your go-to store for stylish men's fashion. 
              We offer quality clothing with modern design, perfect for any occasion. 
              Our curated collection includes T-shirts, pants, jackets, shoes, and more. 
              Every piece is chosen to help you express confidence, comfort, and personal style.
            </Typography>

        </Box>

        {/* Featured Products */}
        <Box sx={{ mt: 4, mb: 6 }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
            Featured Products
          </Typography>
          <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
            {products.slice(0, 4).map((product) => (
              <Link
                to={`/category/${product.category}`}
                key={product.id}
                style={{ textDecoration: "none" }}
              >
                <Card sx={{ width: 220, boxShadow: 3, cursor: "pointer" }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: "100%", height: 140, objectFit: "cover" }}
                  />
                  <CardContent>
                    <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ${product.price.toFixed(2)}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </Box>
        </Box>

        {/* View All Products Button */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Link to="/Products" style={{ textDecoration: "none" }}>
            <Button variant="contained" color="primary">
              View All Products
            </Button>
          </Link>
        </Box>
      </Box>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
