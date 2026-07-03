import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { useCart } from "./CartContext";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Box from "@mui/material/Box";

const Payment = () => {
  const theme = useTheme();
  const { cartItems } = useCart();

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

  // Shipping info state
  const [shipping, setShipping] = useState({
    email: "",
    phone: "",
    address: "",
    unit: "",
    postalCode: "",
    province: "",
    country: "",
    city: "",
  });

  // Payment info state
  const [paymentMethod, setPaymentMethod] = useState("visa");
  const [payment, setPayment] = useState({
    cardNumber: "",
    nameOnCard: "",
    expiry: "",
    cvv: "",
    email: "", // Only for PayPal
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleShippingChange = (e) =>
    setShipping({ ...shipping, [e.target.name]: e.target.value });

  const handlePaymentChange = (e) =>
    setPayment({ ...payment, [e.target.name]: e.target.value });

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
    setPayment({ ...payment, email: "" }); // Reset PayPal email if switching
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const orderData = {
        userId: "guest", // Replace with actual user ID if available
        paymentInfo: {
          method: paymentMethod,
          cardNumber: payment.cardNumber,
          nameOnCard: payment.nameOnCard,
          expiry: payment.expiry,
          cvv: payment.cvv,
          ...(paymentMethod === "paypal" && { email: payment.email }),
        },
        shippingInfo: shipping,
        cartItems: groupedArray.map((item) => ({
          productId: item.id,
          name: item.name,
          size: item.size,
          color: item.color,
          quantity: item.quantity,
          price: item.price,
        })),
        totalPrice: total,
      };

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
      if (!response.ok) throw new Error("Order failed");
      setSubmitted(true);
      // Optionally clear cart here if you add clearCart to context
    } catch (err) {
      setError("Could not place order. Please try again.");
    }
  };

  return (
    <Card sx={{ maxWidth: 900, margin: "auto", mt: 5, p: 3 }}>
      <Typography
        variant="h6"
        sx={{
          color: theme.custom?.openTitle || theme.palette.primary.main,
          mb: 2,
        }}
      >
        Checkout
      </Typography>
      <CardContent>
        {groupedArray.length === 0 ? (
          <Typography variant="body1">No items in cart.</Typography>
        ) : submitted ? (
          <Typography color="success.main" sx={{ mt: 2 }}>
            Thank you for your order!
          </Typography>
        ) : (
          <>
            {groupedArray.map((item, index) => (
              <div key={index} style={{ marginBottom: 15 }}>
                <Typography variant="subtitle1">{item.name}</Typography>
                <Typography variant="body2">Size: {item.size}</Typography>
                <Typography variant="body2">Color: {item.color}</Typography>
                <Typography variant="body2">
                  Price: ${item.price.toFixed(2)} x {item.quantity}
                </Typography>
                <Typography variant="body2">
                  Subtotal: ${(item.price * item.quantity).toFixed(2)}
                </Typography>
              </div>
            ))}
            <Typography variant="h6" sx={{ mt: 2 }}>
              Total: ${total.toFixed(2)}
            </Typography>
            <form onSubmit={handleSubmit}>
              <Typography
                variant="subtitle1"
                sx={{ mt: 2, mb: 1 }}
              >
                Shipping Information
              </Typography>
              <TextField
                label="Email"
                name="email"
                value={shipping.email}
                onChange={handleShippingChange}
                required
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Phone"
                name="phone"
                value={shipping.phone}
                onChange={handleShippingChange}
                required
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Address"
                name="address"
                value={shipping.address}
                onChange={handleShippingChange}
                required
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Unit"
                name="unit"
                value={shipping.unit}
                onChange={handleShippingChange}
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Postal Code"
                name="postalCode"
                value={shipping.postalCode}
                onChange={handleShippingChange}
                required
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Province"
                name="province"
                value={shipping.province}
                onChange={handleShippingChange}
                required
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Country"
                name="country"
                value={shipping.country}
                onChange={handleShippingChange}
                required
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="City"
                name="city"
                value={shipping.city}
                onChange={handleShippingChange}
                required
                fullWidth
                sx={{ mb: 2 }}
              />

              <FormLabel sx={{ mt: 2 }}>Payment Method</FormLabel>
              <RadioGroup
                row
                value={paymentMethod}
                onChange={handlePaymentMethodChange}
                sx={{ mb: 2 }}
              >
                <FormControlLabel
                  value="visa"
                  control={<Radio />}
                  label="Visa"
                />
                <FormControlLabel
                  value="paypal"
                  control={<Radio />}
                  label="PayPal"
                />
              </RadioGroup>

              <TextField
                label="Card Number"
                name="cardNumber"
                value={payment.cardNumber}
                onChange={handlePaymentChange}
                required
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Name on Card"
                name="nameOnCard"
                value={payment.nameOnCard}
                onChange={handlePaymentChange}
                required
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Expiry Date"
                name="expiry"
                value={payment.expiry}
                onChange={handlePaymentChange}
                required
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="CVV"
                name="cvv"
                value={payment.cvv}
                onChange={handlePaymentChange}
                required
                fullWidth
                sx={{ mb: 2 }}
              />
              {paymentMethod === "paypal" && (
                <TextField
                  label="PayPal Email"
                  name="email"
                  value={payment.email}
                  onChange={handlePaymentChange}
                  required
                  fullWidth
                  sx={{ mb: 2 }}
                />
              )}

              {error && (
                <Typography color="error" sx={{ mb: 2 }}>
                  {error}
                </Typography>
              )}
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ mt: 2 }}
              >
                Place Order
              </Button>
            </form>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default Payment;
