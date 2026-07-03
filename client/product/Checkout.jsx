import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Add this import
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CardActions,
  Grid,
  Box,
  Divider,
  Paper,
  Container
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useCart } from "./CartContext";
import { createOrder } from "./api-checkout";

const ProductCheckout = () => {
  const theme = useTheme();
  const navigate = useNavigate(); // Add this line
  const { cartItems } = useCart();

  console.log("Cart items in Checkout:", cartItems);

  // Group cart items by productId + size + color
  const groupedItems = cartItems.reduce((acc, item) => {
    const key = `${item.id}-${item.size}-${item.color}`;
    if (!acc[key]) {
      acc[key] = { ...item, quantity: 1 };
    } else {
      acc[key].quantity += 1;
    }
    return acc;
  }, {});

  const groupedArray = Object.values(groupedItems);

  const total = groupedArray.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const [values, setValues] = useState({
    paymentInfo: {
      nameOnCard: "",
      cardNumber: "",
      expirationDate: "",
      cvv: "",
    },
    shippingInfo: {
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "",
      city: "",
      province: "",
      postalCode: "",
    },
    error: "",
  });

  const handleChange = (section, field) => (event) => {
    setValues({
      ...values,
      [section]: {
        ...values[section],
        [field]: event.target.value,
      },
    });
  };

  const validateForm = () => {
    const { paymentInfo, shippingInfo } = values;
    
    // Check if all required fields are filled
    const requiredPaymentFields = ['nameOnCard', 'cardNumber', 'expirationDate', 'cvv'];
    const requiredShippingFields = ['firstName', 'lastName', 'address', 'phoneNumber', 'city', 'province', 'postalCode'];
    
    for (let field of requiredPaymentFields) {
      if (!paymentInfo[field]) {
        return `Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`;
      }
    }
    
    for (let field of requiredShippingFields) {
      if (!shippingInfo[field]) {
        return `Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`;
      }
    }
    
    // Basic card number validation (just check if it's 16 digits)
    if (!/^\d{16}$/.test(paymentInfo.cardNumber.replace(/\s/g, ''))) {
      return "Please enter a valid 16-digit card number";
    }
    
    // Basic expiration date validation (MM/YY format)
    if (!/^\d{2}\/\d{2}$/.test(paymentInfo.expirationDate)) {
      return "Please enter expiration date in MM/YY format";
    }
    
    // CVV validation (3-4 digits)
    if (!/^\d{3,4}$/.test(paymentInfo.cvv)) {
      return "Please enter a valid CVV (3-4 digits)";
    }
    
    return null;
  };

  const clickSubmit = () => {
    // Validate form
    const validationError = validateForm();
    if (validationError) {
      setValues({ ...values, error: validationError });
      return;
    }

    setValues({ ...values, error: "" });

    const order = {
      items: groupedArray,
      total: total,
      paymentInfo: values.paymentInfo,
      shippingInfo: values.shippingInfo,
      orderDate: new Date().toISOString(),
    };

    createOrder(order).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        // Redirect to confirmation page
        navigate("/confirmation");
        // Optionally clear cart here
        // clearCart();
      }
    });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        sx={{
          color: theme.palette.primary.main,
          mb: 4,
          textAlign: 'center',
          fontWeight: 'bold'
        }}
      >
        Checkout
      </Typography>

      {groupedArray.length === 0 ? (
        <Paper elevation={2} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">
            Your cart is empty
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            Add some items to your cart to proceed with checkout.
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={4}>
          {/* Order Summary Section */}
          <Grid item xs={12} md={5}>
            <Paper elevation={2} sx={{ p: 3, height: 'fit-content', position: 'sticky', top: 20 }}>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
                Order Summary
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                {groupedArray.map((item, index) => (
                  <Box key={index} sx={{ mb: 2, pb: 2, borderBottom: index < groupedArray.length - 1 ? 1 : 0, borderColor: 'divider' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Size: {item.size} • Color: {item.color}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                      <Typography variant="body2">
                        ${item.price.toFixed(2)} × {item.quantity}
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>

              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body1">Subtotal:</Typography>
                <Typography variant="body1">${total.toFixed(2)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body1">Shipping:</Typography>
                <Typography variant="body1">Free</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body1">Tax:</Typography>
                <Typography variant="body1">${(total * 0.13).toFixed(2)}</Typography>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Total:
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                  ${(total * 1.13).toFixed(2)}
                </Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Form Section */}
          <Grid item xs={12} md={7}>
            <Paper elevation={2} sx={{ p: 4 }}>
              {/* Payment Information Section */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                  Payment Information
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Enter your payment details to complete the purchase
                </Typography>
                
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      id="nameOnCard"
                      label="Name on Card"
                      value={values.paymentInfo.nameOnCard}
                      onChange={handleChange("paymentInfo", "nameOnCard")}
                      fullWidth
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="cardNumber"
                      label="Card Number"
                      value={values.paymentInfo.cardNumber}
                      onChange={handleChange("paymentInfo", "cardNumber")}
                      placeholder="1234 5678 9012 3456"
                      fullWidth
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="expirationDate"
                      label="Expiry Date"
                      value={values.paymentInfo.expirationDate}
                      onChange={handleChange("paymentInfo", "expirationDate")}
                      placeholder="MM/YY"
                      fullWidth
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="cvv"
                      label="CVV"
                      value={values.paymentInfo.cvv}
                      onChange={handleChange("paymentInfo", "cvv")}
                      placeholder="123"
                      fullWidth
                      required
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              </Box>

              <Divider sx={{ my: 4 }} />

              {/* Shipping Information Section */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                  Shipping Information
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Where should we deliver your order?
                </Typography>
                
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      id="firstName"
                      label="First Name"
                      value={values.shippingInfo.firstName}
                      onChange={handleChange("shippingInfo", "firstName")}
                      fullWidth
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="lastName"
                      label="Last Name"
                      value={values.shippingInfo.lastName}
                      onChange={handleChange("shippingInfo", "lastName")}
                      fullWidth
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="address"
                      label="Street Address"
                      value={values.shippingInfo.address}
                      onChange={handleChange("shippingInfo", "address")}
                      fullWidth
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="phoneNumber"
                      label="Phone Number"
                      value={values.shippingInfo.phoneNumber}
                      onChange={handleChange("shippingInfo", "phoneNumber")}
                      placeholder="+1 (555) 123-4567"
                      fullWidth
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      id="city"
                      label="City"
                      value={values.shippingInfo.city}
                      onChange={handleChange("shippingInfo", "city")}
                      fullWidth
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      id="province"
                      label="Province/State"
                      value={values.shippingInfo.province}
                      onChange={handleChange("shippingInfo", "province")}
                      fullWidth
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      id="postalCode"
                      label="Postal Code"
                      value={values.shippingInfo.postalCode}
                      onChange={handleChange("shippingInfo", "postalCode")}
                      placeholder="A1A 1A1"
                      fullWidth
                      required
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              </Box>

              {/* Error Display */}
              {values.error && (
                <Box sx={{ mb: 3 }}>
                  <Typography color="error" variant="body1" sx={{ 
                    backgroundColor: 'error.light', 
                    color: 'error.contrastText',
                    p: 2, 
                    borderRadius: 1,
                    fontWeight: 'medium'
                  }}>
                    {values.error}
                  </Typography>
                </Box>
              )}

              {/* Terms and Submit */}
              <Box sx={{ mt: 4 }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  By placing this order, you agree to our terms and conditions and privacy policy.
                </Typography>
                
                <Button
                  color="primary"
                  variant="contained"
                  onClick={clickSubmit}
                  size="large"
                  fullWidth
                  sx={{ 
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    textTransform: 'none'
                  }}
                >
                  Place Order • ${(total * 1.13).toFixed(2)}
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default ProductCheckout;
