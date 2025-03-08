import React, { useState } from 'react';
import { 
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Pagination,
  Box,
  Avatar,
  Chip,
  Stack,
  Divider,
  TextField,
  InputAdornment,
  IconButton,
  AppBar,
  Toolbar
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AppTheme from '../signup component/shared-theme/AppTheme';
import CssBaseline from '@mui/material/CssBaseline';
import { Link, useLocation } from 'react-router-dom';

// Mock data for alumni
const mockAlumni = [
  {
    id: 1,
    name: 'Sarah Johnson',
    profilePic: 'https://randomuser.me/api/portraits/women/44.jpg',
    company: 'Google',
    position: 'Senior Product Manager',
    batch: '2015',
    interestedIn: 'AI & ML',
    investment: '$40,000',
    previousInvestments: 'TechStart, DataFlow'
  },
  {
    id: 2,
    name: 'Michael Chen',
    profilePic: 'https://randomuser.me/api/portraits/men/32.jpg',
    company: 'Microsoft',
    position: 'Engineering Director',
    batch: '2012',
    interestedIn: 'Cloud Computing',
    investment: '$25,000',
    previousInvestments: 'ServerLess, CloudNative'
  },
  {
    id: 3,
    name: 'Jessica Williams',
    profilePic: 'https://randomuser.me/api/portraits/women/33.jpg',
    company: 'Amazon',
    position: 'VP of Engineering',
    batch: '2010',
    interestedIn: 'E-commerce',
    investment: '$100,000',
    previousInvestments: 'ShopifyPlus, RetailTech'
  },
  // Add more alumni to have at least 25 for testing pagination
  // ... more alumni objects
];

// Generate more alumni to demonstrate pagination
const generateMoreAlumni = () => {
  const companies = ['Apple', 'Meta', 'Tesla', 'IBM', 'Adobe', 'Salesforce', 'Twitter', 'LinkedIn'];
  const positions = ['CTO', 'CEO', 'Software Engineer', 'Product Manager', 'Data Scientist', 'UX Designer'];
  const interests = ['Blockchain', 'Fintech', 'Edtech', 'Healthtech', 'IoT', 'Clean Energy', 'Cybersecurity'];
  
  const extraAlumni = [];
  
  for (let i = 4; i <= 30; i++) {
    const gender = Math.random() > 0.5 ? 'men' : 'women';
    const imgId = Math.floor(Math.random() * 70) + 1;
    
    extraAlumni.push({
      id: i,
      name: `Alumni ${i}`,
      profilePic: `https://randomuser.me/api/portraits/${gender}/${imgId}.jpg`,
      company: companies[Math.floor(Math.random() * companies.length)],
      position: positions[Math.floor(Math.random() * positions.length)],
      batch: `20${Math.floor(Math.random() * 15) + 10}`,
      interestedIn: interests[Math.floor(Math.random() * interests.length)],
      investment: `$${(Math.floor(Math.random() * 100) + 10) * 1000}`,
      previousInvestments: 'Various Startups'
    });
  }
  
  return [...mockAlumni, ...extraAlumni];
};

const allAlumni = generateMoreAlumni();

const Alumni = (props) => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const alumniPerPage = 20;
  
  // Filter alumni based on search term
  const filteredAlumni = allAlumni.filter(alumni => 
    alumni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alumni.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alumni.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alumni.interestedIn.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredAlumni.length / alumniPerPage);
  const displayedAlumni = filteredAlumni.slice(
    (page - 1) * alumniPerPage,
    page * alumniPerPage
  );

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(1); // Reset to first page when searching
  };

  const navLinks = [
    { name: 'Alumni Directory', path: '/home' },
    { name: 'Jobs', path: '/internships' },
    { name: 'Events', path: '/events' },
    { name: 'Forums', path: '/forum' }
  ];

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
          <Container maxWidth={false} sx={{ width: '100%' }}>
            <Toolbar disableGutters>
              {/* Logo */}
              <Typography
                variant="h6"
                component="div"
                sx={{ 
                  flexGrow: 1, 
                  fontWeight: 'bold', 
                  color: '#1976d2',
                  fontSize: '1.5rem',
                  display: 'flex',
                alignItems: 'center'
                }}
              >
                AlumniHub
              </Typography>
              
              {/* Navigation Links */}
              {/* <Box sx={{ display: 'flex', mr: 4 }}>
                {['Directory', 'Mentorship', 'Jobs', 'Events', 'Forums'].map((page) => (
                  <Button
                    key={page}
                    sx={{ 
                      my: 2, 
                      color: 'rgba(0, 0, 0, 0.87)', 
                      display: 'block',
                      mx: 1,
                      textTransform: 'none',
                      fontSize: '0.95rem'
                    }}
                  >
                    {page}
                  </Button>
                ))}
              </Box> */}

              <Box sx={{ display: 'flex', mr: 4 }}>
            {navLinks.map((link) => (
              <Button
                key={link.name}
                component={Link}
                to={link.path}
                sx={{ 
                  my: 2, 
                  color: location.pathname === link.path ? '#1976d2' : 'rgba(0, 0, 0, 0.87)', 
                  display: 'block',
                  mx: 1,
                  textTransform: 'none',
                  fontSize: '0.95rem',
                  fontWeight: location.pathname === link.path ? 'bold' : 'normal',
                  borderBottom: location.pathname === link.path ? '2px solid #1976d2' : 'none'
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
                <Link to="/profile" style={{ textDecoration: 'none' }}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  sx={{ 
                    borderRadius: 1,
                    textTransform: 'none',
                    fontWeight: 500
                  }}
                >
                  Profile
                </Button>
                </Link>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>


        


    <Container maxWidth="lg" sx={{ py: 4 }}>

    

      <Box sx={{ mb: 4 }}>
        {/* <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
          Alumni Directory
        </Typography>
        <Typography variant="h6" component="p" gutterBottom align="center" color="text.secondary">
          Connect with fellow alumni and grow your network
        </Typography> */}
        
        <Box sx={{ mt: 4, mb: 3 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search for alumni by name, company, position or interests..."
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ maxWidth: 600, mx: 'auto', display: 'block' }}
          />
        </Box>
      </Box>

      <Grid container spacing={3}>
        {displayedAlumni.map((alumni) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={alumni.id}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                width:"100%",
                flexDirection: 'column',
                transition: '0.3s',
                '&:hover': {
                  boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                  transform: 'translateY(-4px)'
                }
              }}
            >
              <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
                <Avatar
                  src={alumni.profilePic}
                  alt={alumni.name}
                  sx={{ width: 100, height: 100, border: '3px solid #f0f0f0' }}
                />
              </Box>
              <CardContent sx={{ flexGrow: 1, pt: 0 }}>
                <Typography gutterBottom variant="h6" component="h2" align="center" sx={{ fontWeight: 'bold' }}>
                  {alumni.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 2 }}>
                  {alumni.position} @ {alumni.company}
                </Typography>
                
                <Divider sx={{ my: 1.5 }} />
                
                <Stack spacing={1} sx={{ mt: 2 }}>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      INTERESTED IN:
                    </Typography>
                    <Chip 
                      label={alumni.interestedIn} 
                      size="small" 
                      sx={{ ml: 1, bgcolor: '#e3f2fd', color: '#1976d2' }} 
                    />
                  </Box>
                  
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      INVESTMENT SIZE:
                    </Typography>
                    <Typography variant="body2" component="span" sx={{ ml: 1, fontWeight: 'medium' }}>
                      {alumni.investment}
                    </Typography>
                  </Box>
                  
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      PREVIOUS INVESTMENTS:
                    </Typography>
                    <Typography variant="body2" component="span" sx={{ ml: 1 }}>
                      {alumni.previousInvestments}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
              
              <CardActions sx={{ p: 2, pt: 0 }}>
                <Button 
                  variant="contained" 
                  fullWidth 
                  startIcon={<PersonAddIcon />}
                  sx={{ mr: 1, bgcolor: '#4caf50', '&:hover': { bgcolor: '#388e3c' } }}
                >
                  Connect
                </Button>
                <Button 
                  variant="outlined" 
                  fullWidth
                  startIcon={<VisibilityIcon />}
                >
                  Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination 
            count={totalPages} 
            page={page} 
            onChange={handlePageChange} 
            color="primary" 
            size="large"
            showFirstButton 
            showLastButton
          />
        </Box>
      )}
      
      {/* Display count of results */}
      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Showing {displayedAlumni.length} of {filteredAlumni.length} alumni
        </Typography>
      </Box>
    </Container>
    </AppTheme>
  );
};

export default Alumni