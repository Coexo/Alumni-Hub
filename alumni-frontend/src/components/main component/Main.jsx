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
import HomeComp from '../job component/HomeComp';
import LandingPage from './LandingPage';

const Main = () => {
  return (
    <>
      <AppBar
        position="fixed"
        color="default"
        elevation={1}
        sx={{
          backgroundColor: "white",
          width: "100%",
          top: 0,
          left: 0,
        }}
      >
        <Container maxWidth={false} sx={{ width: "100%" }}>
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                fontWeight: "bold",
                color: "#1976d2",
                fontSize: "1.5rem",
                display: "flex",
                alignItems: "center",
              }}
            >
              AlumniHub
            </Typography>

            <Box>
              <Link to="/signin" style={{ textDecoration: "none" }}>
                <Button
                  color="primary"
                  sx={{
                    mr: 2,
                    textTransform: "none",
                    fontWeight: 500,
                  }}
                >
                  Sign In
                </Button>
              </Link>
              <Link to="/signup" style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    borderRadius: 1,
                    textTransform: "none",
                    fontWeight: 500,
                  }}
                >
                  Join Now
                </Button>
              </Link>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <LandingPage/>
    </>
  );
};

export default Main;