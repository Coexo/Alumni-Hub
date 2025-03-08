

import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Container, 
  Box, 
  CssBaseline, 
  ThemeProvider, 
  createTheme,
  Paper, 
  InputBase, 
  IconButton, 
  Grid,
  Card, 
  CardActionArea, 
  CardContent, 
  CardMedia, 
  Chip,
  Button,
  Divider,
  useMediaQuery
} from '@mui/material';
import { 
  AccessTime, 
  Group, 
  LocationOn, 
  Share,
  BookmarkBorder,
  ArrowBack
} from '@mui/icons-material';
// import { useParams, useRouter } from 'next/navigation';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EditIcon from '@mui/icons-material/Edit';
// import './globals.css';
import { Link } from 'react-router-dom';

// Create theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff',
    }
  },
  typography: {
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.1)'
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
          }
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500
        }
      }
    }
  }
});

// Mock event data
const events = [
  {
    id: 1,
    title: "The Ultimate Guide to Secure WordPress Plugin Development",
    description: "Learn how to develop secure WordPress plugins with best practices and security measures. This comprehensive workshop will cover vulnerability assessment, code sanitization, nonce implementation, and proper database interactions. Perfect for developers looking to enhance their WordPress development skills with a focus on security.",
    date: "2025-03-15",
    time: "4:00 PM IST",
    host: "WordPress Mumbai Meetup",
    location: "99 Fabulous Limited, Lower Parel West",
    image: "/images/wordpress-event.jpg",
    attendees: 41,
    free: true,
    detailImage: "/images/wordpress-event-detail.jpg"
  },
  {
    id: 2,
    title: "GLOBAL STARTUPS CLUB | STARTUP NETWORKING MUMBAI 2025",
    description: "Connect with startup founders, investors and mentors in this networking event for the startup ecosystem. This is your opportunity to build meaningful connections, share experiences, and potentially find your next business partner or investor.",
    date: "2025-03-09",
    time: "10:30 AM IST",
    host: "Mumbai Startups & Business Meetups",
    hostedBy: "Mohit S.",
    location: "603 The Coworking space (Matulya), 2nd Floor, Matulya Centre, Lower Parel, Mumbai",
    image: "/images/startup-networking.jpg",
    attendees: 28,
    free: true,
    detailImage: "/images/startup-networking-detail.jpg",
    endTime: "1:30 PM IST"
  },
  {
    id: 3,
    title: "AI and Marketing: The New Growth Formula",
    description: "Discover how AI is revolutionizing marketing strategies and driving growth for businesses. Learn about practical applications of machine learning and natural language processing in customer segmentation, content creation, and marketing automation.",
    date: "2025-03-15",
    time: "11:00 AM IST",
    host: "eChai Mumbai Startup Network",
    location: "WeWork, Vikhroli West, Mumbai",
    image: "/images/ai-marketing.jpg",
    attendees: 14,
    free: true
  },
  {
    id: 4,
    title: "D2C Startups Meetup in Mumbai",
    description: "A meetup focused on Direct-to-Consumer startups to share knowledge, experiences and network. Join fellow founders and professionals in the D2C space to discuss challenges, opportunities, and strategies for scaling your business.",
    date: "2025-03-15",
    time: "6:00 PM IST",
    host: "eChai Mumbai Startup Network",
    location: "Dextrus Coworking, BKC, Mumbai",
    image: "/images/d2c-startups.jpg",
    attendees: 9,
    free: true
  },
  {
    id: 5,
    title: "Mumbai Tech Conference 2025",
    description: "The largest tech conference in Mumbai featuring keynote speakers from top tech companies, workshops on cutting-edge technologies, and networking opportunities with industry leaders.",
    date: "2025-03-22",
    time: "9:00 AM IST",
    host: "Tech Mumbai Association",
    location: "NESCO Exhibition Centre, Goregaon East, Mumbai",
    image: "/images/tech-conference.jpg",
    attendees: 156,
    free: false,
    price: 1999,
    endTime: "6:00 PM IST"
  },
  {
    id: 6,
    title: "Fintech Innovation Summit",
    description: "Explore the latest trends and innovations in financial technology with industry experts. Learn about blockchain, digital payments, and regulatory challenges in the fintech ecosystem.",
    date: "2025-03-18",
    time: "10:00 AM IST",
    host: "Mumbai Fintech Hub",
    location: "Four Seasons Hotel, Worli, Mumbai",
    image: "/images/fintech-summit.jpg",
    attendees: 72,
    free: false,
    price: 2500,
    endTime: "4:00 PM IST"
  },
  {
    id: 7,
    title: "UX/UI Design Workshop for Beginners",
    description: "A hands-on workshop for aspiring designers to learn the fundamentals of user experience and interface design. Covers design thinking, wireframing, prototyping, and user testing methodologies.",
    date: "2025-03-16",
    time: "2:00 PM IST",
    host: "Design Mumbai Community",
    location: "Maker's Asylum, Andheri East, Mumbai",
    image: "/images/design-workshop.jpg",
    attendees: 25,
    free: false,
    price: 999,
    endTime: "5:00 PM IST"
  },
  {
    id: 8,
    title: "Women in Tech Leadership Panel",
    description: "Join leading women executives from the tech industry as they share their experiences, challenges, and advice for building successful careers in technology and leadership.",
    date: "2025-03-20",
    time: "5:30 PM IST",
    host: "WomenTechMakers Mumbai",
    location: "The Lalit, Andheri East, Mumbai",
    image: "/images/women-tech.jpg",
    attendees: 43,
    free: true,
    endTime: "8:00 PM IST"
  }
];

