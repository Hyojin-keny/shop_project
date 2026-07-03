import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import Button from "@mui/material/Button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import auth from "../lib/auth-helper";
import blossomlogo from "./../assets/images/BlossomDevLogo.jpg"; // 🌸 Add logo

const isActive = (location, path) =>
  location.pathname === path ? "#90D5FF" : "#ffffff";

export default function Menu() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <AppBar position="static" sx={{ backgroundColor: "#000" }}>
      <Toolbar sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <img
          src={blossomlogo}
          alt="Blossom Logo"
          style={{
            width: 50,
            height: 50,
            borderRadius: "5%",
            marginRight: 10,
          }}
        />

        {/* 💬 Site title */}
        <Typography variant="h6" sx={{ flexGrow: 1, color: "#fff" }}>
          Blossom Co.
        </Typography>

        {/* 🔗 Navigation links */}
        <Link to="/">
          <IconButton aria-label="Home" sx={{ color: isActive(location, "/") }}>
            <HomeIcon />
          </IconButton>
        </Link>
        <Link to="/Products">
          <Button sx={{ color: isActive(location, "/Products") }}>Shop</Button>
        </Link>
        <Link to="/Cart">
          <Button sx={{ color: isActive(location, "/Cart") }}>Cart</Button>
        </Link>
        <Link to="/Contact">
          <Button sx={{ color: isActive(location, "/Contact") }}>Contact</Button>
        </Link>

        {!auth.isAuthenticated() && (
          <Link to="/Signin">
            <Button sx={{ color: isActive(location, "/Signin") }}>
              Sign In
            </Button>
          </Link>
        )}

        {auth.isAuthenticated() && (
          <Link to={`/user/${auth.isAuthenticated().user._id}`}>
            <Button
              sx={{
                color: isActive(
                  location,
                  `/user/${auth.isAuthenticated().user._id}`
                ),
              }}
            >
              Profile
            </Button>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
}
