"use client"
import React, { useState, useEffect } from 'react';
import { 
    Container, 
    Grid, 
    Card, 
    CardContent, 
    CardMedia, 
    Typography, 
    Button, 
    TextField, 
    AppBar, 
    Toolbar, 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogActions,
    CircularProgress,
    Box,
    Chip
  } from '@mui/material';
  import { Search as SearchIcon } from '@mui/icons-material';
import AppTheme from '../signupcomponent/shared-theme/AppTheme';
//   import axios from 'axios';
import CssBaseline from '@mui/material/CssBaseline';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

  // Mock API URL - replace with your actual backend URL when ready
  const API_URL = 'http://localhost:5000/api';

  const stripePromise = loadStripe(
    "pk_test_51BTUDGJAJfZb9HEBwDg86TN1KNprHjkfipXmEDMb0gSCassK5T3ZfxsAbcgKVmAIXF7oZ6ItlZZbXO6idTHE67IM007EwQ4uN3"
  );

  
  function Course(props) {

    const navigate = useNavigate();
    // State variables
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [visibleCourses, setVisibleCourses] = useState(4);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
  
    // Fetch courses from API
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:4001/api/courses`); // Replace API_URL with your actual API base URL
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }

        const data = await response.json();
        setCourses(data.data);
        setFilteredCourses(data); // Initialize filtered courses with all courses
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    // Fetch courses when component mounts
    useEffect(() => {
      fetchCourses();
    }, []);
  
    // Handle search
    useEffect(() => {
      if (searchTerm.trim() === '') {
        setFilteredCourses(courses);
      } else {        
        const results = courses.filter(
          (course) =>
            course.courseName
              ?.toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            course.description
              ?.toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            String(course.points)
              ?.toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            String(course.fees)
              ?.toLowerCase()
              .includes(searchTerm.toLowerCase())
        );
        setFilteredCourses(results);
      }
    }, [searchTerm, courses]);
  
    // Load more courses
    const handleLoadMore = () => {
      setVisibleCourses(prev => prev + 4);
    };
  
    // Open course details dialog
    const handleCourseClick = (course) => {
      setSelectedCourse(course);
      setOpenDialog(true);
    };
  
    // Close course details dialog
    const handleCloseDialog = () => {
      setOpenDialog(false);
    };

    const navLinks = [
      { name: "Alumni Directory", path: "/home" },
      { name: "Chat", path: "/chats" },
      { name: "Opportunities", path: "/internships" },
      { name: "Events", path: "/events" },
      { name: "Forums", path: "/forum" },
      { name: "Courses", path: "/courses" },
    ];

  let userRole = localStorage.getItem("userRole") ?? "Student";

  
    return (
      <AppTheme {...props}>
        <CssBaseline enableColorScheme />

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
            <Toolbar disableGutters sx={{ display: "flex" }}>
                        <div style={{ flex: 1, display: "flex", justifyContent: "start" }}>
                          <img
                            src="./image.png"
                            alt=""
                            width={90}
                            style={{ marginTop: 10 }}
                          />
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
                          <Link to="/payment" style={{ textDecoration: "none" }}>
                            <Button
                              variant="contained"
                              color="primary"
                              sx={{
                                borderRadius: 1,
                                textTransform: "none",
                                fontWeight: 500,
                              }}
                            >
                              Subscribe
                            </Button>
                          </Link>
                          &nbsp;&nbsp;&nbsp;
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

        <div className="App">
          {/* App Bar with Search */}
          <AppBar
            position="static"
            sx={{
              mb: 4,
              mt: 15,
              py: 1,
              width: "75vw",
              bgcolor: "white",
              borderRadius: "10px",
              mx: "auto",
            }}
          >
            {/* <Toolbar> */}
            {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Course Catalog
            </Typography> */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                bgcolor: "white",
                borderRadius: 1,
                p: 0.5,
                width: "100%",
                // mx:30,
              }}
            >
              <SearchIcon sx={{ color: "action.active", mr: 1, ml: 1 }} />
              <TextField
                variant="standard"
                placeholder="Search courses..."
                InputProps={{ disableUnderline: true }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ width: "100%" }}
              />
          {userRole == "Alumni" && <Button
            href="/create-courses"
            sx={{
              backgroundColor: "#1976d2",
              color: "white",
              py: 2,
              width: "200px",
              ml: "10px",
              mr: "10px",
            }}
          >
            Create Course
          </Button>}
            </Box>
          </AppBar>

          <Container maxWidth="lg">
            <Typography variant="h4" component="h1" gutterBottom>
              Explore courses
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" paragraph>
              from the world's top universities and companies
            </Typography>

            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
                <CircularProgress />
              </Box>
            ) : filteredCourses.length === 0 ? (
              <Typography variant="h6" align="center" sx={{ my: 4 }}>
                No courses found. Try a different search term.
              </Typography>
            ) : (
              <>
                <Grid container spacing={3} sx={{ mt: 2 }}>
                  {courses.map((course) => (
                    <Grid item key={course.id} xs={12} sm={6} md={3}>
                      <Card
                        sx={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          transition: "transform 0.2s, box-shadow 0.2s",
                          "&:hover": {
                            transform: "translateY(-5px)",
                            boxShadow: 6,
                            cursor: "pointer",
                          },
                          position: "relative",
                        }}
                        onClick={() => navigate(`/watch/${course.youtubeId}`)}
                      >
                        <CardMedia
                          component="img"
                          height="140"
                          image={course.thumbnail}
                          alt={course.title}
                        />
                        <CardContent sx={{ flexGrow: 1 }}>
                          <Typography gutterBottom variant="h6" component="h2">
                            {course.courseName}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {course.description}
                          </Typography>
                          <br />
                          <Chip
                            label={"Points : " + course.points}
                            size="medium"
                            color="primary"
                            variant="outlined"
                          />{" "}
                          <Chip
                            label={"Fees : Rs. " + course.fees}
                            size="medium"
                            color="success"
                            variant="outlined"
                          />
                        </CardContent>
                        <Button
                          style={{ backgroundColor: "#1976d2", color: "white" }}
                        >
                          Enroll
                        </Button>
                      </Card>
                    </Grid>
                  ))}
                </Grid>

                {visibleCourses < filteredCourses.length && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      mt: 4,
                      mb: 4,
                    }}
                  >
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={handleLoadMore}
                    >
                      Load More Courses
                    </Button>
                  </Box>
                )}
              </>
            )}
          </Container>

          {/* Course Details Dialog */}
          <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            maxWidth="md"
            fullWidth
          >
            {selectedCourse && (
              <>
                <DialogTitle>{selectedCourse.title}</DialogTitle>
                <DialogContent dividers>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <img
                        src={courses.image}
                        alt={selectedCourse.title}
                        style={{ width: "100%", borderRadius: "8px" }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography
                        variant="subtitle1"
                        color="primary"
                        gutterBottom
                      >
                        {selectedCourse.provider}
                      </Typography>
                      <Typography variant="body1" paragraph>
                        {selectedCourse.description}
                      </Typography>
                      <Typography variant="subtitle2" gutterBottom>
                        Course Type:
                      </Typography>
                      <Chip
                        label={selectedCourse.type}
                        size="small"
                        sx={{ mb: 2 }}
                      />
                      <Typography variant="subtitle2" gutterBottom>
                        Tags:
                      </Typography>
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                        {selectedCourse.tags.map((tag, index) => (
                          <Chip
                            key={index}
                            label={tag}
                            size="small"
                            variant="outlined"
                          />
                        ))}
                      </Box>
                    </Grid>
                  </Grid>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseDialog}>Close</Button>
                  <Button variant="contained" color="primary">
                    Enroll Now
                  </Button>
                </DialogActions>
              </>
            )}
          </Dialog>
        </div>
      </AppTheme>
    );
  }
  
  export default Course;