// Layout Component
const Layout = ({ children, title = 'Events App' }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      <AppBar position="sticky">
        <Toolbar sx={{ maxWidth: 1280, width: '100%', mx: 'auto' }}>
          <Link href="/" passHref style={{ textDecoration: 'none', color: 'white' }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700 }}>
              EventsHub
            </Typography>
          </Link>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button color="inherit">Login</Button>
            <Button color="inherit" variant="outlined" sx={{ borderColor: 'rgba(255,255,255,0.5)' }}>
              Sign Up
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="main">
        {children}
      </Box>
      <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6, mt: 4, borderTop: '1px solid rgba(0,0,0,0.1)' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" color="primary" gutterBottom>
                EventsHub
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Discover and connect with local events happening around you.
              </Typography>
            </Grid>
            <Grid item xs={12} md={2}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                About
              </Typography>
              <Typography variant="body2" color="text.secondary" component="p" gutterBottom>
                Our Story
              </Typography>
              <Typography variant="body2" color="text.secondary" component="p" gutterBottom>
                Partners
              </Typography>
              <Typography variant="body2" color="text.secondary" component="p" gutterBottom>
                Careers
              </Typography>
            </Grid>
            <Grid item xs={12} md={2}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Support
              </Typography>
              <Typography variant="body2" color="text.secondary" component="p" gutterBottom>
                Help Center
              </Typography>
              <Typography variant="body2" color="text.secondary" component="p" gutterBottom>
                Contact Us
              </Typography>
              <Typography variant="body2" color="text.secondary" component="p" gutterBottom>
                Privacy Policy
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Subscribe to Our Newsletter
              </Typography>
              <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', mb: 2 }}
                elevation={0}
                variant="outlined"
              >
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Your email"
                />
                <Button variant="contained" sx={{ m: 0.5 }}>
                  Subscribe
                </Button>
              </Paper>
            </Grid>
          </Grid>
          <Box sx={{ mt: 4, pt: 2, borderTop: '1px solid rgba(0,0,0,0.05)' }}>
            <Typography variant="body2" color="text.secondary" align="center">
              © {new Date().getFullYear()} EventsHub. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

// SearchBar Component
const SearchBar = ({ searchTerm, setSearchTerm, location }) => {
  return (
    <Box sx={{ bgcolor: '#f0f8ff', py: 4, px: 2, boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
      <Container maxWidth="lg">
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          flexWrap: { xs: 'wrap', md: 'nowrap' },
          gap: 2 
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
            <Typography variant="h4" component="h1" sx={{ mr: { xs: 0, sm: 2 } }}>
              Events near
            </Typography>
            <Paper
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                px: 2, 
                py: 1, 
                borderRadius: 2,
                bgcolor: '#ffffff',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                cursor: 'pointer',
                '&:hover': {
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                }
              }}
              elevation={0}
            >
              <LocationOn color="primary" />
              <Typography variant="h6" component="span" sx={{ mx: 1 }}>
                {location || 'Mumbai, IN'}
              </Typography>
              <EditIcon fontSize="small" color="action" />
            </Paper>
          </Box>
          
          <Paper
            component="form"
            sx={{ 
              p: '2px 4px', 
              display: 'flex', 
              alignItems: 'center', 
              width: { xs: '100%', sm: 350 },
              borderRadius: 2,
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
              border: '1px solid rgba(0,0,0,0.1)',
              mt: { xs: 2, md: 0 }
            }}
            elevation={0}
          >
            <IconButton sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search events"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <IconButton 
                sx={{ p: '10px' }} 
                aria-label="clear search" 
                onClick={() => setSearchTerm('')}
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            )}
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

