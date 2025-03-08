import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box,
  Container
} from '@mui/material';
import { Link } from 'react-router-dom';

const Main = () => {
  return (
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
          
          {/* Auth Buttons */}
          <Box>
            <Link to="/signin" style={{ textDecoration: 'none' }}>
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
            </Link>
            <Link to="/signup" style={{ textDecoration: 'none' }}>
            <Button 
              variant="contained" 
              color="primary" 
              sx={{ 
                borderRadius: 1,
                textTransform: 'none',
                fontWeight: 500
              }}
            >
              Join Now
            </Button>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Main;