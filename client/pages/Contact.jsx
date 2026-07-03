import React, { useState } from "react";
import {
  Card,
  CardContent,
  Button,
  TextField,
  Typography,
  Box,
  Grid,
  Paper,
  Container,
  Divider,
  IconButton,
  Alert,
  Fade,
  Zoom
} from "@mui/material";
import {
  ContactMail,
  Phone,
  LocationOn,
  Send,
  Clear,
  CheckCircle,
  Email,
  Person,
  Message
} from "@mui/icons-material";

export default function Contact() {
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    number: "",
    message: "",
    error: "",
    sent: false,
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !values.firstname ||
      !values.lastname ||
      !values.email ||
      !values.number ||
      !values.message
    ) {
      setValues({ ...values, error: "All fields are required." });
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: values.firstname,
          lastname: values.lastname,
          email: values.email,
          number: values.number,
          message: values.message,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setValues({ ...values, error: data.error || "Failed to send message." });
        return;
      }

      setValues({
        firstname: "",
        lastname: "",
        email: "",
        number: "",
        message: "",
        error: "",
        sent: true,
      });
    } catch (err) {
      setValues({ ...values, error: "Network error. Please try again." });
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Header Section */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <ContactMail sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: 'bold',
            color: 'primary.main',
            mb: 2
          }}
        >
          Get In Touch
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ maxWidth: 600, mx: 'auto' }}
        >
          We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Contact Information */}
        <Grid item xs={12} md={4}>
          <Box sx={{ height: '100%' }}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                height: '100%',
                background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 50%, #000000 100%)',
                color: 'white',
                borderRadius: 3
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
                Contact Information
              </Typography>
              <Typography variant="body1" sx={{ mb: 4, opacity: 0.9 }}>
                Feel free to reach out to us through any of these channels.
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Email sx={{ mr: 2, fontSize: 24 }} />
                <Box>
                  <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
                    Email
                  </Typography>
                  <Typography variant="body1">
                    contact@blossomdev.com
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Phone sx={{ mr: 2, fontSize: 24 }} />
                <Box>
                  <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
                    Phone
                  </Typography>
                  <Typography variant="body1">
                    +1 (555) 123-4567
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <LocationOn sx={{ mr: 2, fontSize: 24 }} />
                <Box>
                  <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
                    Address
                  </Typography>
                  <Typography variant="body1">
                    123 Business St, Suite 100<br />
                    Toronto, ON M5V 3A8
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,0.3)' }} />

              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                We typically respond within 24 hours during business days.
              </Typography>
            </Paper>
          </Box>
        </Grid>

        {/* Contact Form */}
        <Grid item xs={12} md={8}>
          <Paper elevation={2} sx={{ p: 4, borderRadius: 3 }}>
            {values.sent ? (
              <Zoom in={values.sent}>
                <Box sx={{ textAlign: 'center', py: 6 }}>
                  <CheckCircle sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
                  <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, color: 'success.main' }}>
                    Message Sent!
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                    Thank you for contacting us. We'll get back to you soon!
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() =>
                      setValues({
                        firstname: "",
                        lastname: "",
                        email: "",
                        number: "",
                        message: "",
                        error: "",
                        sent: false,
                      })
                    }
                    sx={{ borderRadius: 2, px: 4 }}
                  >
                    Send Another Message
                  </Button>
                </Box>
              </Zoom>
            ) : (
              <form onSubmit={handleSubmit}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
                  Send us a message
                </Typography>

                <Grid container spacing={3}>
                  {/* Name Fields */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="firstname"
                      label="First Name"
                      value={values.firstname}
                      onChange={handleChange("firstname")}
                      fullWidth
                      required
                      variant="outlined"
                      InputProps={{
                        startAdornment: <Person sx={{ color: 'text.secondary', mr: 1 }} />
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="lastname"
                      label="Last Name"
                      value={values.lastname}
                      onChange={handleChange("lastname")}
                      fullWidth
                      required
                      variant="outlined"
                      InputProps={{
                        startAdornment: <Person sx={{ color: 'text.secondary', mr: 1 }} />
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2
                        }
                      }}
                    />
                  </Grid>

                  {/* Contact Fields */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="email"
                      type="email"
                      label="Email Address"
                      value={values.email}
                      onChange={handleChange("email")}
                      fullWidth
                      required
                      variant="outlined"
                      InputProps={{
                        startAdornment: <Email sx={{ color: 'text.secondary', mr: 1 }} />
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="number"
                      type="tel"
                      label="Phone Number"
                      value={values.number}
                      onChange={handleChange("number")}
                      fullWidth
                      required
                      variant="outlined"
                      placeholder="+1 (555) 123-4567"
                      InputProps={{
                        startAdornment: <Phone sx={{ color: 'text.secondary', mr: 1 }} />
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2
                        }
                      }}
                    />
                  </Grid>

                  {/* Message Field */}
                  <Grid item xs={12}>
                    <TextField
                      id="message"
                      label="Your Message"
                      multiline
                      rows={6}
                      value={values.message}
                      onChange={handleChange("message")}
                      fullWidth
                      required
                      variant="outlined"
                      placeholder="Tell us about your project, questions, or how we can help you..."
                      InputProps={{
                        startAdornment: (
                          <Message sx={{ 
                            color: 'text.secondary', 
                            mr: 1, 
                            alignSelf: 'flex-start', 
                            mt: 1.5 
                          }} />
                        )
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2
                        }
                      }}
                    />
                  </Grid>

                  {/* Error Display */}
                  {values.error && (
                    <Grid item xs={12}>
                      <Fade in={!!values.error}>
                        <Alert 
                          severity="error" 
                          sx={{ 
                            borderRadius: 2,
                            '& .MuiAlert-message': {
                              fontWeight: 'medium'
                            }
                          }}
                        >
                          {values.error}
                        </Alert>
                      </Fade>
                    </Grid>
                  )}

                  {/* Action Buttons */}
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        startIcon={<Send />}
                        sx={{
                          flex: 1,
                          py: 1.5,
                          borderRadius: 2,
                          fontSize: '1.1rem',
                          fontWeight: 'bold',
                          textTransform: 'none',
                          boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 6px 20px rgba(0,0,0,0.3)'
                          },
                          transition: 'all 0.3s ease'
                        }}
                      >
                        Send Message
                      </Button>
                      <Button
                        type="button"
                        variant="outlined"
                        size="large"
                        startIcon={<Clear />}
                        onClick={() =>
                          setValues({
                            firstname: "",
                            lastname: "",
                            email: "",
                            number: "",
                            message: "",
                            error: "",
                            sent: false,
                          })
                        }
                        sx={{
                          px: 3,
                          py: 1.5,
                          borderRadius: 2,
                          textTransform: 'none',
                          borderWidth: 2,
                          '&:hover': {
                            borderWidth: 2,
                            transform: 'translateY(-1px)'
                          },
                          transition: 'all 0.3s ease'
                        }}
                      >
                        Clear
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </form>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Additional Info Section */}
      <Box sx={{ mt: 6, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Have a question about our services? Check out our FAQ or give us a call directly.
        </Typography>
      </Box>
    </Container>
  );
}