// EventCard Component
const EventCard = ({ event }) => {
  // const router = useRouter();

  // const handleClick = () => {
  //   router.push(`/events/${event.id}`);
  // };

  const formattedDate = new Date(event.date).toLocaleDateString('en-US', { 
    weekday: 'short',
    month: 'short', 
    day: 'numeric'
  });

  return (
    <Card sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      borderRadius: 2,
      overflow: 'hidden',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <CardActionArea onClick={handleClick} sx={{ flexGrow: 1 }}>
        <CardMedia
          component="div"
          sx={{ height: 180, position: 'relative', bgcolor: 'grey.200' }}
        >
          {/* Use placeholder image for development */}
          <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
            <Typography variant="body2" sx={{ p: 1, position: 'absolute', top: 0, left: 0 }}>
              Image placeholder
            </Typography>
          </Box>
          <Box 
            sx={{ 
              position: 'absolute', 
              top: 10, 
              right: 10, 
              bgcolor: 'rgba(255,255,255,0.9)',
              borderRadius: 1,
              p: 0.5,
              px: 1
            }}
          >
            <Typography variant="caption" fontWeight="bold">
              {formattedDate}
            </Typography>
          </Box>
        </CardMedia>
        <CardContent sx={{ flexGrow: 1, pb: 3 }}>
          <Typography 
            gutterBottom 
            variant="h6" 
            component="h2" 
            sx={{ 
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              lineHeight: 1.3,
              height: 50
            }}
          >
            {event.title}
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary" 
            gutterBottom
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 1,
              WebkitBoxOrient: 'vertical',
            }}
          >
            Hosted by: {event.host}
          </Typography>
          <Box display="flex" alignItems="center" mt={1}>
            <AccessTime fontSize="small" color="action" sx={{ mr: 0.5 }} />
            <Typography variant="body2" color="text.secondary">
              {event.time}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" mt={0.5}>
            <LocationOn fontSize="small" color="action" sx={{ mr: 0.5 }} />
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 1,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {event.location}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" mt={1} justifyContent="space-between">
            <Box display="flex" alignItems="center">
              <Group fontSize="small" color="action" sx={{ mr: 0.5 }} />
              <Typography variant="body2" color="text.secondary">
                {event.attendees} going
              </Typography>
            </Box>
            <Chip 
              label={event.free ? "Free" : `₹${event.price}`} 
              size="small" 
              color={event.free ? "success" : "primary"}
              variant={event.free ? "outlined" : "filled"}
              sx={{ fontWeight: 600 }}
            />
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

