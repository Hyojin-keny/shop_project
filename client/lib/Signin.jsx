import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Icon from "@mui/material/Icon";
import auth from "./auth-helper.js";
import { useNavigate, useLocation } from 'react-router-dom';
import { signin } from "./api-auth.js";
import { useCart } from "../product/CartContext.jsx";

export default function Signin() {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [values, setValues] = useState({
    email: "",
    password: "",
    error: ""
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = async () => {
    const user = {
      email: values.email,
      password: values.password,
    };

    const jwt = await signin(user);
    if (jwt?.token) {
      auth.authenticate(jwt, () => {
        if (location.state?.pendingProduct) {
          addToCart(
            location.state.pendingProduct,
            location.state.selectedSize,
            location.state.selectedColor
          );
        }

        const redirect = location.state?.redirectTo || '/';
        navigate(redirect);
      });
    } else {
      setValues({ ...values, error: 'Sign in failed' });
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 600,
        margin: "auto",
        textAlign: "center",
        mt: 5,
        pb: 2,
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ mt: 2, color: "text.primary" }}>
          Sign In
        </Typography>
        <TextField
          id="email"
          type="email"
          label="Email"
          sx={{ mx: 1, width: 300 }}
          value={values.email}
          onChange={handleChange("email")}
          margin="normal"
        />
        <br />
        <TextField
          id="password"
          type="password"
          label="Password"
          sx={{ mx: 1, width: 300 }}
          value={values.password}
          onChange={handleChange("password")}
          margin="normal"
        />
        <br />
        {values.error && (
          <Typography component="p" color="error" sx={{ mt: 1 }}>
            <Icon color="error" sx={{ verticalAlign: "middle", mr: 0.5 }}>
              error
            </Icon>
            {values.error}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button
          color="primary"
          variant="contained"
          onClick={handleSubmit}
          sx={{ margin: "auto", mb: 2 }}
        >
          Enter
        </Button>
      </CardActions>
      <Typography sx={{ mt: 1 }}>
        Don't have an account?{" "}
        <a href="/signup" style={{ color: "#1976d2", textDecoration: "none" }}>
          Sign up
        </a>
      </Typography>
    </Card>
  );
}
