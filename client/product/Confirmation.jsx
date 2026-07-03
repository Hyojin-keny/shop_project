import React from "react";
import { Container, Paper, Typography, Button, Box } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";

const Confirmation = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 5, textAlign: "center", borderRadius: 4 }}>
        <Box sx={{ mb: 3 }}>
          <CheckCircleIcon sx={{ fontSize: 64, color: "primary.main" }} />
        </Box>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
          Thank You for Your Order!
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Your order has been placed successfully.<br />
          A confirmation email will be sent to you soon.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ mt: 2, px: 4, fontWeight: "bold" }}
          onClick={() => navigate("/")}
        >
          Continue Shopping
        </Button>
      </Paper>
    </Container>
  );
};

export default Confirmation;