// pages/index.js
import React, { useRef } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Container, 
  Grid, 
  Box, 
  Card, 
  CardMedia, 
  CardContent, 
  CardActions,
  Avatar,
  Paper,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import PeopleIcon from '@mui/icons-material/People';
import HandshakeIcon from '@mui/icons-material/Handshake';
import WorkIcon from '@mui/icons-material/Work';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import Head from 'next/head';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2563eb', // blue color from your image
    },
    secondary: {
      main: '#f5f7fa', // light background color
    },
    background: {
      default: '#f5f7fa',
    },
  },
  typography: {
    fontFamily: 'Roboto, "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 700,
      fontSize: '2rem',
      marginBottom: '1.5rem',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.25rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          padding: '10px 20px',
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
        },
      },
    },
  },
});

export default function LandingPage() {
  // Create refs for each section for smooth scrolling
  const homeRef = useRef(null);
  const featuresRef = useRef(null);
  const eventsRef = useRef(null);
  const testimonialsRef = useRef(null);

  // Function to scroll to a section
  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>AlumniHub - Connect, Grow, and Give Back</title>
        <meta
          name="description"
          content="Connect with fellow alumni, find mentorship opportunities, and advance your career."
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>

      <Box sx={{ flexGrow: 1, bgcolor: "background.default", mt:"-64px"}}>
        {/* Hero Section */}
        <Box
          ref={homeRef}
          sx={{
            pt: { xs: 10, md: 12 },
            pb: { xs: 8, md: 10 },
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Container>
            <Grid container spacing={6} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography
                  variant="h1"
                  component="h1"
                  color="text.primary"
                  gutterBottom
                >
                  Connect, Grow, and Give Back to Your Alma Mater
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ fontSize: "1.125rem", mb: 4, color: "text.secondary" }}
                >
                  Join our thriving community of alumni and students. Share
                  experiences, mentor others, and advance your career.
                </Typography>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Button variant="contained" size="large" color="primary">
                    Get Started
                  </Button>
                  <Button variant="outlined" size="large">
                    Learn More
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    bgcolor: "#FFD666",
                    borderRadius: 4,
                    p: 2,
                    boxShadow: 3,
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: "#1b2538",
                      borderRadius: 2,
                      color: "white",
                      p: 2,
                      height: "100%",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        p: 1,
                        mb: 2,
                        bgcolor: "rgba(255,255,255,0.1)",
                        borderRadius: 1,
                      }}
                    >
                      <Box
                        sx={{
                          width: 20,
                          height: 20,
                          borderRadius: "50%",
                          bgcolor: "primary.main",
                          mr: 1,
                        }}
                      />
                      <Typography variant="body2">Alumni Networking</Typography>
                      <Box sx={{ flexGrow: 1 }} />
                      <Typography
                        variant="body2"
                        sx={{
                          bgcolor: "rgba(255,255,255,0.1)",
                          px: 1,
                          borderRadius: 1,
                        }}
                      >
                        Search
                      </Typography>
                    </Box>

                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Box
                          sx={{
                            bgcolor: "rgba(255,255,255,0.05)",
                            p: 2,
                            borderRadius: 2,
                          }}
                        >
                          <Grid container spacing={2} alignItems="center">
                            <Grid item>
                              <Avatar sx={{ bgcolor: "primary.main" }}>
                                S
                              </Avatar>
                            </Grid>
                            <Grid item xs>
                              <Typography variant="subtitle1">
                                Sarah Chen
                              </Typography>
                              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                                Software Engineer
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Button
                                size="small"
                                variant="contained"
                                color="primary"
                                sx={{ borderRadius: 4 }}
                              >
                                Connect
                              </Button>
                            </Grid>
                          </Grid>
                        </Box>
                      </Grid>

                      <Grid item xs={4}>
                        <Box
                          sx={{
                            bgcolor: "rgba(255,255,255,0.05)",
                            p: 1,
                            borderRadius: 2,
                            textAlign: "center",
                          }}
                        >
                          <Avatar
                            sx={{ mx: "auto", mb: 1, bgcolor: "#40a9ff" }}
                          >
                            J
                          </Avatar>
                          <Typography variant="body2" noWrap>
                            James
                          </Typography>
                        </Box>
                      </Grid>

                      <Grid item xs={4}>
                        <Box
                          sx={{
                            bgcolor: "rgba(255,255,255,0.05)",
                            p: 1,
                            borderRadius: 2,
                            textAlign: "center",
                          }}
                        >
                          <Avatar
                            sx={{ mx: "auto", mb: 1, bgcolor: "#f5222d" }}
                          >
                            M
                          </Avatar>
                          <Typography variant="body2" noWrap>
                            Maria
                          </Typography>
                        </Box>
                      </Grid>

                      <Grid item xs={4}>
                        <Box
                          sx={{
                            bgcolor: "rgba(255,255,255,0.05)",
                            p: 1,
                            borderRadius: 2,
                            textAlign: "center",
                          }}
                        >
                          <Avatar
                            sx={{ mx: "auto", mb: 1, bgcolor: "#52c41a" }}
                          >
                            D
                          </Avatar>
                          <Typography variant="body2" noWrap>
                            David
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Features Section */}
        <Box ref={featuresRef} sx={{ py: 10, bgcolor: "white" }}>
          <Container>
            <Typography variant="h2" component="h2" align="center" gutterBottom>
              Everything You Need to Stay Connected
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Card sx={{ height: "100%" }}>
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 64,
                        height: 64,
                        borderRadius: "50%",
                        bgcolor: "#e6f0ff",
                        mb: 2,
                      }}
                    >
                      <PeopleIcon
                        sx={{ color: "primary.main", fontSize: 30 }}
                      />
                    </Box>
                    <Typography variant="h3" component="h3" gutterBottom>
                      Alumni Directory
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Search and connect with alumni based on industry,
                      location, and expertise.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card sx={{ height: "100%" }}>
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 64,
                        height: 64,
                        borderRadius: "50%",
                        bgcolor: "#e6f0ff",
                        mb: 2,
                      }}
                    >
                      <HandshakeIcon
                        sx={{ color: "primary.main", fontSize: 30 }}
                      />
                    </Box>
                    <Typography variant="h3" component="h3" gutterBottom>
                      Mentorship Program
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Find mentors or become one. Share knowledge and guide
                      others to success.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card sx={{ height: "100%" }}>
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 64,
                        height: 64,
                        borderRadius: "50%",
                        bgcolor: "#e6f0ff",
                        mb: 2,
                      }}
                    >
                      <WorkIcon sx={{ color: "primary.main", fontSize: 30 }} />
                    </Box>
                    <Typography variant="h3" component="h3" gutterBottom>
                      Referral Jobs
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Access job opportunities posted specifically by our alumni
                      network.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Stats Section */}
        <Box sx={{ py: 6, bgcolor: "primary.main", color: "white" }}>
          <Container>
            <Grid container spacing={3} textAlign="center">
              <Grid item xs={6} md={3}>
                <Typography
                  variant="h3"
                  component="div"
                  sx={{ fontSize: "2.5rem", fontWeight: 700 }}
                >
                  10,000+
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Active Alumni
                </Typography>
              </Grid>
              <Grid item xs={6} md={3}>
                <Typography
                  variant="h3"
                  component="div"
                  sx={{ fontSize: "2.5rem", fontWeight: 700 }}
                >
                  500+
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Mentorship Connections
                </Typography>
              </Grid>
              <Grid item xs={6} md={3}>
                <Typography
                  variant="h3"
                  component="div"
                  sx={{ fontSize: "2.5rem", fontWeight: 700 }}
                >
                  1,000+
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Job Opportunities
                </Typography>
              </Grid>
              <Grid item xs={6} md={3}>
                <Typography
                  variant="h3"
                  component="div"
                  sx={{ fontSize: "2.5rem", fontWeight: 700 }}
                >
                  200+
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Events Yearly
                </Typography>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Events Section */}
        <Box ref={eventsRef} sx={{ py: 10 }}>
          <Container>
            <Typography variant="h2" component="h2" gutterBottom>
              Upcoming Events
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Card sx={{ height: "100%" }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image="/api/placeholder/400/200"
                    alt="Tech Industry Networking Night"
                  />
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Dec 15, 2025
                    </Typography>
                    <Typography variant="h3" component="h3" gutterBottom>
                      Tech Industry Networking Night
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      paragraph
                    >
                      Connect with industry leaders and fellow alumni in tech.
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ px: 2, pb: 2 }}>
                    <Button size="small" color="primary">
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card sx={{ height: "100%" }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image="/api/placeholder/400/200"
                    alt="Career Development Webinar"
                  />
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Jan 10, 2025
                    </Typography>
                    <Typography variant="h3" component="h3" gutterBottom>
                      Career Development Webinar
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      paragraph
                    >
                      Expert insights on advancing your career in 2025.
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ px: 2, pb: 2 }}>
                    <Button size="small" color="primary">
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card sx={{ height: "100%" }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image="/api/placeholder/400/200"
                    alt="Annual Alumni Reunion"
                  />
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Feb 20, 2025
                    </Typography>
                    <Typography variant="h3" component="h3" gutterBottom>
                      Annual Alumni Reunion
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      paragraph
                    >
                      Join us for our biggest networking event of the year.
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ px: 2, pb: 2 }}>
                    <Button size="small" color="primary">
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Testimonials Section */}
        <Box ref={testimonialsRef} sx={{ py: 10, bgcolor: "white" }}>
          <Container>
            <Typography variant="h2" component="h2" align="center" gutterBottom>
              What Our Members Say
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Card sx={{ height: "100%" }}>
                  <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Avatar src="/api/placeholder/50/50" alt="Sarah Chen" />
                      <Box sx={{ ml: 2 }}>
                        <Typography variant="h6">Sarah Chen</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Software Engineer, Google
                        </Typography>
                      </Box>
                    </Box>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontStyle: "italic" }}
                    >
                      "Found my dream job through AlumniHub's network. The
                      mentorship program was invaluable for my career growth."
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card sx={{ height: "100%" }}>
                  <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Avatar
                        src="/api/placeholder/50/50"
                        alt="Sharmila Gaikwad"
                      />
                      <Box sx={{ ml: 2 }}>
                        <Typography variant="h6">Sharmila Gaikwad</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Startup Founder
                        </Typography>
                      </Box>
                    </Box>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontStyle: "italic" }}
                    >
                      "The alumni network helped me find co-founders and early
                      employees for my startup. Incredible community!"
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card sx={{ height: "100%" }}>
                  <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Avatar src="/api/placeholder/50/50" alt="Rohan Jain" />
                      <Box sx={{ ml: 2 }}>
                        <Typography variant="h6">Rohan Jain</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Product Manager, Microsoft
                        </Typography>
                      </Box>
                    </Box>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontStyle: "italic" }}
                    >
                      "Being a mentor on AlumniHub has been rewarding. It's
                      great to give back to the community that helped me
                      succeed."
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* CTA Section */}
        <Box sx={{ py: 8, bgcolor: "primary.main", color: "white" }}>
          <Container maxWidth="md" sx={{ textAlign: "center" }}>
            <Typography
              variant="h3"
              component="h2"
              gutterBottom
              sx={{ fontSize: "2rem" }}
            >
              Join Our Growing Community Today
            </Typography>
            <Typography variant="body1" paragraph sx={{ opacity: 0.9, mb: 4 }}>
              Connect with fellow alumni, find mentorship opportunities, and
              advance your career.
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{
                bgcolor: "white",
                color: "primary.main",
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.9)",
                },
              }}
            >
              Get Started Now
            </Button>
          </Container>
        </Box>

        {/* Footer */}
        <Box
          component="footer"
          sx={{ bgcolor: "#0f172a", color: "white", py: 6 }}
        >
          <Container>
            <Grid container spacing={4}>
              <Grid item xs={12} md={3}>
                <Typography variant="h6" gutterBottom component="h3">
                  AlumniHub
                </Typography>
                <Typography variant="body2" sx={{ color: "#cbd5e1", mb: 2 }}>
                  Connecting graduates, fostering growth, and building lasting
                  professional relationships.
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="h6" gutterBottom component="h3">
                  Quick Links
                </Typography>
                <List disablePadding>
                  {["About Us", "Directory", "Events", "Mentorship"].map(
                    (item) => (
                      <ListItem key={item} disablePadding disableGutters>
                        <ListItemText
                          primary={item}
                          primaryTypographyProps={{
                            variant: "body2",
                            sx: { color: "#cbd5e1" },
                          }}
                          sx={{ my: 0.5 }}
                        />
                      </ListItem>
                    )
                  )}
                </List>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="h6" gutterBottom component="h3">
                  Resources
                </Typography>
                <List disablePadding>
                  {[
                    "Help Center",
                    "Privacy Policy",
                    "Terms of Service",
                    "Contact Us",
                  ].map((item) => (
                    <ListItem key={item} disablePadding disableGutters>
                      <ListItemText
                        primary={item}
                        primaryTypographyProps={{
                          variant: "body2",
                          sx: { color: "#cbd5e1" },
                        }}
                        sx={{ my: 0.5 }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Grid>
              <Grid item xs={12} md={3}>
                <Typography variant="h6" gutterBottom component="h3">
                  Follow Us
                </Typography>
                <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                  <IconButton size="small" sx={{ color: "white" }}>
                    <LinkedInIcon />
                  </IconButton>
                  <IconButton size="small" sx={{ color: "white" }}>
                    <TwitterIcon />
                  </IconButton>
                  <IconButton size="small" sx={{ color: "white" }}>
                    <FacebookIcon />
                  </IconButton>
                  <IconButton size="small" sx={{ color: "white" }}>
                    <InstagramIcon />
                  </IconButton>
                </Box>
              </Grid>
            </Grid>
            <Divider sx={{ my: 3, borderColor: "rgba(255,255,255,0.1)" }} />
            <Typography
              variant="body2"
              align="center"
              sx={{ color: "#94a3b8" }}
            >
              © 2025 AlumniHub. All rights reserved.
            </Typography>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}