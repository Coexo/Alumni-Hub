import React, { useEffect, useState } from 'react';
import { 
  Button, Typography, Grid, TextField,
  Radio, RadioGroup, FormControlLabel, FormControl,
  FormLabel, Divider, Box, Chip, Container,
  Stepper, Step, StepLabel, CircularProgress,
  Dialog, DialogContent, DialogContentText, DialogTitle,
  DialogActions, Alert, Card as MuiCard, Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  CreditCard as CreditCardIcon, 
  Check as CheckIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';
import AppTheme from '../signupcomponent/shared-theme/AppTheme';

// Styled components
const Card = styled(MuiCard)(({ theme, color, popular }) => ({
  width: '35vh',
  height: '65vh',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)'
  },
  border: popular ? `2px solid ${color}` : 'none',
  boxShadow: popular 
    ? '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'
    : '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'
}));

const PaymentPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
  maxWidth: 800,
  marginLeft: 'auto',
  marginRight: 'auto',
  boxShadow: 'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px'
}));

const Payment = (props) => {
  const [showPayment, setShowPayment] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null); // 'processing', 'success', 'failed'
  const [activeStep, setActiveStep] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [orderId, setOrderId] = useState('');
  
  const steps = ['Select Plan', 'Payment Details', 'Confirmation'];
  
  const plans = [
    {
      title: "Free Plan",
      price: "₹0",
      period: "Lifetime",
      features: [
        "Chat feature",
        "Video call feature",
        "Internship/Job referrals",
        "Discussion Forum",
      ],
      color: "#47e028",
      popular: false,
    },
    {
      title: "Gold Plan",
      price: "₹199",
      period: "/month",
      features: [
        "Email Notifications",
        "Whatsapp notifications",
        "Exclusive Job Posting",
        "Skill-based Job Referral",
        "Includes features of free plan",
      ],
      color: "#FFD700",
      popular: true,
    },
  ];

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setShowPayment(true);
    setActiveStep(1);
  };

  const handleBack = () => {
    if (paymentStatus) {
      // Reset everything if coming back from confirmation
      setPaymentStatus(null);
      setShowPayment(false);
      setActiveStep(0);
    } else {
      // Just go back to plan selection
      setShowPayment(false);
      setActiveStep(0);
    }
  };

  const handlePayment = async () => {
    setPaymentStatus('processing');
    setOpenDialog(true);
    
    // Simulate payment processing
    setTimeout(() => {
      // Generate a random order ID
      const newOrderId = 'ORD' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
      setOrderId(newOrderId);
      
      // 90% chance of success (for demo purposes)
      const isSuccess = Math.random() < 0.9;
      
      setPaymentStatus(isSuccess ? 'success' : 'failed');
      
      if (isSuccess) {
        setActiveStep(2);
      }
    }, 3000);

    try {
      const response = await fetch("http://localhost:4001/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: localStorage.getItem("userId"),
      });
  
      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error("Subscription failed", error);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleTryAgain = () => {
    setPaymentStatus(null);
    setOpenDialog(false);
  };

  useEffect(()=>{
    document.body.style.backgroundColor = "#f2f0ef";
  },[])

  return (
    <AppTheme {...props}>
      <Container maxWidth="lg">
        <Box py={4}>
          <Typography variant="h3" align="center" gutterBottom color='black'>
            Choose Your Subscription Plan
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary" paragraph>
            Select the perfect plan for your website needs
          </Typography>
          
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          
          {!showPayment ? (
            <Grid container spacing={4} justifyContent="center" mt={4}>
              {plans.map((plan, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card color={plan.color} popular={plan.popular} elevation={plan.popular ? 8 : 2}>
                    {plan.popular && (
                      <Chip 
                        label="MOST POPULAR" 
                        color="primary" 
                        sx={{ 
                          position: 'absolute', 
                          top: '2px', 
                          right: '2px',
                          fontWeight: 'bold',
                          fontSize: '0.5rem',
                        }} 
                      />
                    )}
                    <Box
                      sx={{
                        backgroundColor: plan.color, 
                        color: plan.color === "#FFD700" ? "#000" : "#fff",
                        p: 2
                      }}
                    >
                      <Typography variant="h5" fontWeight="bold" align="center">
                        {plan.title}
                      </Typography>
                    </Box>
                    <Box sx={{ flexGrow: 1, p: 3 }}>
                      <Box display="flex" justifyContent="center" alignItems="baseline" mb={3}>
                        <Typography component="h2" variant="h3" fontWeight="bold">
                          {plan.price}
                        </Typography>
                        <Typography variant="h6" color="text.secondary">
                          {plan.period}
                        </Typography>
                      </Box>
                      <Divider />
                      <Box mt={2}>
                        {plan.features.map((feature, idx) => (
                          <Box display="flex" alignItems="center" mt={2} key={idx}>
                            <CheckIcon sx={{ color: plan.color, mr: 1 }} />
                            <Typography variant="body1">{feature}</Typography>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                    <Box sx={{ justifyContent: 'center', pb: 3, display: 'flex' }}>
                      <Button 
                        variant="contained" 
                        size="large"
                        onClick={() => handleSelectPlan(plan)}
                        // sx={{ 
                        //   backgroundColor: plan.color,
                        //   color: plan.color === "#FFD700" ? "#000" : "#fff",
                        //   '&:hover': {
                        //     backgroundColor: plan.color,
                        //     opacity: 0.9
                        //   }
                        // }}
                      >
                        Subscribe Now
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : paymentStatus === 'success' ? (
            // Payment confirmation view
            <PaymentPaper elevation={3}>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                mb: 4
              }}>
                <CheckCircleIcon sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
                <Typography variant="h4" gutterBottom color="success.main">
                  Payment Successful!
                </Typography>
              </Box>
              
              <Typography variant="h6" gutterBottom>
                Thank you for subscribing to our {selectedPlan.title}!
              </Typography>
              
              <Box sx={{ bgcolor: 'grey.100', p: 3, borderRadius: 2, mt: 3, mb: 4 }}>
                <Typography variant="body1" gutterBottom>
                  <strong>Order ID:</strong> {orderId}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Plan:</strong> {selectedPlan.title}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Amount Paid:</strong> {selectedPlan.price}{selectedPlan.period}
                </Typography>
                <Typography variant="body1">
                  <strong>Payment Date:</strong> {new Date().toLocaleDateString()}
                </Typography>
              </Box>
              
              <Typography variant="body1" paragraph>
                We've sent a confirmation email with subscription details and receipt to your registered email address.
              </Typography>
              
              <Typography variant="body1" paragraph>
                Your subscription is now active. Our team will contact you within 24 hours to begin working on your website.
              </Typography>
              
              <Box mt={4}>
                <Button 
                  variant="outlined" 
                  onClick={handleBack}
                  sx={{ mr: 2 }}
                >
                  Back to Plans
                </Button>
                <Button 
                  variant="contained" 
                  color="primary"
                >
                  Go to Dashboard
                </Button>
              </Box>
            </PaymentPaper>
          ) : (
            // Payment form view
            <PaymentPaper elevation={3}>
              <Typography variant="h4" gutterBottom>
                Payment Details
              </Typography>
              <Typography variant="subtitle1" color="primary" gutterBottom>
                You have selected: <strong>{selectedPlan.title}</strong> - {selectedPlan.price}{selectedPlan.period}
              </Typography>
              
              <Box mt={4}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Payment Method</FormLabel>
                  <RadioGroup defaultValue="credit-card" name="payment-method">
                    <FormControlLabel value="credit-card" control={<Radio />} label="Credit/Debit Card" />
                    <FormControlLabel value="upi" control={<Radio />} label="UPI" />
                    <FormControlLabel value="netbanking" control={<Radio />} label="Net Banking" />
                  </RadioGroup>
                </FormControl>
              </Box>
              
              <Box mt={4}>
                <Typography variant="h6" gutterBottom>
                  Card Information
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <FormLabel sx={{ textAlign: 'left', paddingLeft: '5px' }}>Card Number</FormLabel>
                      <TextField
                        required
                        placeholder="XXXX XXXX XXXX XXXX"
                        InputProps={{
                          startAdornment: <CreditCardIcon sx={{ mr: 1, color: 'text.secondary' }} />
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <FormLabel sx={{ textAlign: 'left', paddingLeft: '5px' }}>Expiry Date</FormLabel>
                      <TextField
                        required
                        placeholder="MM/YY"
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <FormLabel sx={{ textAlign: 'left', paddingLeft: '5px' }}>CVV</FormLabel>
                      <TextField
                        required
                        placeholder="XXX"
                        type="password"
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <FormLabel sx={{ textAlign: 'left', paddingLeft: '5px' }}>Cardholder Name</FormLabel>
                      <TextField
                        required
                        placeholder="As shown on card"
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Box>
              
              <Box mt={4}>
                <Typography variant="h6" gutterBottom>
                  Billing Information
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <FormLabel sx={{ textAlign: 'left', paddingLeft: '5px' }}>Email</FormLabel>
                      <TextField
                        required
                        type="email"
                        placeholder="your@email.com"
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <FormLabel sx={{ textAlign: 'left', paddingLeft: '5px' }}>Address</FormLabel>
                      <TextField
                        required
                        placeholder="Enter your address"
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <FormLabel sx={{ textAlign: 'left', paddingLeft: '5px' }}>City</FormLabel>
                      <TextField
                        required
                        placeholder="Enter your city"
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <FormLabel sx={{ textAlign: 'left', paddingLeft: '5px' }}>PIN Code</FormLabel>
                      <TextField
                        required
                        placeholder="Enter PIN code"
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Box>
              
              <Box mt={4} display="flex" justifyContent="space-between">
                <Button 
                  variant="outlined" 
                  onClick={handleBack}
                >
                  Back to Plans
                </Button>
                <Button 
                  variant="contained" 
                  color="primary" 
                  size="large"
                  onClick={handlePayment}
                >
                  Pay {selectedPlan.price}
                </Button>
              </Box>
            </PaymentPaper>
          )}
          
          {/* Payment Processing Dialog */}
          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>
              {paymentStatus === 'processing' ? 'Processing Payment' : 
               paymentStatus === 'success' ? 'Payment Successful' : 
               'Payment Failed'}
            </DialogTitle>
            <DialogContent>
              {paymentStatus === 'processing' ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
                  <CircularProgress size={60} sx={{ mb: 3 }} />
                  <DialogContentText>
                    Please wait while we process your payment...
                  </DialogContentText>
                </Box>
              ) : paymentStatus === 'success' ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
                  <CheckCircleIcon color="success" sx={{ fontSize: 60, mb: 2 }} />
                  <DialogContentText>
                    Your payment has been processed successfully! Click Continue to view your subscription details.
                  </DialogContentText>
                </Box>
              ) : (
                <Box sx={{ p: 2 }}>
                  <Alert severity="error" sx={{ mb: 2 }}>
                    We couldn't process your payment. Please check your payment details and try again.
                  </Alert>
                  <DialogContentText>
                    Common reasons for payment failures include insufficient funds, incorrect card details, or temporary network issues.
                  </DialogContentText>
                </Box>
              )}
            </DialogContent>
            <DialogActions>
              {paymentStatus === 'processing' ? null : paymentStatus === 'success' ? (
                <Button onClick={handleCloseDialog} color="primary" autoFocus>
                  Continue
                </Button>
              ) : (
                <>
                  <Button onClick={handleCloseDialog} color="inherit">
                    Cancel
                  </Button>
                  <Button onClick={handleTryAgain} color="primary" autoFocus>
                    Try Again
                  </Button>
                </>
              )}
            </DialogActions>
          </Dialog>
        </Box>
      </Container>
    </AppTheme>
  );
};

export default Payment;