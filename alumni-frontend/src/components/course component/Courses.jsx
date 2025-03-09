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
  
  // Mock API URL - replace with your actual backend URL when ready
  const API_URL = 'http://localhost:5000/api';
  
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

    

    

    const coursesWithYouTube = [
      {
        id: 1,
        title: "Introduction to Machine Learning",
        provider: "DeepLearning.AI",
        youtubeId: "qFJeN9V1ZsI", // YouTube video ID
        type: "Course",
        description: "Learn the fundamentals of machine learning algorithms and applications.",
        tags: ["AI", "Machine Learning", "Data Science"]
      },
      {
        id: 2,
        title: "React for Beginners",
        provider: "Meta",
        youtubeId: "w7ejDZ8SWv8", // YouTube video ID
        type: "Tutorial",
        description: "A comprehensive introduction to React.js for beginners.",
        tags: ["Web Development", "JavaScript", "React"]
      },
      // Add more courses as needed
    ];
  
    // Initial sample course data (will be replaced with API data)
    const initialCourses = [
      {
        id: 1,
        title: "Open Source Models with Hugging Face",
        provider: "DeepLearning.AI",
        image: "https://media.istockphoto.com/id/2094340406/photo/young-professionals-engaged-in-a-lively-discussion-at-a-co-working-space.jpg?s=2048x2048&w=is&k=20&c=OQw-5hszX9Gg0HpOV-Uy4osOyyp5MWGj8-_2RpmdR1Q=",
        type: "Project",
        description: "Learn how to use open source models with the Hugging Face library for various NLP tasks.",
        tags: ["AI", "NLP", "Python"]
      },
      {
        id: 2,
        title: "Introducing Multimodal Llama 3.2",
        provider: "DeepLearning.AI",
        image: `https://img.youtube.com/vi//maxresdefault.jpg`,
        type: "Project",
        description: "Explore the capabilities of Multimodal Llama 3.2 for processing text and visual information.",
        tags: ["AI", "Multimodal", "LLM"]
      },
      {
        id: 3,
        title: "Business Analytics with Excel: Elementary to Advanced",
        provider: "Johns Hopkins University",
        image: "https://via.placeholder.com/300x150/1B5E20/FFFFFF?text=Excel+Analytics",
        type: "Course",
        description: "Master data analysis techniques using Microsoft Excel from basic to advanced concepts.",
        tags: ["Excel", "Business", "Data Analysis"]
      },
      {
        id: 4,
        title: "The Science of Well-Being",
        provider: "Yale University",
        image: "https://via.placeholder.com/300x150/0D47A1/FFFFFF?text=Well-Being",
        type: "Course",
        description: "Learn science-based strategies for happiness and build more productive habits.",
        tags: ["Psychology", "Health", "Well-being"]
      },
      {
        id: 5,
        title: "Machine Learning Specialization",
        provider: "Stanford University",
        image: "https://via.placeholder.com/300x150/FF5722/FFFFFF?text=ML+Specialization",
        type: "Specialization",
        description: "A comprehensive introduction to machine learning, from basic concepts to advanced techniques.",
        tags: ["ML", "AI", "Python"]
      },
      {
        id: 6,
        title: "Data Structures and Algorithms",
        provider: "Princeton University",
        image: "https://via.placeholder.com/300x150/9C27B0/FFFFFF?text=DSA",
        type: "Course",
        description: "Learn essential algorithms and data structures needed for computer science and software engineering.",
        tags: ["Algorithms", "Programming", "Computer Science"]
      },
      {
        id: 7,
        title: "iOS App Development with Swift",
        provider: "Apple",
        image: "https://via.placeholder.com/300x150/E91E63/FFFFFF?text=Swift+Development",
        type: "Course",
        description: "Build iOS applications using Swift programming language and the latest development techniques.",
        tags: ["iOS", "Swift", "Mobile Development"]
      },
      {
        id: 8,
        title: "Blockchain Fundamentals",
        provider: "UC Berkeley",
        image: "https://via.placeholder.com/300x150/607D8B/FFFFFF?text=Blockchain",
        type: "Course",
        description: "Understand the core concepts of blockchain technology and its applications beyond cryptocurrencies.",
        tags: ["Blockchain", "Cryptocurrency", "Technology"]
      }
    ];


    const dummyCourses = [
      {
        id: 1,
        title: "React for Beginners",
        provider: "DeepLearning.AI",
        type: "Project",
        youtubeId: "Ke90Tje7VS0",
      },
      {
        id: 2,
        title: "Machine Learning Basics",
        provider: "Stanford University",
        type: "Course",
        youtubeId: "JvS2triCgOY",
      },
      {
        id: 3,
        title: "Web Development Bootcamp",
        provider: "Harvard University",
        type: "Course",
        youtubeId: "Q33KBiDriJY",
      },
      {
        id: 4,
        title: "Blockchain Fundamentals",
        provider: "UC Berkeley",
        type: "Course",
        youtubeId: "bBC-nXj3Ng4",
      },
      {
        id: 5,
        title: "AI for Everyone",
        provider: "DeepLearning.AI",
        type: "Course",
        youtubeId: "f_uwKZIAeM0",
      },
      {
        id: 6,
        title: "Python Programming Full Course",
        provider: "CodeWithMosh",
        type: "Tutorial",
        youtubeId: "rfscVS0vtbw",
      },
      {
        id: 7,
        title: "Introduction to Cybersecurity",
        provider: "Google Cybersecurity",
        type: "Course",
        youtubeId: "pWyW7cWg3fM",
      },
      {
        id: 8,
        title: "Data Science with Python",
        provider: "MIT OpenCourseWare",
        type: "Course",
        youtubeId: "Gp_RnJcb8Ig",
      },
      {
        id: 9,
        title: "Docker & Kubernetes Crash Course",
        provider: "Academind",
        type: "Tutorial",
        youtubeId: "X48VuDVv0do",
      },
      {
        id: 10,
        title: "Deep Learning Explained",
        provider: "Stanford University",
        type: "Lecture",
        youtubeId: "aircAruvnKk",
      },
      {
        id: 11,
        title: "Cloud Computing Fundamentals",
        provider: "AWS Training",
        type: "Course",
        youtubeId: "d1iE4NfnPNo",
      },
      {
        id: 12,
        title: "Competitive Programming Guide",
        provider: "GeeksforGeeks",
        type: "Tutorial",
        youtubeId: "EZeDaYAqLDQ",
      },
      {
        id: 13,
        title: "Full Stack Web Development",
        provider: "freeCodeCamp",
        type: "Bootcamp",
        youtubeId: "u6gSSpfsoOQ",
      },
      {
        id: 14,
        title: "JavaScript Algorithms and Data Structures",
        provider: "CS50",
        type: "Course",
        youtubeId: "8hly31xKli0",
      },
      {
        id: 15,
        title: "Introduction to DevOps",
        provider: "IBM DevOps",
        type: "Course",
        youtubeId: "zcx9mgJzOeM",
      },
      {
        id: 16,
        title: "Linux for Beginners",
        provider: "Linux Academy",
        type: "Tutorial",
        youtubeId: "ROjZy1WbCIA",
      },
      {
        id: 17,
        title: "Git & GitHub Crash Course",
        provider: "Traversy Media",
        type: "Tutorial",
        youtubeId: "SWYqp7iY_Tc",
      },
      {
        id: 18,
        title: "C++ for Competitive Programming",
        provider: "CodeChef",
        type: "Course",
        youtubeId: "0rZUiWbRo0g",
      },
      {
        id: 19,
        title: "Natural Language Processing (NLP)",
        provider: "Stanford NLP",
        type: "Course",
        youtubeId: "OQQ-W_63UgQ",
      },
      {
        id: 20,
        title: "Game Development with Unity",
        provider: "GameDevHQ",
        type: "Bootcamp",
        youtubeId: "5-X-Ebh1kYA",
      },
    ];

    const filteredVideos = dummyCourses.filter((video) =>
      video.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    // Fetch courses from API
    useEffect(() => {
      // Simulating API call with setTimeout
      const fetchCourses = async () => {
        try {
          // In a real app, replace this with actual API call:
          // const response = await axios.get(`${API_URL}/courses`);
          // setCourses(response.data);
          
          // Using mock data for demonstration
          setTimeout(() => {
            setCourses(initialCourses);
            setFilteredCourses(initialCourses);
            setLoading(false);
          }, 1000);
        } catch (error) {
          console.error("Error fetching courses:", error);
          setLoading(false);
        }
      };
  
      fetchCourses();
    }, []);
  
    // Handle search
    useEffect(() => {
      if (searchTerm.trim() === '') {
        setFilteredCourses(courses);
      } else {
        const results = courses.filter(course => 
          course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
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
      { name: 'Alumni Directory', path: '/home' },
      { name: 'Chat', path: '/chats' },
      { name: 'Jobs', path: '/internships' },
      { name: 'Events', path: '/events' },
      { name: 'Forums', path: '/forum' },
      { name: 'Courses', path: '/courses' }
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

      <div className="App">
        {/* App Bar with Search */}
        <AppBar position="static" sx={{ mb: 4, mt: 10, bgcolor:'none', borderRadius:'10px' }}>
          {/* <Toolbar> */}
            {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Course Catalog
            </Typography> */}
            <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: 'white', borderRadius: 1, p: 0.5 }}>
              <SearchIcon sx={{ color: 'action.active', mr: 1, ml: 1 }} />
              <TextField
                variant="standard"
                placeholder="Search courses..."
                InputProps={{ disableUnderline: true }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ width: 250 }}
              />
            </Box>
        </AppBar>
  
        <Container maxWidth="lg">
  <Typography variant="h4" component="h1" gutterBottom>
    Explore free online courses
  </Typography>
  <Typography variant="subtitle1" color="textSecondary" paragraph>
    from the world's top universities and companies
  </Typography>

  {loading ? (
    <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
      <CircularProgress />
    </Box>
  ) : filteredCourses.length === 0 ? (
    <Typography variant="h6" align="center" sx={{ my: 4 }}>
      No courses found. Try a different search term.
    </Typography>
  ) : (
    <>
       <Grid container spacing={3} sx={{ mt: 2 }}>
      {dummyCourses.map((course) => (
        <Grid item key={course.id} xs={12} sm={6} md={3}>
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": { transform: "translateY(-5px)", boxShadow: 6, cursor: "pointer" },
              position: "relative",
            }}
            onClick={() => navigate(`/watch/${course.youtubeId}`)}
          >
            <CardMedia
              component="img"
              height="140"
              image={`https://img.youtube.com/vi/${course.youtubeId}/maxresdefault.jpg`}
              alt={course.title}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="body2" color="textSecondary">
                {course.provider}
              </Typography>
              <Typography gutterBottom variant="h6" component="h2">
                {course.title}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {course.type}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>


      {visibleCourses < filteredCourses.length && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 4 }}>
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
                      style={{ width: '100%', borderRadius: '8px' }} 
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1" color="primary" gutterBottom>
                      {selectedCourse.provider}
                    </Typography>
                    <Typography variant="body1" paragraph>
                      {selectedCourse.description}
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                      Course Type:
                    </Typography>
                    <Chip label={selectedCourse.type} size="small" sx={{ mb: 2 }} />
                    <Typography variant="subtitle2" gutterBottom>
                      Tags:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {selectedCourse.tags.map((tag, index) => (
                        <Chip key={index} label={tag} size="small" variant="outlined" />
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