// EventsList Component
const EventsList = ({ events, searchTerm }) => {
  // Filter events based on search term
  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.host.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (event.description && event.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (event.location && event.location.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      {filteredEvents.length === 0 ? (
        <Box textAlign="center" py={5}>
          <Typography variant="h5">No events found</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>Try different search terms</Typography>
          <Button variant="contained" sx={{ mt: 3 }} onClick={() => setSearchTerm('')}>
            Clear Search
          </Button>
        </Box>
      ) : (
        <Grid container spacing={4}>
          {filteredEvents.map((event) => (
            <Grid item key={event.id} xs={12} sm={6} md={3}>
              <EventCard event={event} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

// Add the ClearIcon import
import ClearIcon from '@mui/icons-material/Clear';

// Event Detail Component
const EventDetail = ({ eventId }) => {
  const event = events.find(e => e.id === parseInt(eventId));
  
  if (!event) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Typography variant="h4" align="center">Event not found</Typography>
        <Box display="flex" justifyContent="center" mt={3}>
          <Button variant="contained" component={Link} href="/">
            Return to Events
          </Button>
        </Box>
      </Container>
    );
  }
  
  const formattedDate = new Date(event.date).toLocaleDateString('en-US', { 
    weekday: 'long',
    month: 'long', 
    day: 'numeric',
    year: 'numeric'
  });
  
  return (
    <Box sx={{ bgcolor: '#f5f5f5', py: 4 }}>
      <Container maxWidth="lg">
        <Link href="/" passHref>
          <Button 
            variant="text" 
            sx={{ mb: 3, display: 'flex', alignItems: 'center' }}
            startIcon={<ArrowBack />}
          >
            Back to events
          </Button>
        </Link>
        
        <Paper 
          elevation={0} 
          sx={{ 
            overflow: 'hidden', 
            mb: 4, 
            borderRadius: 2,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}
        >
          <Grid container>
            <Grid item xs={12}>
              <Box sx={{ 
                height: 350, 
                width: '100%', 
                bgcolor: 'grey.200', 
                position: 'relative',
                backgroundPosition: 'center',
                backgroundSize: 'cover'
              }}>
                <Typography variant="body2" sx={{ p: 1, position: 'absolute', top: 0, left: 0 }}>
                  Image placeholder
                </Typography>
              </Box>
            </Grid>
          </Grid>
            
          <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
            <Typography variant="h4" gutterBottom fontWeight="bold">{event.title}</Typography>
            
            <Box sx={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: { xs: 2, md: 4 }, 
              mt: 3, 
              mb: 4 
            }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <AccessTime color="primary" sx={{ mt: 0.5, mr: 1 }} />
                <Box>
                  <Typography variant="body1" fontWeight="bold">
                    {formattedDate}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {event.time} {event.endTime ? `to ${event.endTime}` : ''}
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <LocationOn color="primary" sx={{ mt: 0.5, mr: 1 }} />
                <Box>
                  <Typography variant="body1" fontWeight="bold">
                    {event.location}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Mumbai, Maharashtra
                  </Typography>
                </Box>
              </Box>
            </Box>
            
            <Divider sx={{ my: 3 }} />
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>About this event</Typography>
                <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
                  {event.description || 'No description available for this event.'}
                </Typography>
                
                {event.hostedBy && (
                  <Box sx={{ mt: 4, bgcolor: 'rgba(0,0,0,0.02)', p: 2, borderRadius: 2 }}>
                    <Typography variant="h6" gutterBottom>Host</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ 
                        width: 50, 
                        height: 50, 
                        borderRadius: '50%', 
                        bgcolor: 'primary.main',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 2,
                        color: 'white',
                        fontWeight: 'bold'
                      }}>
                        <Typography variant="body1" color="white">
                          {event.hostedBy.charAt(0)}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="subtitle1" fontWeight="bold">Hosted By</Typography>
                        <Typography variant="body1">{event.hostedBy}</Typography>
                      </Box>
                    </Box>
                  </Box>
                )}
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Card 
                  variant="outlined" 
                  sx={{ 
                    borderRadius: 2, 
                    overflow: 'hidden',
                    position: 'sticky',
                    top: 24
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Typography variant="h5" fontWeight="bold">
                        {event.free ? 'FREE' : `₹${event.price}`}
                      </Typography>
                      <Box display="flex" alignItems="center">
                        <Group fontSize="small" color="action" sx={{ mr: 0.5 }} />
                        <Typography variant="body2" color="text.secondary">
                          {event.attendees} going
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Button 
                      variant="contained" 
                      fullWidth 
                      size="large" 
                      sx={{ mb: 2, py: 1.5, fontWeight: 'bold' }}
                    >
                      Attend Event
                    </Button>
                    
                    <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                      <Button 
                        variant="outlined" 
                        sx={{ flex: 1 }}
                        startIcon={<Share />}
                      >
                        Share
                      </Button>
                      <Button 
                        variant="outlined" 
                        sx={{ flex: 1 }}
                        startIcon={<BookmarkBorder />}
                      >
                        Save
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

// Main App Component
export default function Events() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const { id, view } = useParams() || {};
  
  // Determine if we're viewing event details or home page
  const isEventDetail = view === 'event' && id;
  
  return (
    <Layout title={isEventDetail ? `Event Details | EventsHub` : "Events Near You | EventsHub"}>
      {isEventDetail ? (
        <EventDetail eventId={id} />
      ) : (
        <>
          <SearchBar 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            location="Mumbai, IN"
          />
          
          <Container maxWidth="lg">
            <Box 
              display="flex" 
              justifyContent="space-between" 
              alignItems="center" 
              mt={4} 
              mb={2}
              sx={{
                borderBottom: '1px solid rgba(0,0,0,0.08)',
                pb: 1
              }}
            >
              <Typography variant="h5" component="h2" fontWeight="bold">
                {searchTerm ? `Search Results` : `Upcoming Events`}
              </Typography>
              <Button 
                color="primary" 
                variant="text"
                sx={{ fontWeight: 'bold' }}
              >
                See all events
              </Button>
            </Box>
          </Container>
          
          <EventsList 
            events={events}
            searchTerm={searchTerm}
          />
        </>
      )}
    </Layout>
  );
}