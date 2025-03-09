import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  Pagination,
  Stack,
  Button,
  IconButton,
  AppBar,
  Toolbar,
  Paper,
  TextField,
  InputAdornment,

} from '@mui/material';
import {
  CalendarMonth,
  People,
  LocationOn,
  ArrowForward
} from '@mui/icons-material';
import AppTheme from '../signupcomponent/shared-theme/AppTheme';
import CssBaseline from '@mui/material/CssBaseline';
import { Link } from 'react-router-dom';
import {

  Search,
  Clear
} from '@mui/icons-material';
import axios from 'axios';


const EventsPage = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const eventsPerPage = 4;

  const navLinks = [
    { name: 'Alumni Directory', path: '/home' },
    { name: 'Chat', path: '/chats' },
    { name: 'Jobs', path: '/internships' },
    { name: 'Events', path: '/events' },
    { name: 'Forums', path: '/forum' },
    { name: 'Courses', path: '/courses' }
  ];

  // Sample events data
  // const events = [
  //   {
  //     id: 1,
  //     title: 'The Ultimate Guide to Secure WordPress Plugin Development',
  //     // image: 'https://example.com/wordpress-event.jpg',
  //     hostedBy: 'WordPress Mumbai Meetup',
  //     date: 'SAT, MAR 15',
  //     time: '4:00 PM IST',
  //     going: 41,
  //     isFree: true,
  //     location: 'SOFTACKIOUS LIMITED, Lower Parel West'
  //   },
  //   {
  //     id: 2,
  //     title: 'GLOBAL STARTUPS CLUB | STARTUP NETWORKING MUMBAI 2025',
  //     // image: 'https://example.com/startup-networking.jpg',
  //     hostedBy: 'Mumbai Startups & Business Meetups',
  //     date: 'SUN, MAR 9',
  //     time: '10:30 AM IST',
  //     going: 28,
  //     isFree: true
  //   },
  //   {
  //     id: 3,
  //     title: 'AI and Marketing: The New Growth Formula',
  //     // image: 'https://example.com/ai-marketing.jpg',
  //     hostedBy: 'eChai Mumbai Startup Network',
  //     date: 'SAT, MAR 15',
  //     time: '11:00 AM IST',
  //     going: 14,
  //     isFree: true
  //   },
  //   {
  //     id: 4,
  //     title: 'D2C Startups Meetup in Mumbai',
  //     // image: 'https://example.com/d2c-startups.jpg',
  //     hostedBy: 'eChai Mumbai Startup Network',
  //     date: 'SAT, MAR 15',
  //     time: '6:00 PM IST',
  //     going: 9,
  //     isFree: true
  //   },
  //   {
  //     id: 5,
  //     title: 'Tech Innovations in Healthcare',
  //     // image: 'https://example.com/healthcare-tech.jpg',
  //     hostedBy: 'Mumbai Tech Community',
  //     date: 'FRI, MAR 21',
  //     time: '3:00 PM IST',
  //     going: 37,
  //     isFree: false,
  //     price: '₹500'
  //   },
  //   {
  //     id: 6,
  //     title: 'Blockchain Revolution: Web3 Developments',
  //     // image: 'https://example.com/blockchain.jpg',
  //     hostedBy: 'Mumbai Blockchain Association',
  //     date: 'TUE, MAR 18',
  //     time: '5:30 PM IST',
  //     going: 22,
  //     isFree: true
  //   },
  //   // Add more events as needed
  // ];

  // Filter events based on search term
  useEffect(() => {
    const filtered = events ? events.filter(event =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.hostedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (event.location && event.location.toLowerCase().includes(searchTerm.toLowerCase()))
    ) : [];
    setFilteredEvents(filtered);
    setCurrentPage(1); // Reset to first page when search changes
  }, [searchTerm]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:4001/api/get-events");
        setEvents(response.data); // ✅ Store events in state
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setError("Failed to load events");
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Calculate pagination
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo(0, 0);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />



      <AppBar
        position="fixed"
        color="default"
        elevation={1}
        sx={{
          backgroundColor: 'white',
          width: '100%',
          top: 0,
          left: 0
        }}
      >
       <Container maxWidth={false} sx={{ width: "100%" }}>
                 <Toolbar disableGutters sx={{ display: "flex" }}>
                   <div style={{ flex: 1, display:"flex", justifyContent:"start",  }}>
                     <img src="./image.png" alt="" width={90} style={{marginTop:10}}/>
                   </div>
                   <Box sx={{ display: "flex", mr: 4 }}>
                     {navLinks.map((link) => (
                       <Button
                         key={link.name}
                         component={Link}
                         to={link.path}
                         sx={{
                           my: 2,
                           color:
                             location.pathname === link.path
                               ? "#1976d2"
                               : "rgba(0, 0, 0, 0.87)",
                           display: "block",
                           mx: 1,
                           textTransform: "none",
                           fontSize: "0.95rem",
                           fontWeight:
                             location.pathname === link.path ? "bold" : "normal",
                           borderBottom:
                             location.pathname === link.path
                               ? "2px solid #1976d2"
                               : "none",
                         }}
                       >
                         {link.name}
                       </Button>
                     ))}
                   </Box>
       
                   {/* Auth Buttons */}
                   <Box>
                     {/* <Link to="/signin" style={{ textDecoration: 'none' }}>
                       <Button 
                         color="primary" 
                         sx={{ 
                           mr: 2, 
                           textTransform: 'none',
                           fontWeight: 500 
                         }}
                       >
                         Sign In
                       </Button>
                       </Link> */}
                     <Link to="/profile" style={{ textDecoration: "none" }}>
                       <Button
                         variant="contained"
                         color="primary"
                         sx={{
                           borderRadius: 1,
                           textTransform: "none",
                           fontWeight: 500,
                         }}
                       >
                         Profile
                       </Button>
                     </Link>
                   </Box>
                 </Toolbar>
               </Container>
      </AppBar>



      <Container maxWidth="lg" sx={{ mt: 15, mb: 6 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
              Events near
            </Typography>
            <Button
              variant="text"
              color="primary"
              sx={{ ml: 2, textTransform: 'none', fontSize: '1.2rem' }}
              startIcon={<LocationOn />}
            >
              Mumbai, IN
            </Button>
          </Box>
          <Button
            color="primary"
            endIcon={<ArrowForward />}
            sx={{ textTransform: 'none' }}
          >
            See all events
          </Button>
        </Box>

        {/* Search Bar */}
        <Paper
          elevation={2}
          sx={{
            p: 1,
            mb: 4,
            display: 'flex',
            width: '100%',
            borderRadius: 2
          }}
        >
          <TextField
            fullWidth
            placeholder="Search events by title, organizer, or location"
            value={searchTerm}
            onChange={handleSearchChange}
            variant="standard"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search color="action" />
                </InputAdornment>
              ),
              endAdornment: searchTerm && (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={clearSearch}>
                    <Clear fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
              disableUnderline: true,
              sx: { ml: 1 }
            }}
          />
        </Paper>

        {/* No Results Message */}
        {currentEvents.length === 0 && !events && (
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <Typography variant="h6" color="text.secondary">
              No events found matching "{searchTerm}"
            </Typography>
            <Button
              variant="text"
              color="primary"
              onClick={clearSearch}
              sx={{ mt: 2 }}
            >
              Clear search
            </Button>
          </Box>
        )}

        {/* Events Grid */}
        <Grid container spacing={3}>
          {events.map((ev) => (
            <Grid item xs={12} sm={6} md={3} key={ev._id}>
              <Card sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 2,
                '&:hover': {
                  boxShadow: 6,
                  cursor: 'pointer'
                }
              }}>
                <CardMedia
                  component="img"
                  height="160"
                  image={ev.bannerImage || 'https://www.hire4event.com/blogs/wp-content/uploads/2019/03/Type-of-events.jpg'}
                  alt={ev.title}
                  onError={(e) => {
                    e.target.src = 'https://www.hire4event.com/blogs/wp-content/uploads/2019/03/Type-of-events.jpg';
                  }}
                />
                <CardContent sx={{ flexGrow: 1, p: 2 }}>
                  <Typography gutterBottom variant="h6" component="div" sx={{
                    fontWeight: 'bold',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    lineHeight: 1.2,
                    height: '2.4em'
                  }}>
                    {ev.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Hosted at: {ev.college}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, color: 'text.secondary' }}>
                    <CalendarMonth fontSize="small" sx={{ ml: 1, mb: 2.5, mr:0 }} />
                    <Typography variant="body2">
                      {new Date(ev.date).toLocaleDateString()} · {ev.time}
                    </Typography>
                  </Box>
                  <Box sx={{  }}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      href={ev.registrationLink}
                      target="_blank"
                      sx={{ textTransform: 'none' }}
                    >
                      Register
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}

        </Grid>

        {/* Pagination - Only show if there are results */}
        {filteredEvents.length > 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              shape="rounded"
              size="large"
            />
          </Box>
        )}
      </Container>

    </AppTheme>

  );
};

export default EventsPage;